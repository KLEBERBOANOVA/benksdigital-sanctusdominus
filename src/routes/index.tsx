import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Heart, Crown, Palette, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-church.jpg";
import founderAsset from "@/assets/founder-carlos-2026.jpg.asset.json";
const founderImg = founderAsset.url;
import studioImg from "@/assets/studio-art.jpg";
import { products } from "@/lib/products";
import { fetchCatalog, type CatalogProduct } from "@/lib/catalog.functions";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  loader: () => fetchCatalog(),
  staleTime: 0,
  shouldReload: true,
  errorComponent: () => <div className="py-32 text-center text-muted-foreground">Erro ao carregar a página.</div>,
  notFoundComponent: () => <div className="py-32 text-center text-muted-foreground">Página não encontrada.</div>,
  head: () => ({
    meta: [
      { title: "Sanctus Dominus | Moda e Arte Católica que Evangeliza" },
      {
        name: "description",
        content:
          "Camisaria católica premium e studio de criação. Peças exclusivas com propósito para quem vive e veste a fé.",
      },
      { property: "og:title", content: "Sanctus Dominus | Arte Católica que Evangeliza" },
      {
        property: "og:description",
        content: "Fé para vestir. Arte para evangelizar.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const catalog = (Route.useLoaderData() as CatalogProduct[]) ?? [];
  const featured = catalog.length ? catalog : products;
  const pillars = [
    { icon: Heart, title: "Fé com Propósito", text: "Cada criação nasce da missão de anunciar Cristo." },
    { icon: Sparkles, title: "Excelência Criativa", text: "Qualidade, originalidade e identidade marcante." },
    { icon: Crown, title: "Evangelização pela Moda", text: "Roupas que são testemunho e inspiração." },
    { icon: Palette, title: "Autenticidade", text: "Identidade própria, moderna e fiel à tradição." },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Jovem católico vestindo Sanctus Dominus em igreja barroca"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/75 to-navy-deep/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-32 w-full">
          <div className="max-w-2xl text-cream">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 animate-fade-in">
              ✦ Sanctus Dominus ✦
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] animate-fade-up">
              Fé para vestir.
              <br />
              <span className="text-gradient-gold italic">Arte para evangelizar.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-cream/85 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
              Peças exclusivas e criações com propósito que transformam sua devoção em
              testemunho vivo.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <Link
                to="/camisaria"
                className="group inline-flex items-center gap-3 bg-gradient-gold text-navy-deep px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold shadow-gold hover:shadow-elegant transition-all hover:scale-[1.02]"
              >
                Conheça a Coleção
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/studio"
                className="inline-flex items-center gap-3 border border-cream/30 text-cream px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-cream/10 hover:border-gold hover:text-gold transition-all"
              >
                Serviços de Criação
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 text-xs tracking-[0.3em] uppercase animate-fade-in">
          <span className="block animate-bounce">↓ role</span>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-28 px-5 lg:px-8 bg-muted/40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Coleção Apóstolos"
              title={<>Peças <span className="italic text-bordeaux">em destaque</span></>}
              description="Estampas exclusivas, tecidos nobres e mensagens vivas para quem veste a fé com propósito."
            />
          </Reveal>

          <div className="mt-10 md:mt-16 grid gap-5 sm:gap-8 md:gap-10 grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 9).map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/camisaria"
              className="inline-flex items-center gap-3 text-bordeaux hover:text-gold transition-colors text-sm uppercase tracking-[0.2em] font-semibold"
            >
              Ver toda a coleção <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-28 px-5 lg:px-8 bg-navy-deep text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.5), transparent 70%)" }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.4), transparent 70%)" }}
          />
        </div>
        <div className="mx-auto max-w-4xl text-center relative">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6">Manifesto</p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight text-cream">
              Não seguimos tendências.
              <br />
              <span className="italic text-gold">Resgatamos símbolos eternos.</span>
            </h2>
            <div className="ornament-divider my-10 max-w-md mx-auto">
              <span className="text-gold text-xl">✦</span>
            </div>
            <p className="text-lg md:text-xl text-cream/85 leading-relaxed">
              Nasce a Sanctus Dominus, uma marca criada para aqueles que carregam sua fé não
              apenas no coração, mas também na forma como se apresentam ao mundo. Cada arte,
              cada detalhe, cada peça é pensada para expressar a beleza da tradição católica
              com identidade, reverência e propósito.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-28 px-5 lg:px-8 bg-gradient-to-b from-background to-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div
            className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.35), transparent 70%)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.35 0.08 25 / 0.35), transparent 70%)" }}
          />
        </div>
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center relative">
          <Reveal className="lg:order-2">
            <div className="relative max-w-[460px] mx-auto">
              <div className="rounded-lg shadow-elegant bg-gradient-to-br from-navy-deep/5 to-bordeaux/5 p-5 ring-1 ring-gold/30">
                <img
                  src={founderImg}
                  alt="Carlos Kleber — fundador da Sanctus Dominus"
                  loading="lazy"
                  className="w-full h-auto max-h-[520px] object-contain rounded-md mx-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block bg-gradient-gold text-navy-deep px-6 py-4 rounded-lg shadow-gold">
                <p className="font-display text-2xl leading-tight">Carlos Kleber</p>
                <p className="text-xs tracking-wider uppercase">Fundador & Designer</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:order-1">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-5">O Fundador</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              Fé, arte e propósito em{" "}
              <span className="italic text-bordeaux">cada criação</span>.
            </h2>
            <p className="mt-6 text-foreground/80 text-lg leading-relaxed">
              Há mais de <strong className="text-bordeaux">25 anos</strong>, Carlos Kleber transforma fé em
              expressão visual. Da criação de artes para Igrejas, Movimentos e Pastorais à
              concepção da <strong className="text-bordeaux">Sanctus Dominus</strong>, sua trajetória une
              criatividade, oração e missão.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              Cada camisa, boné ou moletom carrega mais do que estampas — carrega uma
              mensagem de esperança, propósito e evangelização.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <p className="font-display text-3xl text-bordeaux">+25</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Anos de arte sacra</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <p className="font-display text-3xl text-bordeaux">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Identidade católica</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <p className="font-display text-3xl text-bordeaux">∞</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Fé & propósito</p>
              </div>
            </div>

            <Link
              to="/sobre"
              className="mt-10 inline-flex items-center gap-3 bg-navy-deep text-cream px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-bordeaux transition-colors"
            >
              Conheça a história <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* STUDIO */}
      <section className="py-28 px-5 lg:px-8 bg-navy-deep text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.6), transparent 70%)" }}
          />
        </div>
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center relative">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-elegant">
                <img src={studioImg} alt="Studio de criação Sanctus Dominus" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block bg-gradient-gold text-navy-deep px-6 py-4 rounded-lg shadow-gold">
                <p className="font-display text-2xl leading-tight">+25 anos</p>
                <p className="text-xs tracking-wider uppercase">de design sacro</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-5">Studio de Criação</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Criação de arte para sua{" "}
              <span className="italic text-gold">Paróquia, Grupo ou Movimento</span>.
            </h2>
            <p className="mt-6 text-cream/80 text-lg leading-relaxed">
              Desenvolvemos identidades visuais e artes exclusivas para eventos, festas de
              padroeiros e movimentos católicos, com excelência criativa e propósito
              evangelizador.
            </p>
            <ul className="mt-8 space-y-3 text-cream/85">
              {["Identidade visual para eventos", "Estampas exclusivas", "Material para festas de padroeiros", "Camisas para movimentos e pastorais"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {item}
                </li>
              ))}
            </ul>
            <Link
              to="/studio"
              className="mt-10 inline-flex items-center gap-3 bg-gradient-gold text-navy-deep px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold shadow-gold hover:scale-[1.02] transition-transform"
            >
              Saiba mais sobre o Studio <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-28 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Nossos Pilares"
              title={<>Os valores que nos <span className="italic text-bordeaux">sustentam</span></>}
            />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="h-full p-8 rounded-lg border border-border bg-card hover-lift group">
                  <div className="h-12 w-12 rounded-full bg-gradient-gold grid place-items-center mb-5 group-hover:rotate-6 transition-transform">
                    <p.icon className="h-6 w-6 text-navy-deep" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 lg:px-8 bg-gradient-hero text-cream">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl">
              Tem um projeto em mente
              <br />
              <span className="italic text-gradient-gold">ou uma dúvida?</span>
            </h2>
            <p className="mt-6 text-cream/80 text-lg">
              Fale com a gente. Respondemos no WhatsApp em minutos.
            </p>
            <a
              href="https://wa.me/5581982202007"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-[oklch(0.65_0.18_145)] text-white px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="h-5 w-5" /> Fale conosco no WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
