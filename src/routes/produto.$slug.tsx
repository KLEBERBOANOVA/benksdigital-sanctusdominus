import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { assetUrl } from "@/lib/asset-url";
import { ArrowLeft, MessageCircle, Truck, ShieldCheck, Scissors, X, ZoomIn, Loader2, Search, User, Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductReviews } from "@/components/site/ProductReviews";
import { calcularFrete, type ShippingOption } from "@/lib/melhor-envio.functions";
import { fetchCatalog, type CatalogProduct } from "@/lib/catalog.functions";
import { useLiveCatalog } from "@/lib/use-live-catalog";
import { supabase } from "@/integrations/supabase/client";

const PIX_DISCOUNT = 0.93;

function pixPrice(price: string) {
  const value = Number(price.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(value) ? (value * PIX_DISCOUNT).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : price;
}

export const Route = createFileRoute("/produto/$slug")({
  staleTime: 0,
  shouldReload: true,
  loader: async ({ params }) => {
    const catalog = await fetchCatalog();
    const product = catalog.find((p) => p.slug === params.slug) ?? getProduct(params.slug);
    if (!product) throw notFound();
    return { product, catalog };
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

function getSizesFor(product: { category: string; audience: string; sizes?: string }): string[] {
  const custom = (product.sizes ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (custom.length) return custom;
  if (product.category === "Plus size") return ["G1", "G2", "G3", "G4", "G5"];
  if (product.category === "Oversize") return ["P", "M", "G", "GG", "G1"];
  if (product.audience === "Infantil")
    return ["02 ANOS", "04 ANOS", "06 ANOS", "08 ANOS", "10 ANOS", "12 ANOS", "14 ANOS", "16 ANOS"];
  if (product.audience === "Feminino" || product.category === "Baby Look") return ["PP", "P", "M", "G", "GG"];
  return ["P", "M", "G", "GG"];
}

function ProductPage() {
  const loaded = Route.useLoaderData() as { product: CatalogProduct; catalog: CatalogProduct[] };
  const catalog = useLiveCatalog(loaded.catalog);
  const product = catalog.find((p) => p.slug === loaded.product.slug) ?? loaded.product;
  const sizes = getSizesFor(product);
  const [size, setSize] = useState(sizes[Math.min(1, sizes.length - 1)]);
  const [zoomed, setZoomed] = useState(false);
  const related = (catalog.length ? catalog : products).filter((p) => p.slug !== product.slug).slice(0, 3);

  const [cep, setCep] = useState("");
  const [freteLoading, setFreteLoading] = useState(false);
  const [freteError, setFreteError] = useState<string | null>(null);
  const [freteOpcoes, setFreteOpcoes] = useState<ShippingOption[]>([]);
  const [freteSelecionado, setFreteSelecionado] = useState<number | null>(null);

  const precoNumerico = Number(product.price.replace(/[^\d,]/g, "").replace(",", "."));


  function formatCep(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 8);
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  }

  async function handleCalcularFrete(e: React.FormEvent) {
    e.preventDefault();
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) { setFreteError("Informe um CEP válido (8 dígitos)."); return; }
    setFreteLoading(true);
    setFreteError(null);
    setFreteOpcoes([]);
    setFreteSelecionado(null);
    try {
      const res = await calcularFrete({ data: { cepDestino: digits, precoProduto: precoNumerico || 100 } });
      if (res.error) setFreteError(res.error);
      const validas = res.options.filter((o) => !o.error && o.price !== "—");
      setFreteOpcoes(validas);
      if (validas.length === 0 && !res.error) setFreteError("Nenhuma opção de frete disponível para este CEP.");
    } catch {
      setFreteError("Falha ao calcular o frete. Tente novamente.");
    } finally {
      setFreteLoading(false);
    }
  }

  const opcaoEscolhida = freteOpcoes.find((o) => o.id === freteSelecionado);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyer, setBuyer] = useState({ nome: "", whatsapp: "", email: "", cep: "", endereco: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", observacoes: "" });
  const [formError, setFormError] = useState<string | null>(null);

  function formatPhone(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  function buildOrderMessage() {
    const linhas: string[] = [];
    linhas.push("*🛒 NOVO PEDIDO — SANCTUS DOMINUS*");
    linhas.push("");
    linhas.push("*👤 DADOS DO CLIENTE*");
    linhas.push(`• Nome: ${buyer.nome}`);
    linhas.push(`• WhatsApp: ${buyer.whatsapp}`);
    linhas.push(`• E-mail: ${buyer.email}`);
    linhas.push("");
    linhas.push("*📦 PRODUTO*");
    linhas.push(`• Peça: ${product.name}`);
    if (product.tagline) linhas.push(`• Tagline: ${product.tagline}`);
    linhas.push(`• Categoria: ${product.category} · ${product.audience}`);
    linhas.push(`• Coleção: ${product.collection}`);
    linhas.push(`• Tamanho: ${size}`);
    linhas.push(`• Preço: ${product.price}`);
    linhas.push(`• Preço no Pix (7% off): ${pixPrice(product.price)}`);
    linhas.push(`• Link: ${typeof window !== "undefined" ? window.location.href : `/produto/${product.slug}`}`);
    linhas.push("");
    linhas.push("*🏠 ENDEREÇO DE ENTREGA*");
    linhas.push(`• CEP: ${buyer.cep}`);
    linhas.push(`• Endereço: ${buyer.endereco}, ${buyer.numero}${buyer.complemento ? ` — ${buyer.complemento}` : ""}`);
    linhas.push(`• Bairro: ${buyer.bairro}`);
    linhas.push(`• Cidade/UF: ${buyer.cidade}/${buyer.estado}`);
    linhas.push("");
    linhas.push("*🚚 FRETE*");
    if (opcaoEscolhida) {
      linhas.push(`• Transportadora: ${opcaoEscolhida.company} — ${opcaoEscolhida.name}`);
      linhas.push(`• Valor: ${opcaoEscolhida.price}`);
      linhas.push(`• Prazo estimado: ${opcaoEscolhida.deliveryTime}`);
    } else {
      linhas.push("• A calcular com o cliente");
    }
    if (buyer.observacoes.trim()) {
      linhas.push("");
      linhas.push("*📝 OBSERVAÇÕES*");
      linhas.push(buyer.observacoes.trim());
    }
    linhas.push("");
    linhas.push("_Pedido enviado pelo site sanctusdominus.com_");
    return linhas.join("\n");
  }

  async function registerOrder(message: string) {
    try {
      await supabase.from("whatsapp_orders" as never).insert({
        customer_name: buyer.nome.trim(),
        customer_phone: buyer.whatsapp.trim(),
        customer_email: buyer.email.trim() || null,
        address_postal_code: buyer.cep,
        address_street: buyer.endereco,
        address_number: buyer.numero,
        address_complement: buyer.complemento || null,
        address_district: buyer.bairro,
        address_city: buyer.cidade,
        address_state_abbr: buyer.estado,
        product_slug: product.slug,
        product_name: product.name,
        product_size: size,
        product_color: product.color || null,
        product_price: product.price,
        product_price_pix: pixPrice(product.price),
        shipping_service: opcaoEscolhida ? `${opcaoEscolhida.company} — ${opcaoEscolhida.name}` : null,
        shipping_price: opcaoEscolhida?.price ?? null,
        shipping_deadline: opcaoEscolhida?.deliveryTime ?? null,
        message,
      } as never);
    } catch {
      /* o pedido segue para o WhatsApp mesmo se o registro falhar */
    }
  }

  function handleSubmitOrder(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const req: Array<[string, string]> = [
      ["nome", buyer.nome], ["whatsapp", buyer.whatsapp], ["email", buyer.email],
      ["cep", buyer.cep], ["endereco", buyer.endereco], ["numero", buyer.numero],
      ["bairro", buyer.bairro], ["cidade", buyer.cidade], ["estado", buyer.estado],
    ];
    for (const [k, v] of req) if (!v.trim()) { setFormError(`Preencha o campo ${k}.`); return; }
    if (buyer.whatsapp.replace(/\D/g, "").length < 10) { setFormError("Informe um WhatsApp válido."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) { setFormError("Informe um e-mail válido."); return; }
    const message = buildOrderMessage();
    void registerOrder(message);
    const url = `https://wa.me/5581982202007?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setCheckoutOpen(false);
  }

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
              <img src={assetUrl(product.image)} alt={product.name} loading="eager" decoding="async" fetchPriority="high" width={800} height={1000} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
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

              <div className="mt-8">
                {product.old_price?.trim() ? (
                  <p className="text-sm text-muted-foreground line-through">De {product.old_price}</p>
                ) : null}
                <p className="font-display text-4xl text-gold">{product.price}</p>
                <p className="mt-1 text-sm text-foreground/80">{pixPrice(product.price)} no Pix <span className="text-xs uppercase tracking-wider text-muted-foreground">(7% de desconto)</span></p>
              </div>

              <div className="mt-6">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Tamanho</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`h-11 min-w-11 px-3 rounded-full border text-sm font-medium transition-all ${
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

              <div className="mt-8 rounded-lg border border-border bg-muted/40 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4 text-bordeaux" />
                  <p className="text-xs tracking-[0.2em] uppercase text-gold">Calcular frete e prazo</p>
                </div>
                <form onSubmit={handleCalcularFrete} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                    placeholder="Digite seu CEP"
                    aria-label="CEP de destino"
                    className="flex-1 h-11 px-4 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    disabled={freteLoading}
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-navy-deep text-cream text-xs uppercase tracking-wider font-semibold hover:bg-bordeaux transition-colors disabled:opacity-60"
                  >
                    {freteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    {freteLoading ? "Calculando" : "Calcular"}
                  </button>
                </form>
                <a
                  href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[11px] text-muted-foreground hover:text-bordeaux underline"
                >
                  Não sei meu CEP
                </a>

                {freteError && (
                  <p className="mt-3 text-xs text-bordeaux">{freteError}</p>
                )}

                {freteOpcoes.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {freteOpcoes.map((opt) => {
                      const selected = freteSelecionado === opt.id;
                      return (
                        <li key={opt.id}>
                          <button
                            type="button"
                            onClick={() => setFreteSelecionado(opt.id)}
                            className={`w-full text-left flex items-center justify-between gap-3 rounded-lg border p-3 transition-all ${
                              selected
                                ? "border-gold bg-gold/10 ring-1 ring-gold"
                                : "border-border bg-background hover:border-gold/60"
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">
                                {opt.company} <span className="text-muted-foreground font-normal">· {opt.name}</span>
                              </p>
                              <p className="text-[11px] text-muted-foreground">Prazo estimado: {opt.deliveryTime}</p>
                            </div>
                            <span className="font-display text-lg text-bordeaux whitespace-nowrap">{opt.price}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {opcaoEscolhida && (
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    Frete selecionado: <strong className="text-foreground">{opcaoEscolhida.company} {opcaoEscolhida.name}</strong> — {opcaoEscolhida.price}. Ao clicar em comprar, enviamos essa informação para finalizar seu pedido no WhatsApp.
                  </p>
                )}
              </div>



              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => { setFormError(null); setCheckoutOpen(true); }}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-gold text-navy-deep px-6 py-4 rounded-full text-sm uppercase tracking-wider font-semibold shadow-gold hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle className="h-4 w-4" /> Comprar via WhatsApp
                </button>
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

      <section className="py-16 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ProductReviews productSlug={product.slug} />
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

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${product.name}`}
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-[100] bg-navy-deep/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in cursor-zoom-out"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setZoomed(false); }}
            aria-label="Fechar"
            className="absolute top-5 right-5 h-11 w-11 grid place-items-center rounded-full bg-cream/10 text-cream hover:bg-gold hover:text-navy-deep transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={assetUrl(product.image)}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain rounded-md shadow-elegant"
          />
        </div>
      )}

      {checkoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Finalizar pedido"
          onClick={() => setCheckoutOpen(false)}
          className="fixed inset-0 z-[110] bg-navy-deep/80 backdrop-blur-sm flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-background rounded-2xl shadow-elegant border border-border my-8"
          >
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              aria-label="Fechar"
              className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-muted hover:bg-bordeaux hover:text-cream transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 md:p-8 border-b border-border">
              <p className="text-xs tracking-[0.3em] uppercase text-gold">Finalizar pedido</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl text-foreground">Seus dados para envio</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                <strong className="text-foreground">{product.name}</strong> · Tamanho {size} · {pixPrice(product.price)} no Pix
                {opcaoEscolhida && <> · Frete {opcaoEscolhida.company} {opcaoEscolhida.name} ({opcaoEscolhida.price})</>}
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><User className="h-3 w-3" /> Nome completo *</span>
                  <input type="text" required value={buyer.nome} onChange={(e) => setBuyer({ ...buyer, nome: e.target.value })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Phone className="h-3 w-3" /> WhatsApp *</span>
                  <input type="tel" required inputMode="numeric" placeholder="(81) 98220-2007" value={buyer.whatsapp} onChange={(e) => setBuyer({ ...buyer, whatsapp: formatPhone(e.target.value) })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
              </div>

              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Mail className="h-3 w-3" /> E-mail *</span>
                <input type="email" required value={buyer.email} onChange={(e) => setBuyer({ ...buyer, email: e.target.value })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
              </label>

              <div className="pt-2">
                <p className="text-xs tracking-[0.2em] uppercase text-gold flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Endereço de entrega</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <label className="block md:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">CEP *</span>
                  <input type="text" required inputMode="numeric" value={buyer.cep} onChange={(e) => setBuyer({ ...buyer, cep: formatCep(e.target.value) })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Endereço (rua/av) *</span>
                  <input type="text" required value={buyer.endereco} onChange={(e) => setBuyer({ ...buyer, endereco: e.target.value })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Número *</span>
                  <input type="text" required value={buyer.numero} onChange={(e) => setBuyer({ ...buyer, numero: e.target.value })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Complemento</span>
                  <input type="text" value={buyer.complemento} onChange={(e) => setBuyer({ ...buyer, complemento: e.target.value })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Bairro *</span>
                  <input type="text" required value={buyer.bairro} onChange={(e) => setBuyer({ ...buyer, bairro: e.target.value })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Cidade *</span>
                  <input type="text" required value={buyer.cidade} onChange={(e) => setBuyer({ ...buyer, cidade: e.target.value })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">UF *</span>
                  <input type="text" required maxLength={2} value={buyer.estado} onChange={(e) => setBuyer({ ...buyer, estado: e.target.value.toUpperCase().slice(0, 2) })} className="mt-1 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold uppercase" />
                </label>
              </div>

              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Observações (opcional)</span>
                <textarea rows={3} value={buyer.observacoes} onChange={(e) => setBuyer({ ...buyer, observacoes: e.target.value })} placeholder="Referência, cor preferida, presente, etc." className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
              </label>

              {formError && (
                <p className="text-sm text-bordeaux bg-bordeaux/10 border border-bordeaux/30 rounded-lg px-4 py-3">{formError}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setCheckoutOpen(false)} className="sm:flex-1 h-12 rounded-full border border-border text-sm uppercase tracking-wider font-semibold hover:bg-muted transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="sm:flex-[2] inline-flex items-center justify-center gap-2 h-12 rounded-full bg-gradient-gold text-navy-deep text-sm uppercase tracking-wider font-semibold shadow-gold hover:scale-[1.01] transition-transform">
                  <MessageCircle className="h-4 w-4" /> Enviar pedido no WhatsApp
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center">
                Ao enviar, abriremos o WhatsApp da loja com todas as informações do seu pedido preenchidas.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
