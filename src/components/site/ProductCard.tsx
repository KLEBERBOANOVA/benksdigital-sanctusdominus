import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block hover-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-navy-deep/85 text-gold px-3 py-1 rounded-full backdrop-blur">
          {product.collection}
        </span>
        <span className="absolute bottom-4 left-4 right-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-sm text-cream font-display italic">
          {product.tagline}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-foreground group-hover:text-bordeaux transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 tracking-wide">
            {product.audience} · {product.color}
          </p>
        </div>
        <p className="font-display text-lg text-gold whitespace-nowrap">{product.price}</p>
      </div>
    </Link>
  );
}
