import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ImageUp, RotateCcw, ShoppingBag, ZoomIn, ZoomOut } from "lucide-react";
import { studioDesigns } from "@/lib/studio-designs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import dominusSelectLogo from "@/assets/dominus-select-horizontal.png.asset.json";
import tshirtBasicaMasculina from "@/assets/studio-tshirt-basica-masculina.png.asset.json";
import babyLookFeminino from "@/assets/studio-baby-look-feminino.png.asset.json";
import oversizeMasculina from "@/assets/studio-oversize-masculina.png.asset.json";
import oversizeFeminino from "@/assets/studio-oversize-feminino.png.asset.json";
import plusSizeMasculino from "@/assets/studio-plus-size-masculino.png.asset.json";
import plusSizeFeminino from "@/assets/studio-plus-size-feminino.png.asset.json";
import infantilMenino from "@/assets/studio-infantil-menino.png.asset.json";
import infantilMenina from "@/assets/studio-infantil-menina.png.asset.json";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Dominus Select | Studio de Criação — Sanctus Dominus" },
      { name: "description", content: "Personalize sua camisa católica: escolha estampa, cor, modelo e tamanho. Criada por você. Inspirada por Deus." },
      { property: "og:title", content: "Dominus Select — Personalize sua camisa" },
      { property: "og:description", content: "Criada por você. Inspirada por Deus." },
      { property: "og:url", content: "/studio" },
    ],
    links: [{ rel: "canonical", href: "/studio" }],
  }),
  component: StudioPage,
});

type StepKey = "estampa" | "cor" | "modelo" | "tamanho" | "pedido";

const STEPS: { key: StepKey; n: string; t: string; sub: string }[] = [
  { key: "estampa", n: "01", t: "Escolha a Estampa", sub: "Diversas estampas católicas para expressar sua fé." },
  { key: "cor", n: "02", t: "Escolha a Cor", sub: "Cores que combinam com você e com sua missão." },
  { key: "modelo", n: "03", t: "Escolha o Modelo", sub: "Modelos modernos e tradicionais para todos os estilos." },
  { key: "tamanho", n: "04", t: "Escolha o Tamanho", sub: "Do PP ao 4G. Conforto que veste bem em todos." },
  { key: "pedido", n: "05", t: "Confira e Finalize", sub: "Revise sua criação e receba onde estiver." },
];

const COLORS: { name: string; hex: string }[] = [
  { name: "Azul Claro", hex: "#498eca" },
  { name: "Areia", hex: "#c6c3b4" },
  { name: "Off White", hex: "#e7e0d8" },
  { name: "Gelo", hex: "#d1dce7" },
  { name: "Cinza", hex: "#b9babe" },
  { name: "Verde Militar", hex: "#212d24" },
  { name: "Vermelho", hex: "#dd1f39" },
  { name: "Laranja", hex: "#e94c1f" },
  { name: "Marinho", hex: "#161d31" },
  { name: "Roxo", hex: "#502767" },
  { name: "Verde Água", hex: "#91cab1" },
  { name: "Branco", hex: "#ffffff" },
  { name: "Preto", hex: "#140e0c" },
  { name: "Rosa", hex: "#eeb4dc" },
  { name: "Bordô", hex: "#9e121e" },
  { name: "Chumbo", hex: "#6a6c6e" },
  { name: "Bege", hex: "#f2ce9e" },
  { name: "Marrom", hex: "#54150b" },
  { name: "Verde Neon", hex: "#78cc64" },
  { name: "Amarelo Neon", hex: "#b4df5e" },
];

