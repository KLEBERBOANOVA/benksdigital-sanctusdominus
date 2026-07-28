/**
 * Lovable CDN pointer URLs are stored as relative paths (/__l5e/assets-v1/...).
 * Those only resolve when the site is served from Lovable. When the app is
 * hosted elsewhere (Vercel, custom domain), they must be rewritten to the
 * absolute Lovable asset origin so every image keeps working.
 */
const ASSET_ORIGIN =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_LOVABLE_ASSET_ORIGIN) ||
  "https://benksdigital-sanctusdominus.lovable.app";

export function assetUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("/__l5e/")) return ASSET_ORIGIN + url;
  return url;
}
