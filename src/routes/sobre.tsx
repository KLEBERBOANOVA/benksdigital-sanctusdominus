import { createFileRoute } from "@tanstack/react-router";
import founderAsset from "@/assets/founder-carlos.png.asset.json";
import logoAsset from "@/assets/sanctus-dominus-logo.png.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const founderImg = founderAsset.url;
const brandLogo = logoAsset.url;

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós | Sanctus Dominus" },
      { name: "description", content: "A história da Sanctus Dominus e de Carlos Kleber — 25 anos de design sacro a serviço da evangelização." },
      { property: "og:title", content: "Sobre — Sanctus Dominus" },
      { property: "og:description", content: "Fé, arte e propósito." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

function SobrePage() {
  const values = [
    { t: "Fé com Propósito", d: "Cada criação nasce da missão de anunciar Cristo e tocar vidas através da arte." },
    { t: "Excelência Criativa", d: "Peças com qualidade, originalidade e identidade visual marcante." },
    { t: "Evangelização pela Moda", d: "Transformar roupas e acessórios em meios de testemunho." },
    { t: "Autenticidade", d: "Identidade própria, moderna e alinhada aos valores cristãos." },
    { t: "Respeito ao Próximo", d: "Valorizar pessoas, histórias e dignidade em cada detalhe." },
    { t: "Inovação com Identidade", d: "Unir tendências da moda streetwear à espiritualidade católica." },
  ];

  return (
    <>
      <section className="py-24 px-5 lg:px-8 bg-gradient-hero text-cream">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-5">Nossa Jornada</p>
          <h1 className="font-display text-5xl md:text-7xl">
            Mais que camisaria.
            <br />
            <span className="italic text-gradient-gold">Uma missão.</span>
          </h1>
        </div>
      </section>

      <section className="py-24 px-5 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-14 items-center">
              <img
                src={brandLogo}
                alt="Sanctus Dominus — Dominus Select"
                loading="lazy"
                decoding="async"
                className="w-full max-w-[260px] mx-auto h-auto object-contain"
              />
              <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
                <p>
                  <strong className="font-display text-2xl text-bordeaux">Sanctus Dominus</strong> — Studio de
                  Criação e Camisaria Católica é uma marca que une fé, arte e identidade cristã
                  por meio de peças exclusivas e cheias de significado.
                </p>
                <p>
                  Inspirada nos valores da tradição católica, a marca transforma símbolos
                  sagrados em criações elegantes e autênticas, vestindo homens e mulheres —
                  jovens, adultos e idosos — que desejam expressar sua devoção com propósito,
                  estilo e reverência.
                </p>
                <p className="font-display italic text-2xl text-gold">
                  Mais do que camisaria, a Sanctus Dominus representa uma missão: evangelizar
                  através da beleza e da moda católica.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-5 lg:px-8 bg-muted/40">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="p-10 rounded-lg bg-card border border-border h-full">
              <p className="text-xs tracking-[0.3em] uppercase text-gold">Missão</p>
              <p className="mt-4 leading-relaxed text-foreground/85">
                Levar a mensagem de Cristo através da moda, unindo fé, criatividade e
                propósito em peças que evangelizam, inspiram e fortalecem a identidade cristã
                no dia a dia.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="p-10 rounded-lg bg-navy-deep text-cream border border-border h-full">
              <p className="text-xs tracking-[0.3em] uppercase text-gold">Visão</p>
              <p className="mt-4 leading-relaxed text-cream/85">
                Ser referência nacional em moda católica contemporânea, reconhecida por unir
                excelência criativa, identidade cristã e impacto espiritual.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="Valores" title={<>Os princípios que <span className="italic text-bordeaux">guiam</span></>} />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <div className="h-full p-8 rounded-lg border border-border bg-card hover-lift">
                  <h3 className="font-display text-xl text-bordeaux">{v.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-5 lg:px-8 bg-navy-deep text-cream">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[5fr_7fr] gap-14 items-center">
          <Reveal>
            <div>
              <div className="relative rounded-lg shadow-elegant bg-gradient-to-br from-cream/10 to-cream/5 p-5 ring-1 ring-gold/30 max-w-[460px] mx-auto">
                <img
                  src={founderImg}
                  alt="Carlos Kleber, fundador da Sanctus Dominus"
                  loading="lazy"
                decoding="async"
                  className="w-full h-auto max-h-[560px] object-contain rounded-md mx-auto"
                />
                <div className="absolute -bottom-6 -right-6 hidden md:block bg-gradient-gold text-navy-deep px-6 py-4 rounded-lg shadow-gold">
                  <p className="font-display text-2xl leading-tight">+25 anos</p>
                  <p className="text-xs tracking-wider uppercase">de design sacro</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-xs tracking-[0.4em] uppercase text-gold">O Fundador</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Carlos Kleber</h2>
            <p className="font-display italic text-gold/90 mt-1">+25 anos transformando fé em expressão visual.</p>
            <div className="mt-6 space-y-4 text-cream/85 leading-relaxed">
              <p>
                Carlos Kleber é designer gráfico há mais de 25 anos, com uma trajetória
                marcada pela criatividade, fé e propósito. Durante décadas, dedicou seu
                talento à criação de artes para Igrejas, Grupos de Oração, Movimentos e
                Pastorais da Igreja Católica, além de desenvolver estampas para camisas
                Gospel, peças publicitárias, folders e identidades visuais.
              </p>
              <p>
                Movido pela experiência profissional e por uma profunda vida de oração, deu
                início ao seu projeto solo: a marca <strong className="text-gold">Sanctus Dominus</strong>. Uma
                camisaria católica que une moda, evangelização e identidade cristã em
                coleções voltadas para jovens, adultos e crianças, trazendo um estilo teen,
                street e espiritual.
              </p>
              <p>
                Em cada criação, Carlos Kleber transforma fé em expressão visual, levando
                mensagens de esperança, propósito e evangelização através de camisas, bonés
                e moletons que carregam mais do que estampas: carregam missão.
              </p>
              <p className="text-gold font-display italic text-xl pt-2">
                "Cada criação carrega mais do que estampas — carrega missão."
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
