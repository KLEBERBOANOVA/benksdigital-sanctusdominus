// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Rewrite Lovable CDN pointer URLs (/__l5e/assets-v1/...) to absolute URLs so
// assets load correctly when the site is hosted outside Lovable (e.g. Vercel).
const LOVABLE_ASSET_ORIGIN =
  process.env.VITE_LOVABLE_ASSET_ORIGIN ||
  "https://benksdigital-sanctusdominus.lovable.app";

const rewriteAssetPointers = {
  name: "rewrite-lovable-asset-pointers",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    if (!id.endsWith(".asset.json")) return null;
    try {
      const json = JSON.parse(code);
      if (typeof json.url === "string" && json.url.startsWith("/__l5e/")) {
        json.url = LOVABLE_ASSET_ORIGIN + json.url;
        return { code: JSON.stringify(json), map: null };
      }
    } catch {
      /* ignore */
    }
    return null;
  },
};

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [rewriteAssetPointers],
  },
});

