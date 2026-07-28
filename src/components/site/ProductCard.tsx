import { Link } from "@tanstack/react-router";
import { assetUrl } from "@/lib/asset-url";
import { ArrowRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";

const WHATSAPP_NUMBER = "5581982202007";
const PIX_DISCOUNT = 0.93;

function pixPrice(price: string) {
  const value = Number(price.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(value) ? (value * PIX_DISCOUNT).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : price;
}

export function ProductCard({ product, collectionLabel }: { product: Product; collectionLabel?: string }) {
  const buyHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Tenho interesse na peça "${product.name}" (${product.category} · ${product.color}) — ${product.price}, ou ${pixPrice(product.price)} no Pix com 7% de desconto.`
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
          src={assetUrl(product.image)}
          alt={`${product.name} — ${product.tagline}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-start justify-between gap-1.5">
          <span className="max-w-[70%] truncate rounded-full bg-navy-deep/90 px-2 py-0.5 text-[8px] uppercase tracking-[0.15em] text-gold backdrop-blur sm:px-3 sm:py-1 sm:text-[10px] sm:tracking-[0.2em]">
            {collectionLabel ?? product.collection}
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.15em] uppercase bg-cream/90 text-navy-deep px-3 py-1 rounded-full backdrop-blur font-semibold">
            {product.category}
          </span>
        </div>

        <div className="hidden sm:block absolute bottom-3 left-3 z-10">
          <div className="rounded-xl bg-gradient-gold px-4 py-2 text-navy-deep shadow-gold ring-1 ring-gold/40 backdrop-blur">
            <p className="text-[9px] uppercase tracking-[0.24em] font-semibold opacity-75">Preço</p>
            <p className="text-[10px] line-through opacity-70">{product.price}</p>
            <p className="font-display text-xl leading-none font-bold">{pixPrice(product.price)} no Pix</p>
          </div>
        </div>

        <p className="hidden sm:block absolute bottom-4 right-4 max-w-[55%] translate-y-3 text-right text-sm text-cream font-display italic opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          "{product.tagline}"
        </p>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="min-w-0">
          <h3 className="font-display text-base sm:text-xl text-foreground group-hover:text-bordeaux transition-colors truncate">
            {product.name}
          </h3>
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs tracking-wide text-muted-foreground truncate">
            {product.audience} · {product.color}
          </p>
        </div>

        <div className="mt-3 sm:mt-4 flex items-end justify-between gap-2 sm:gap-3 border-t border-dashed border-border/70 pt-3 sm:pt-4">
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground">Investimento</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground line-through">{product.price}</p>
            <p className="font-display text-lg sm:text-2xl leading-none text-bordeaux font-bold">{pixPrice(product.price)} <span className="text-xs">no Pix</span></p>
          </div>
          <p className="hidden sm:block text-right text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            peça
            <br />
            exclusiva
          </p>
        </div>

        <div className="mt-3 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={buyHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Comprar ${product.name} pelo WhatsApp`}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-gold text-navy-deep px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold shadow-gold hover:scale-[1.02] transition-transform"
          >
            <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Comprar
          </a>
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            aria-label={`Ver detalhes de ${product.name}`}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 border border-border text-foreground px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold hover:bg-navy-deep hover:text-cream hover:border-navy-deep transition-colors"
          >
            Ver peça <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