const MODELS: { key: string; label: string; desc: string; priceAdd: number; image: string }[] = [
  {
    key: "tshirt-basica-masculina",
    label: "T-Shirt Básica Masculina",
    desc: "Modelagem masculina clássica e confortável.",
    priceAdd: 0,
    image: tshirtBasicaMasculina.url,
  },
  {
    key: "baby-look-feminino",
    label: "Baby Look Feminino",
    desc: "Modelagem feminina acinturada.",
    priceAdd: 0,
    image: babyLookFeminino.url,
  },
  {
    key: "oversize-masculina",
    label: "Oversize Masculina",
    desc: "Modelagem masculina ampla e contemporânea.",
    priceAdd: 0,
    image: oversizeMasculina.url,
  },
  {
    key: "oversize-feminino",
    label: "Oversize Feminino",
    desc: "Modelagem feminina ampla e contemporânea.",
    priceAdd: 0,
    image: oversizeFeminino.url,
  },
  {
    key: "plus-size-masculino",
    label: "Plus Size Masculino",
    desc: "Modelagem masculina plus size confortável.",
    priceAdd: 0,
    image: plusSizeMasculino.url,
  },
  {
    key: "plus-size-feminino",
    label: "Plus Size Feminino",
    desc: "Modelagem feminina plus size confortável.",
    priceAdd: 0,
    image: plusSizeFeminino.url,
  },
  {
    key: "infantil-menino",
    label: "Infantil Menino",
    desc: "Modelagem infantil masculina confortável.",
    priceAdd: 0,
    image: infantilMenino.url,
  },
  {
    key: "infantil-menina",
    label: "Infantil Menina",
    desc: "Modelagem infantil feminina confortável.",
    priceAdd: 0,
    image: infantilMenina.url,
  },
];

const SIZES = ["PP", "P", "M", "G", "GG", "XG", "3G", "4G"];

const WHATSAPP_NUMBER = "5581982202007";

