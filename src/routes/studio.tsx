import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Palette, Shirt, Sparkles, Church, ArrowRight, CheckCircle2 } from "lucide-react";
import studioImg from "@/assets/studio-art.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio de Criação | Sanctus Dominus" },
      { name: "description", content: "Design gráfico católico: identidade visual, estampas exclusivas e arte para paróquias, festas de padroeiros e movimentos." },
      { property: "og:title", content: "Studio de Criação — Sanctus Dominus" },
      { property: "og:description", content: "Transformamos sua missão em arte." },
      { property: "og:url", content: "/studio" },
    ],
    links: [{ rel: "canonical", href: "/studio" }],
  }),
  component: StudioPage,
});

function StudioPage() {
  const services = [
    { icon: Church, title: "Identidade Visual", text: "Logos, identidades e padrões visuais para paróquias, eventos e movimentos." },
    { icon: Shirt, title: "Estampas Exclusivas", text: "Arte autoral para camisas de grupos, pastorais e festas." },
    { icon: Palette, title: "Material Gráfico", text: "Folders, banners, redes sociais e materiais de divulgação." },
    { icon: Sparkles, title: "Festas de Padroeiros", text: "Conceito completo: arte, peças e materiais alinhados ao tema da festa." },
  ];

  const steps = [
    { n: "01", t: "Briefing", d: "Conversamos sobre sua missão, identidade e necessidade." },
    { n: "02", t: "Criação", d: "Desenvolvemos propostas alinhadas ao seu carisma." },
    { n: "03", t: "Aprovação", d: "Refinamos juntos até chegar ao resultado perfeito." },
    { n: "04", t: "Entrega", d: "Arquivos finais prontos para impressão e divulgação." },
  ];

  return (
    <>
      <section className="relative py-28 px-5 lg:px-8 bg-gradient-hero text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={studioImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-5">Studio de Criação</p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">
            Transformamos sua missão
            <br />
            <span className="italic text-gradient-gold">em arte.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-cream/85 text-lg">
            Serviços de design gráfico especializado para a Igreja Católica — com mais de 25
            anos de experiência criando para paróquias, grupos e movimentos.
          </p>
        </div>
      </section>

      <section className="py-24 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="O que criamos" title={<>Serviços <span className="italic text-bordeaux">do Studio</span></>} />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="h-full p-8 rounded-lg border border-border bg-card hover-lift group">
                  <div className="h-12 w-12 rounded-full bg-gradient-gold grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                    <s.icon className="h-6 w-6 text-navy-deep" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-5 lg:px-8 bg-navy-deep text-cream">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Processo</p>
              <h2 className="font-display text-4xl md:text-5xl">Como funciona</h2>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="relative">
                  <p className="font-display text-7xl text-gold/30">{s.n}</p>
                  <h3 className="font-display text-2xl text-cream mt-2">{s.t}</h3>
                  <p className="text-sm text-cream/70 mt-2 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BriefingForm />
    </>
  );
}

function BriefingForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nome: "", email: "", whatsapp: "", paroquia: "", tipo: "", mensagem: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nParóquia/Grupo: ${form.paroquia}\nTipo de Projeto: ${form.tipo}\n\nMensagem:\n${form.mensagem}`
    );
    window.location.href = `mailto:sanctusdominusoficial@gmail.com?subject=Briefing Studio — ${form.nome}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="orcamento" className="py-24 px-5 lg:px-8 bg-muted/40">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Solicite seu Orçamento"
          title={<>Conte sobre seu <span className="italic text-bordeaux">projeto</span></>}
          description="Respondemos em até 24h. Quanto mais detalhes você compartilhar, mais precisa será nossa proposta."
        />

        {sent ? (
          <div className="mt-12 p-10 rounded-lg border border-gold bg-card text-center">
            <CheckCircle2 className="h-12 w-12 text-gold mx-auto" />
            <h3 className="font-display text-2xl mt-4">Quase lá!</h3>
            <p className="text-muted-foreground mt-2">Seu cliente de email foi aberto. Envie a mensagem para concluirmos o briefing.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-12 grid gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Nome completo" value={form.nome} onChange={(v) => setForm({ ...form, nome: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="WhatsApp" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} required />
              <Field label="Paróquia / Grupo / Movimento" value={form.paroquia} onChange={(v) => setForm({ ...form, paroquia: v })} />
            </div>
            <Field label="Tipo de projeto (estampa, identidade, festa de padroeiro...)" value={form.tipo} onChange={(v) => setForm({ ...form, tipo: v })} />
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Detalhes do projeto *</label>
              <textarea
                required
                rows={5}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 outline-none focus:border-gold transition-colors"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-bordeaux transition-colors"
            >
              Enviar briefing <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}{required && " *"}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}
