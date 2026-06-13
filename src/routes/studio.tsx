import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ShoppingBag } from "lucide-react";
import { studioDesigns } from "@/lib/studio-designs";
import dominusSelectLogo from "@/assets/dominus-select-horizontal.png.asset.json";
import tshirtBasicaMasculina from "@/assets/studio-tshirt-basica-masculina.png.asset.json";
import babyLookFeminino from "@/assets/studio-baby-look-feminino.png.asset.json";
import oversizeMasculina from "@/assets/studio-oversize-masculina.png.asset.json";
import oversizeFeminino from "@/assets/studio-oversize-feminino.png.asset.json";
import plusSizeMasculino from "@/assets/studio-plus-size-masculino.png.asset.json";
import plusSizeFeminino from "@/assets/studio-plus-size-feminino.png.asset.json";

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
  { name: "Azul Marinho", hex: "#0f1b3d" },
  { name: "Bordô Vinho", hex: "#5b1622" },
  { name: "Preto", hex: "#0d0d0d" },
  { name: "Branco", hex: "#f7f5ef" },
  { name: "Off-White", hex: "#ece5d5" },
  { name: "Bege", hex: "#cdb89a" },
  { name: "Marrom", hex: "#5a3a1f" },
  { name: "Verde Militar", hex: "#3d4a2a" },
  { name: "Roxo", hex: "#5a2ea6" },
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

  const estampaProduct = useMemo(() => studioDesigns.find((design) => design.slug === estampa) ?? null, [estampa]);
  const modeloItem = useMemo(() => MODELS.find((m) => m.key === modelo) ?? null, [modelo]);

  const basePrice = 89.9;
  const totalPrice = basePrice + (modeloItem?.priceAdd ?? 0);

  const canAdvance = [
    () => !!estampa,
    () => !!cor,
    () => !!modelo,
    () => !!tamanho,
    () => pedido.nome.trim() && pedido.whatsapp.trim() && pedido.endereco.trim(),
  ][step]();

  const goNext = () => canAdvance && setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  const submitOrder = () => {
    const body = [
      "*PEDIDO DOMINUS SELECT*",
      "",
      `Estampa: ${estampaProduct?.name}`,
      `Cor: ${cor}`,
      `Modelo: ${modeloItem?.label}`,
      `Tamanho: ${tamanho}`,
      `Valor: R$ ${totalPrice.toFixed(2).replace(".", ",")}`,
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
                {(["Amor Divino", "Homens de Fé", "Mulheres de Fé"] as const).map((collection) => (
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
                          <button
                            key={design.slug}
                            type="button"
                            onClick={() => setEstampa(design.slug)}
                            className={`group text-left rounded-xl overflow-hidden border-2 transition-all bg-card ${
                              selected
                                ? "border-bordeaux shadow-elegant scale-[1.02]"
                                : "border-border hover:border-gold/60"
                            }`}
                          >
                            <div className="aspect-square overflow-hidden bg-muted">
                              <img
                                src={design.image}
                                alt={`Estampa ${design.name}`}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-3">
                              <p className="font-display text-sm text-foreground line-clamp-2">{design.name}</p>
                              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                {design.collection}
                              </p>
                            </div>
                          </button>
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
                    {estampaProduct && (
                      <img
                        src={estampaProduct.image}
                        alt={estampaProduct.name}
                        loading="lazy"
                        decoding="async"
                        className="h-28 w-28 rounded-lg object-cover border border-border"
                      />
                    )}
                    <div>
                      <p className="font-display text-lg">{estampaProduct?.name}</p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                        {estampaProduct?.collection}
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
                      strong
                    />
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
