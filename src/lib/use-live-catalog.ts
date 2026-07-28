import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { assetUrl } from "@/lib/asset-url";
import type { CatalogProduct } from "@/lib/catalog.functions";

const COLUMNS =
  "id, slug, name, collection, category, audience, color, price, old_price, image, tagline, description, inspiration, sizes, is_active, sort_order";

/**
 * Keeps the catalog in sync with the admin panel even when the server-side
 * read is unavailable (e.g. missing env vars on an external host).
 */
export function useLiveCatalog(initial: CatalogProduct[]): CatalogProduct[] {
  const [items, setItems] = useState<CatalogProduct[]>(initial);

  useEffect(() => setItems(initial), [initial]);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const { data, error } = await supabase
        .from("products" as never)
        .select(COLUMNS)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (!alive || error || !data || (data as unknown[]).length === 0) return;
      setItems(
        (data as unknown as CatalogProduct[]).map((p) => ({
          ...p,
          old_price: p.old_price ?? "",
          image: assetUrl(p.image),
        }))
      );
    })();
    return () => {
      alive = false;
    };
  }, []);

  return items;
}
