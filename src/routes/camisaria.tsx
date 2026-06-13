import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, audiences } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import masculinoAsset from "@/assets/size-masculino.jpg.asset.json";
import babyLookAsset from "@/assets/size-baby-look.jpg.asset.json";
import infantilAsset from "@/assets/size-infantil.jpg.asset.json";
import oversizeAsset from "@/assets/size-oversize.jpg.asset.json";
import plusSizeAsset from "@/assets/size-plus-size.jpg.asset.json";

const categories = ["Baby Look"];
const fits = ["Oversize", "Plus size"];
const collections = ["Amor Divino", "Homens de Fé", "Mulheres de Fé"];

function getCollection(product: (typeof products)[number]) {
  if (product.audience === "Masculino") return "Homens de Fé";
  if (product.audience === "Feminino") return "Mulheres de Fé";
  return "Amor Divino";
}

export const Route = createFileRoute("/camisaria")({
  head: () => ({
    meta: [
      { title: "Camisaria | Sanctus Dominus" },
      { name: "description", content: "Camisetas, baby looks e moletons católicos exclusivos. Algodão premium, estampas que evangelizam." },
      { property: "og:title", content: "Camisaria — Sanctus Dominus" },
      { property: "og:description", content: "Toda a coleção de moda católica Sanctus Dominus." },
      { property: "og:url", content: "/camisaria" },
    ],
    links: [{ rel: "canonical", href: "/camisaria" }],
  }),
  component: CamisariaPage,
});

function CamisariaPage() {
  const [cat, setCat] = useState<string | null>(null);
  const [aud, setAud] = useState<string | null>(null);
  const [col, setCol] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!cat || p.category === cat) &&
          (!aud || p.audience === aud) &&
          (!col || getCollection(p) === col)
      ),
    [cat, aud, col]
  );

  const sizeGuide = useMemo(() => {
    if (cat === "Oversize") return { src: oversizeAsset.url, alt: "Tabela de medidas masculina para camisa oversized" };
    if (cat === "Plus size") return { src: plusSizeAsset.url, alt: "Tabela de medidas masculina para camisa plus size" };
    if (cat === "Baby Look" || aud === "Feminino") return { src: babyLookAsset.url, alt: "Tabela de medidas feminina para camisas baby look" };
    if (aud === "Masculino") return { src: masculinoAsset.url, alt: "Tabela de medidas masculina para camisa básica" };
    if (aud === "Infantil") return { src: infantilAsset.url, alt: "Tabela de medidas para camisas infantis" };
    return null;
  }, [cat, aud]);

  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-all ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border text-foreground hover:border-gold hover:text-gold"
      }`}
    >
      {children}
    </button>
  );

  return (
    <>
      <section className="py-20 px-5 lg:px-8 bg-gradient-hero text-cream">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold">Camisaria</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-tight">
            A coleção que <span className="italic text-gradient-gold">veste a fé</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-cream/80">
            Algodão nobre, estampas autorais e mensagens vivas. Cada peça é um testemunho.
          </p>
        </div>
      </section>

      <section className="py-16 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3 mb-12 justify-center">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground mr-2">Filtros:</span>
            <Chip active={!cat && !aud && !col} onClick={() => { setCat(null); setAud(null); setCol(null); }}>Todos</Chip>
            {categories.map((c) => (
              <Chip key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c}</Chip>
            ))}
            {audiences.map((a) => (
              <Chip key={a} active={aud === a} onClick={() => setAud(aud === a ? null : a)}>{a}</Chip>
            ))}
            {fits.map((fit) => (
              <Chip key={fit} active={cat === fit} onClick={() => setCat(cat === fit ? null : fit)}>{fit}</Chip>
            ))}
            {collections.map((c) => (
              <Chip key={c} active={col === c} onClick={() => setCol(col === c ? null : c)}>{c}</Chip>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Nenhuma peça encontrada com esses filtros.</p>
          ) : (
            <div className="grid gap-5 sm:gap-8 md:gap-10 grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {sizeGuide && (
        <section className="bg-muted/40 px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Guia de tamanhos</p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-5xl">Tabela de medidas</h2>
            <img
              src={sizeGuide.src}
              alt={sizeGuide.alt}
              loading="lazy"
              decoding="async"
              width={1254}
              height={1254}
              className="mt-8 h-auto w-full rounded-lg border border-border shadow-elegant"
            />
          </div>
        </section>
      )}
    </>
  );
}
