import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { studioDesigns as staticDesigns } from "@/lib/studio-designs";

export type StudioDesignRow = {
  id?: string;
  slug: string;
  name: string;
  subtitle: string;
  collection: string;
  image: string;
  is_active?: boolean;
  sort_order?: number;
};

const COLUMNS = "id, slug, name, subtitle, collection, image, is_active, sort_order";

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

function fallback(): StudioDesignRow[] {
  return staticDesigns.map((d, i) => ({
    slug: d.slug,
    name: d.name,
    subtitle: "",
    collection: d.collection,
    image: d.image,
    is_active: true,
    sort_order: (i + 1) * 10,
  }));
}

/** Public read of the Studio prints — falls back to the built-in list when the table is empty. */
export const fetchStudioDesigns = createServerFn({ method: "GET" }).handler(async (): Promise<StudioDesignRow[]> => {
  try {
    try {
      setResponseHeader("Cache-Control", "no-store, max-age=0");
    } catch {
      /* header not available in this context */
    }
    const supabase = serverPublicClient();
    const { data, error } = await supabase
      .from("studio_designs")
      .select(COLUMNS)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallback();
    return data as unknown as StudioDesignRow[];
  } catch {
    return fallback();
  }
});

/** One-time import of the built-in prints into the database (admin only). */
export const importStaticStudioDesigns = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ imported: number; total: number }> => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const rows = fallback();
    const { data: existing } = await supabaseAdmin.from("studio_designs").select("slug");
    const have = new Set(((existing as { slug: string }[] | null) ?? []).map((r) => r.slug));
    const toInsert = rows.filter((r) => !have.has(r.slug));
    if (toInsert.length > 0) {
      const { error } = await supabaseAdmin.from("studio_designs").insert(toInsert as never);
      if (error) throw new Error(error.message);
    }
    return { imported: toInsert.length, total: rows.length };
  });
