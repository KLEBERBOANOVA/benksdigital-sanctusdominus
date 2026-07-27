import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { products as staticProducts, type Product } from "@/lib/products";

export type CatalogProduct = Product & { id?: string; is_active?: boolean; sort_order?: number; sizes?: string };

const COLUMNS =
  "id, slug, name, collection, category, audience, color, price, image, tagline, description, inspiration, sizes, is_active, sort_order";

function serverPublicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  const url = process.env.SUPABASE_URL!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

function toProduct(row: Record<string, unknown>): CatalogProduct {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    collection: (row.collection as string) ?? "",
    category: (row.category as Product["category"]) ?? "Camiseta",
    audience: (row.audience as Product["audience"]) ?? "Unissex",
    color: (row.color as string) ?? "",
    price: (row.price as string) ?? "",
    image: (row.image as string) ?? "",
    tagline: (row.tagline as string) ?? "",
    description: (row.description as string) ?? "",
    inspiration: (row.inspiration as string) ?? "",
    sizes: (row.sizes as string) ?? "",
    is_active: row.is_active as boolean,
    sort_order: row.sort_order as number,
  };
}

/** Public catalog read — falls back to the built-in list when the table is empty or unreachable. */
export const fetchCatalog = createServerFn({ method: "GET" }).handler(async (): Promise<CatalogProduct[]> => {
  try {
    try {
      setResponseHeader("Cache-Control", "no-store, max-age=0");
    } catch {
      /* header not available in this context */
    }
    const supabase = serverPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select(COLUMNS)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticProducts as CatalogProduct[];
    return (data as Record<string, unknown>[]).map(toProduct);
  } catch {
    return staticProducts as CatalogProduct[];
  }
});

/** One-time import of the built-in catalog into the database (admin only). */
export const importStaticCatalog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const rows = staticProducts.map((p, i) => ({
      slug: p.slug,
      name: p.name,
      collection: p.collection,
      category: p.category,
      audience: p.audience,
      color: p.color,
      price: p.price,
      image: p.image,
      tagline: p.tagline,
      description: p.description,
      inspiration: p.inspiration,
      sort_order: i * 10,
    }));
    const { error, data } = await context.supabase
      .from("products")
      .upsert(rows as never, { onConflict: "slug", ignoreDuplicates: true })
      .select("id");
    if (error) throw new Error(error.message);
    return { imported: data?.length ?? 0, total: rows.length };
  });