function StudioPage() {
  const [step, setStep] = useState(0);
  const [estampa, setEstampa] = useState<string | null>(null);
  const [cor, setCor] = useState<string | null>(null);
  const [modelo, setModelo] = useState<string | null>(null);
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [pedido, setPedido] = useState({ nome: "", whatsapp: "", endereco: "", obs: "" });
  const [sent, setSent] = useState(false);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);

  const estampaProduct = useMemo(() => studioDesigns.find((design) => design.slug === estampa) ?? null, [estampa]);
  const modeloItem = useMemo(() => MODELS.find((m) => m.key === modelo) ?? null, [modelo]);
  const previewDesign = useMemo(() => studioDesigns.find((design) => design.slug === previewSlug) ?? null, [previewSlug]);

  const openPreview = (slug: string) => {
    setPreviewZoom(1);
    setPreviewSlug(slug);
  };

  const basePrice = 89.9;
  const totalPrice = basePrice + (modeloItem?.priceAdd ?? 0);
  const pixPrice = totalPrice * 0.93;

  useEffect(() => {
    if (!customImage) {
      setCustomImageUrl(null);
      return;
    }
    const url = URL.createObjectURL(customImage);
    setCustomImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [customImage]);

  const canAdvance = [
    () => !!estampa || !!customImage,
    () => !!cor,
    () => !!modelo,
    () => !!tamanho,
    () => pedido.nome.trim() && pedido.whatsapp.trim() && pedido.endereco.trim(),
  ][step]();

  const goNext = () => {
    if (!canAdvance) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  const submitOrder = () => {
    const body = [
      "*PEDIDO DOMINUS SELECT*",
      "",
      `Estampa: ${customImage ? `Imagem própria (${customImage.name}) — enviarei o arquivo nesta conversa` : estampaProduct?.name}`,
      `Cor: ${cor}`,
      `Modelo: ${modeloItem?.label}`,
      `Tamanho: ${tamanho}`,
      `Valor: R$ ${totalPrice.toFixed(2).replace(".", ",")}`,
      `Valor no Pix (7% de desconto): R$ ${pixPrice.toFixed(2).replace(".", ",")}`,
      "",
      `Nome: ${pedido.nome}`,
      `WhatsApp: ${pedido.whatsapp}`,
      `Endereço: ${pedido.endereco}`,
      pedido.obs ? `Observações: ${pedido.obs}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-16 px-5 lg:px-8 bg-navy-deep text-cream overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.35_0.08_265)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <img
            src={dominusSelectLogo.url}
            alt="Dominus Select — Criada por você. Inspirada por Deus."
            className="mx-auto h-32 md:h-44 w-auto drop-shadow-2xl"
            loading="eager"
          />
          <p className="mt-6 text-xs md:text-sm tracking-[0.4em] uppercase text-gold">
            Camisaria Católica Personalizada
          </p>
          <h1 className="mt-4 font-display text-3xl md:text-5xl leading-tight">
            Sua fé. <span className="italic text-gradient-gold">Seu estilo.</span> Sua escolha.
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-cream/80">
            No Dominus Select, você personaliza cada detalhe da sua camisa católica do seu jeito.
          </p>
        </div>
      </section>

      {/* WIZARD */}
      <section className="py-16 px-5 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl">
          {/* Step indicator */}
          <ol className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mb-12">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={s.key} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    className={`h-10 w-10 rounded-full grid place-items-center text-sm font-display border transition-all ${
                      done
                        ? "bg-gold border-gold text-navy-deep"
                        : active
                        ? "bg-bordeaux border-bordeaux text-cream scale-110"
                        : "bg-transparent border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : i + 1}
                  </button>
                  <span
                    className={`text-[11px] tracking-[0.25em] uppercase hidden md:inline ${
                      active ? "text-bordeaux font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {s.t}
                  </span>
                  {i < STEPS.length - 1 && <span className="hidden md:inline h-px w-8 bg-border" />}
                </li>
              );
            })}
          </ol>

          {/* Header current step */}
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-gold">{STEPS[step].n}</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-foreground">
              {STEPS[step].t}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">{STEPS[step].sub}</p>
          </div>

          {/* Step content */}
          <div className="min-h-[320px]">
            {step === 0 && (
              <div className="space-y-12">
                <section className="rounded-xl border-2 border-dashed border-gold/60 bg-card p-6 md:p-8">
                  <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gold">Criação exclusiva</p>
                      <h3 className="mt-2 font-display text-2xl text-foreground">Envie sua imagem ou estampa</h3>
                      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Nosso departamento de Criação vai adaptar e personalizar a arte do seu jeito. PNG, JPG ou WebP de até 10 MB.</p>
                    </div>
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bordeaux">
                      <ImageUp className="h-4 w-4" /> Escolher imagem
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          if (file && file.size <= 10 * 1024 * 1024) {
                            setCustomImage(file);
                            setEstampa(null);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {customImageUrl && customImage && (
                    <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-muted/40 p-3">
                      <img src={customImageUrl} alt="Prévia da imagem enviada" className="h-20 w-20 rounded-md object-contain" />
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{customImage.name}</p><p className="text-xs text-muted-foreground">Imagem própria selecionada</p></div>
                      <Button type="button" variant="ghost" onClick={() => setCustomImage(null)}>Remover</Button>
                    </div>
                  )}
                </section>
                {(["Amor Divino", "Homens de Fé", "Mulheres de Fé", "Apóstolos"] as const).map((collection) => (
                  <section key={collection} aria-labelledby={`collection-${collection}`}>
                    <h3
                      id={`collection-${collection}`}
                      className="mb-5 font-display text-2xl text-foreground"
                    >
                      {collection}
                    </h3>
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {studioDesigns.filter((design) => design.collection === collection).map((design) => {
                        const selected = estampa === design.slug;
                        return (
                          <div
                            key={design.slug}
                            className={`group relative rounded-xl overflow-hidden border-2 transition-all bg-card ${
                              selected
                                ? "border-bordeaux shadow-elegant scale-[1.02]"
                                : "border-border hover:border-gold/60"
                            }`}
                          >
                            <button type="button" onClick={() => { setEstampa(design.slug); setCustomImage(null); }} className="w-full text-left">
                              <div className="aspect-square overflow-hidden bg-muted">
                                <img
                                  src={design.image}
                                  alt={`Estampa ${design.name}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="p-3 pr-12">
                                <p className="font-display text-sm text-foreground line-clamp-2">{design.name}</p>
                                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                  {design.collection}
                                </p>
                              </div>
                            </button>
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              onClick={() => openPreview(design.slug)}
                              aria-label={`Ampliar estampa ${design.name}`}
                              title="Ampliar estampa"
                              className="absolute right-3 bottom-3 rounded-full shadow-md"
                            >
                              <ZoomIn />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-4xl mx-auto">
                {COLORS.map((c) => {
                  const selected = cor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setCor(c.name)}
                      className={`rounded-xl p-4 border-2 transition-all bg-card ${
                        selected
                          ? "border-bordeaux shadow-elegant"
                          : "border-border hover:border-gold/60"
                      }`}
                    >
                      <div
                        className="h-20 w-full rounded-lg border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <p className="mt-3 text-sm font-display text-foreground text-center">
                        {c.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
                {MODELS.map((m) => {
                  const selected = modelo === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setModelo(m.key)}
                      className={`rounded-xl overflow-hidden border-2 text-left transition-all bg-card ${
                        selected
                          ? "border-bordeaux shadow-elegant"
                          : "border-border hover:border-gold/60"
                      }`}
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={m.image}
                          alt={m.label}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-xl text-foreground">{m.label}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
                        <p className="mt-4 text-xs tracking-[0.2em] uppercase text-gold">
                          {m.priceAdd > 0 ? `+ R$ ${m.priceAdd.toFixed(2).replace(".", ",")}` : "Sem acréscimo"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-3 grid-cols-4 sm:grid-cols-8 max-w-3xl mx-auto">
                {SIZES.map((sz) => {
                  const selected = tamanho === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setTamanho(sz)}
                      className={`h-16 rounded-lg border-2 font-display text-lg transition-all ${
                        selected
                          ? "border-bordeaux bg-bordeaux text-cream shadow-elegant"
                          : "border-border bg-card text-foreground hover:border-gold/60"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-10 lg:grid-cols-[1fr_380px] max-w-5xl mx-auto">
                {/* Summary */}
                <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                  <h3 className="font-display text-2xl text-foreground">Resumo da sua criação</h3>
                  <div className="mt-6 grid grid-cols-[120px_1fr] gap-4 items-center">
                    {(estampaProduct || customImageUrl) && (
                      <img
                        src={customImageUrl ?? estampaProduct?.image}
                        alt={customImage ? "Imagem própria" : estampaProduct?.name}
                        loading="lazy"
                        decoding="async"
                        className="h-28 w-28 rounded-lg object-cover border border-border"
                      />
                    )}
                    <div>
                      <p className="font-display text-lg">{customImage ? "Imagem própria" : estampaProduct?.name}</p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                        {customImage ? "Criação personalizada" : estampaProduct?.collection}
                      </p>
                    </div>
                  </div>
                  <dl className="mt-6 divide-y divide-border text-sm">
                    <SummaryRow label="Cor" value={cor} swatch={COLORS.find((c) => c.name === cor)?.hex} />
                    <SummaryRow label="Modelo" value={modeloItem?.label} />
                    <SummaryRow label="Tamanho" value={tamanho} />
                    <SummaryRow
                      label="Valor"
                      value={`R$ ${totalPrice.toFixed(2).replace(".", ",")}`}
                    />
                    <SummaryRow label="No Pix (7% OFF)" value={`R$ ${pixPrice.toFixed(2).replace(".", ",")}`} strong />
                  </dl>
                </div>

                {/* Customer + checkout */}
                <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                  {sent ? (
                    <div className="text-center py-6">
                      <CheckCircle2 className="h-12 w-12 text-gold mx-auto" />
                      <h3 className="font-display text-2xl mt-4">Pedido enviado!</h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        Abrimos o WhatsApp com os detalhes do seu pedido. Confirme o envio da
                        mensagem para finalizarmos o pagamento e a produção.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-xl text-foreground">Dados do pedido</h3>
                      <div className="mt-5 grid gap-4">
                        <Field
                          label="Nome completo"
                          value={pedido.nome}
                          onChange={(v) => setPedido({ ...pedido, nome: v })}
                          required
                        />
                        <Field
                          label="WhatsApp"
                          value={pedido.whatsapp}
                          onChange={(v) => setPedido({ ...pedido, whatsapp: v })}
                          required
                        />
                        <Field
                          label="Endereço de entrega"
                          value={pedido.endereco}
                          onChange={(v) => setPedido({ ...pedido, endereco: v })}
                          required
                        />
                        <div>
                          <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                            Observações
                          </label>
                          <textarea
                            rows={3}
                            value={pedido.obs}
                            onChange={(e) => setPedido({ ...pedido, obs: e.target.value })}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold transition-colors text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={submitOrder}
                          disabled={!canAdvance}
                          className="mt-2 inline-flex items-center justify-center gap-3 bg-bordeaux text-cream px-6 py-4 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-navy-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Finalizar pedido
                        </button>
                        <p className="text-[11px] text-muted-foreground text-center">
                          O pagamento será combinado via WhatsApp (Pix, cartão ou boleto).
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Nav buttons */}
          {!sent && (
            <div className="mt-12 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              {step < STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canAdvance}
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-bordeaux transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Avançar <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <Dialog open={Boolean(previewDesign)} onOpenChange={(open) => !open && setPreviewSlug(null)}>
        <DialogContent className="flex h-[92dvh] w-[96vw] max-w-7xl flex-col gap-0 overflow-hidden p-0 sm:rounded-xl">
          {previewDesign && (
            <>
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-5 py-4 pr-14">
                <div className="min-w-0">
                  <DialogTitle className="truncate font-display text-xl">{previewDesign.name}</DialogTitle>
                  <DialogDescription>{previewDesign.collection} · Use a roda do mouse ou os controles para ampliar</DialogDescription>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button type="button" variant="outline" size="icon" onClick={() => setPreviewZoom((zoom) => Math.max(1, zoom - 0.5))} disabled={previewZoom <= 1} aria-label="Reduzir zoom">
                    <ZoomOut />
                  </Button>
                  <span className="w-12 text-center text-xs font-medium text-muted-foreground">{Math.round(previewZoom * 100)}%</span>
                  <Button type="button" variant="outline" size="icon" onClick={() => setPreviewZoom((zoom) => Math.min(4, zoom + 0.5))} disabled={previewZoom >= 4} aria-label="Aumentar zoom">
                    <ZoomIn />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setPreviewZoom(1)} disabled={previewZoom === 1} aria-label="Restaurar zoom">
                    <RotateCcw />
                  </Button>
                </div>
              </div>
              <div
                className="flex-1 overflow-auto overscroll-contain bg-muted/50 p-4 md:p-8"
                onWheel={(event) => {
                  if (!event.ctrlKey && !event.metaKey) return;
                  event.preventDefault();
                  setPreviewZoom((zoom) => Math.min(4, Math.max(1, zoom + (event.deltaY < 0 ? 0.25 : -0.25))));
                }}
              >
                <div className="flex min-h-full min-w-full items-center justify-center">
                  <img
                    src={previewDesign.image}
                    alt={`Detalhes da estampa ${previewDesign.name}`}
                    decoding="async"
                    className="max-w-none object-contain transition-[width] duration-150"
                    style={{ width: `${previewZoom * 100}%`, maxHeight: previewZoom === 1 ? "100%" : "none" }}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Closing */}
      <section className="py-16 px-5 lg:px-8 bg-navy-deep text-cream text-center">
        <p className="font-display text-2xl md:text-3xl italic">
          Vista sua fé. <span className="text-gold">Viva sua missão.</span>
        </p>
        <p className="mt-3 text-xs tracking-[0.4em] uppercase text-cream/70">Dominus Select</p>
      </section>
    </>
  );
}

function SummaryRow({
  label,
  value,
  swatch,
  strong,
}: {
  label: string;
  value?: string | null;
  swatch?: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
      <dd className={`flex items-center gap-2 ${strong ? "font-display text-lg text-bordeaux" : "text-foreground"}`}>
        {swatch && <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: swatch }} />}
        {value ?? "—"}
      </dd>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold transition-colors text-sm"
      />
    </div>
  );
}
