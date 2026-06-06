import logoAsset from "@/assets/sanctus-dominus-logo.png.asset.json";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Sanctus Dominus"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

export function BrandMark({ className = "h-20 md:h-24 lg:h-28 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Sanctus Dominus — Criada por você. Inspirada por Deus."
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
