import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, audiences } from "@/lib/products";
import { fetchCatalog, type CatalogProduct } from "@/lib/catalog.functions";
import { useLiveCatalog } from "@/lib/use-live-catalog";

import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

type SizeTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

const SIZE_TABLES: Record<string, SizeTable> = {
  masculino: {
    title: "Camisa Básica Masculina",
    headers: ["Tamanho", "Largura (cm)", "Altura (cm)", "Manga (cm)"],
    rows: [
      ["P", "53", "69", "15"],
      ["M", "56", "71", "16"],
      ["G", "58", "73", "17"],
      ["GG", "61", "75", "18"],
      ["G1", "64", "77", "22"],
      ["G2", "67", "79", "22"],
      ["G3", "71", "81", "22"],
      ["G4", "74", "83", "23"],
      ["G5", "76", "86", "24"],
    ],
  },
  babyLook: {
    title: "Camisas Baby Look — Feminina",
    headers: ["Tamanho", "Busto (cm)", "Comprimento (cm)", "Ombro a ombro (cm)", "Manga (cm)", "Veste (kg) | Manequim"],
    rows: [
      ["PP", "82 a 86", "58", "36", "15", "40 a 50 kg · 34/36"],
      ["P", "87 a 92", "60", "38", "16", "51 a 58 kg · 38/40"],
      ["M", "93 a 98", "62", "40", "17", "59 a 68 kg · 42/44"],
      ["G", "99 a 106", "64", "42", "18", "69 a 80 kg · 46/48"],
      ["GG", "107 a 116", "67", "45", "19", "81 a 95 kg · 50/52"],
    ],
  },
  infantil: {
    title: "Camisas Infantis",
    headers: ["Tamanho", "Altura (cm)", "Largura (cm)", "Manga (cm)"],
    rows: [
      ["02 anos", "37", "25,5", "10,5"],
      ["04 anos", "40", "28,5", "12"],
      ["06 anos", "43,5", "29,5", "13"],
      ["08 anos", "47", "32,5", "15"],
      ["10 anos", "51,5", "33,5", "15,5"],
      ["12 anos", "55", "36", "18"],
      ["14 anos", "58", "39", "19"],
      ["16 anos", "63", "40", "20,5"],
    ],
  },
  oversize: {
    title: "Camisa Básica Oversized",
    headers: ["Tamanho", "Largura (cm)", "Altura (cm)", "Manga (cm)"],
    rows: [
      ["P", "57", "72", "22"],
      ["M", "59", "75", "23"],
      ["G", "62", "75", "24"],
      ["GG", "64", "81", "25"],
      ["G1", "68", "86", "26"],
    ],
  },
  plusSize: {
    title: "Camisa Plus Size",
    headers: ["Tamanho", "Altura (cm)", "Tórax (cm)"],
    rows: [
      ["G1", "84", "70"],
      ["G2", "86", "73"],
      ["G3", "88", "76"],
      ["G4", "90", "79"],
      ["G5", "92", "82"],
    ],
  },
};


const fits = ["Oversize", "Plus size"];
type FaithFilter = "amor-divino" | "apostolos";

const womenOfFaith = ["fe-inabalavel", "nossa-senhora", "maria-", "santa-terezinha", "fiat-", "virgem-maria"];
const menOfFaith = ["padre-pio", "sao-joao-batista"];

function getFaithGroup(product: (typeof products)[number]): FaithFilter {
  if (womenOfFaith.some((term) => product.slug.includes(term))) return "amor-divino";
  if (menOfFaith.some((term) => product.slug.includes(term))) return "amor-divino";
  return "apostolos";
}

function getCollectionLabel(product: (typeof products)[number]) {
  if (womenOfFaith.some((term) => product.slug.includes(term))) return "Mulheres de Fé";
  if (menOfFaith.some((term) => product.slug.includes(term))) return "Homens de Fé";
  return "Apóstolos";
}

export const Route = createFileRoute("/camisaria")({
  loader: () => fetchCatalog(),
  staleTime: 0,
  shouldReload: true,
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
  errorComponent: () => <div className="py-32 text-center text-muted-foreground">Erro ao carregar a camisaria.</div>,
  notFoundComponent: () => <div className="py-32 text-center text-muted-foreground">Página não encontrada.</div>,
  component: CamisariaPage,
});

function CamisariaPage() {
  const catalog = useLiveCatalog(Route.useLoaderData() as CatalogProduct[]);
  const [cat, setCat] = useState<string | null>(null);
  const [aud, setAud] = useState<string | null>(null);
  const [faith, setFaith] = useState<FaithFilter | null>(null);


  const selectCategory = (value: string) => {
    const shouldClear = cat === value;
    setCat(shouldClear ? null : value);
    setAud(null);
    setFaith(null);
  };

  const selectAudience = (value: string) => {
    const shouldClear = aud === value;
    setCat(null);
    setAud(shouldClear ? null : value);
    setFaith(null);
  };

  const selectFaith = (value: FaithFilter) => {
    const shouldClear = faith === value;
    setCat(null);
    setAud(null);
    setFaith(shouldClear ? null : value);
  };

  const filtered = useMemo(
    () =>
      catalog.filter(
        (p) =>
          (!cat || p.category === cat) &&
          (!aud || p.audience === aud) &&
          (!faith || faith === getFaithGroup(p))
      ),
    [catalog, cat, aud, faith]
  );

  const sizeGuide = useMemo<SizeTable | null>(() => {
    if (cat === "Oversize") return SIZE_TABLES.oversize;
    if (cat === "Plus size") return SIZE_TABLES.plusSize;
    if (aud === "Feminino") return SIZE_TABLES.babyLook;
    if (aud === "Masculino") return SIZE_TABLES.masculino;
    if (aud === "Infantil") return SIZE_TABLES.infantil;
    return null;
  }, [cat, aud]);


  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
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
            <Chip active={!cat && !aud && !faith} onClick={() => { setCat(null); setAud(null); setFaith(null); }}>Todos</Chip>
            {audiences.map((a) => (
              <Chip key={a} active={aud === a} onClick={() => selectAudience(a)}>{a}</Chip>
            ))}
            {fits.map((fit) => (
              <Chip key={fit} active={cat === fit} onClick={() => selectCategory(fit)}>{fit}</Chip>
            ))}
            <Chip active={faith === "amor-divino"} onClick={() => selectFaith("amor-divino")}>Amor Divino</Chip>
            <Chip active={faith === "apostolos"} onClick={() => selectFaith("apostolos")}>Apóstolos</Chip>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Nenhuma peça encontrada com esses filtros.</p>
          ) : (
            <div className="grid gap-5 sm:gap-8 md:gap-10 grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProductCard product={p} collectionLabel={getCollectionLabel(p)} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {sizeGuide && (
        <section className="bg-muted/40 px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Guia de tamanhos</p>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-5xl">Tabela de medidas</h2>
              <p className="mt-3 font-display text-xl text-bordeaux">{sizeGuide.title}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                As medidas podem ter uma variação de até 3%
              </p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-card shadow-elegant">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-deep text-cream">
                    {sizeGuide.headers.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-4 text-left text-[11px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.rows.map((row, ri) => (
                    <tr
                      key={row[0]}
                      className={ri % 2 === 0 ? "bg-background" : "bg-muted/50"}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-4 py-3.5 border-t border-border ${
                            ci === 0
                              ? "font-display text-base text-bordeaux font-semibold whitespace-nowrap"
                              : "text-foreground/85"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Dica: utilize uma fita métrica para medir uma peça que você já possui.
            </p>
          </div>
        </section>
      )}

    </>
  );
}
