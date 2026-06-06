import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Truck, ShieldCheck, Scissors, X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Produto"} | Sanctus Dominus` },
      { name: "description", content: loaderData?.product.tagline ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "" },
      { property: "og:description", content: loaderData?.product.tagline ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: `/produto/${loaderData?.product.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <p className="text-muted-foreground">Produto não encontrado.</p>
      <Link to="/camisaria" className="text-bordeaux underline mt-4 inline-block">Voltar à camisaria</Link>
    </div>
  ),
  errorComponent: () => <div className="py-32 text-center text-muted-foreground">Erro ao carregar produto.</div>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const [zoomed, setZoomed] = useState(false);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse na peça "${product.name}" (Tamanho ${size}). Pode me ajudar?`
  );

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

  return (
    <>
      <section className="py-12 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link to="/camisaria" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-bordeaux mb-8">
            <ArrowLeft className="h-4 w-4" /> Voltar à camisaria
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <button
              type="button"
              onClick={() => setZoomed(true)}
              aria-label="Ampliar imagem do produto"
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted shadow-elegant cursor-zoom-in"
            >
              <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] uppercase bg-navy-deep/85 text-gold px-3 py-1 rounded-full">
                Coleção {product.collection}
              </span>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-navy-deep/85 text-cream text-xs px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-3.5 w-3.5" /> Ampliar
              </span>
            </button>

            <div className="flex flex-col">
              <p className="text-xs tracking-[0.3em] uppercase text-gold">{product.category} · {product.audience}</p>
              <h1 className="mt-3 font-display text-5xl md:text-6xl text-foreground">{product.name}</h1>
              <p className="mt-3 font-display italic text-xl text-bordeaux">{product.tagline}</p>

              <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="mt-8 p-5 rounded-lg border border-border bg-muted/40">
                <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">Inspiração</p>
                <p className="text-sm text-foreground/85 italic">{product.inspiration}</p>
              </div>

              <p className="mt-8 font-display text-4xl text-gold">{product.price}</p>

              <div className="mt-6">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Tamanho</p>
                <div className="flex gap-2">
                  {["P", "M", "G", "GG"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`h-11 w-11 rounded-full border text-sm font-medium transition-all ${
                        size === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-gold hover:text-gold"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/5581982202007?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-gold text-navy-deep px-6 py-4 rounded-full text-sm uppercase tracking-wider font-semibold shadow-gold hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle className="h-4 w-4" /> Comprar via WhatsApp
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-5 w-5 text-bordeaux" />
                  Envio para todo Brasil
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-bordeaux" />
                  Algodão Premium 30.1
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Scissors className="h-5 w-5 text-bordeaux" />
                  Estampa exclusiva
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-5 lg:px-8 bg-muted/40">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
            Veja também
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
