import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, audiences, collections } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

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
          (!col || p.collection === col)
      ),
    [cat, aud, col]
  );

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

      <section className="py-20 px-5 lg:px-8 bg-muted/40">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Guia rápido"
            title={<>Tabela de <span className="italic text-bordeaux">medidas</span></>}
            description="Veste do P ao GG. Algodão encolhe de 3% a 5% na primeira lavagem — entre dois tamanhos, prefira o maior."
          />
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-navy-deep text-cream">
                <tr>
                  <th className="px-4 py-3 text-left">Tamanho</th>
                  <th className="px-4 py-3 text-left">Tórax</th>
                  <th className="px-4 py-3 text-left">Comprimento</th>
                  <th className="px-4 py-3 text-left">Veste</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["P", "98–102 cm", "68 cm", "60–72 kg"],
                  ["M", "103–108 cm", "70 cm", "73–84 kg"],
                  ["G", "109–114 cm", "72 cm", "85–96 kg"],
                  ["GG", "115–122 cm", "75 cm", "97–112 kg"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 0 ? "font-display text-gold" : "text-muted-foreground"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
