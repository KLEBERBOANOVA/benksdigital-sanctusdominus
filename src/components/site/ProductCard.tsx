import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";

const WHATSAPP_NUMBER = "5581982202007";

export function ProductCard({ product }: { product: Product }) {
  const buyHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Tenho interesse na peça "${product.name}" (${product.category} · ${product.color}) — ${product.price}.`
  )}`;

  return (
    <article className="group relative flex flex-col rounded-xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
      {/* IMAGE */}
      <Link
        to="/produto/$slug"
        params={{ slug: product.slug }}
        aria-label={`Ver detalhes de ${product.name}`}
        className="relative block aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={`${product.name} — ${product.tagline}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase bg-navy-deep/90 text-gold px-3 py-1 rounded-full backdrop-blur">
            {product.collection}
          </span>
          <span className="text-[10px] tracking-[0.15em] uppercase bg-cream/90 text-navy-deep px-3 py-1 rounded-full backdrop-blur font-semibold">
            {product.category}
          </span>
        </div>

        {/* Tagline on hover */}
        <p className="absolute bottom-4 left-4 right-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-sm text-cream font-display italic">
          “{product.tagline}”
        </p>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl text-foreground group-hover:text-bordeaux transition-colors truncate">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 tracking-wide">
              {product.audience} · {product.color}
            </p>
          </div>
          <p className="font-display text-lg text-gold whitespace-nowrap">{product.price}</p>
        </div>

        {/* ACTIONS */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={buyHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Comprar ${product.name} pelo WhatsApp`}
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-navy-deep px-3 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-gold hover:scale-[1.02] transition-transform"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Comprar
          </a>
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            aria-label={`Ver detalhes de ${product.name}`}
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-3 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-navy-deep hover:text-cream hover:border-navy-deep transition-colors"
          >
            Ver peça <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
