import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { assetUrl } from "@/lib/asset-url";
import type { StudioDesignRow } from "@/lib/studio.functions";

const COLUMNS = "id, slug, name, subtitle, collection, image, is_active, sort_order";

/**
 * Keeps the Studio prints in sync with the admin panel even when the
 * server-side read is unavailable (e.g. missing env vars on an external host).
 */
export function useLiveStudioDesigns(initial: StudioDesignRow[]): StudioDesignRow[] {
  const [items, setItems] = useState<StudioDesignRow[]>(initial);

  useEffect(() => setItems(initial), [initial]);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const { data, error } = await supabase
        .from("studio_designs" as never)
        .select(COLUMNS)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (!alive || error || !data || (data as unknown[]).length === 0) return;
      setItems(
        (data as unknown as StudioDesignRow[]).map((d) => ({
          ...d,
          image: assetUrl(d.image),
        }))
      );
    })();
    return () => {
      alive = false;
    };
  }, []);

  return items;
}
