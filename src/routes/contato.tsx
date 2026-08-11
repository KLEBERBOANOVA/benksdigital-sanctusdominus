import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Instagram, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Sanctus Dominus" },
      { name: "description", content: "Fale com a Sanctus Dominus por WhatsApp, email ou formulário. Atendimento ágil para todo o Brasil." },
      { property: "og:title", content: "Contato — Sanctus Dominus" },
      { property: "og:description", content: "Estamos prontos para ouvir você." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nEmail: ${form.email}\n\n${form.mensagem}`
    );
    const href = `mailto:sanctusdominusoficial@gmail.com?subject=${encodeURIComponent(
      form.assunto || "Contato pelo site"
    )}&body=${body}`;

    // Abre o cliente de e-mail do usuário de forma direta
    window.location.href = href;

    setSent(true);
  };


  return (
    <>
      <section className="py-24 px-5 lg:px-8 bg-gradient-hero text-cream">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-5">Fale Conosco</p>
          <h1 className="font-display text-5xl md:text-7xl">
            Vamos <span className="italic text-gradient-gold">conversar</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-cream/80">
            Dúvidas, encomendas, orçamentos ou parcerias — estamos por aqui.
          </p>
        </div>
      </section>

      <section className="py-24 px-5 lg:px-8">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-12">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-3xl">Canais diretos</h2>
            <p className="text-muted-foreground mt-3">A resposta mais rápida vem pelo WhatsApp.</p>

            <ul className="mt-8 space-y-5">
              <ContactRow icon={MessageCircle} label="WhatsApp" value="(81) 98220-2007" href="https://wa.me/5581982202007" />
              <ContactRow icon={Mail} label="Email" value="sanctusdominusoficial@gmail.com" href="mailto:sanctusdominusoficial@gmail.com" />
              <ContactRow icon={Instagram} label="Instagram" value="@sanctusdominusoficial" href="https://instagram.com/sanctusdominusoficial" />
              <ContactRow icon={MapPin} label="Atendimento" value="Brasil — envio nacional" />
            </ul>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-3">
            {sent ? (
              <div className="p-10 rounded-lg border border-gold bg-card text-center">
                <CheckCircle2 className="h-12 w-12 text-gold mx-auto" />
                <h3 className="font-display text-2xl mt-4">Mensagem preparada!</h3>
                <p className="text-muted-foreground mt-2">Conclua o envio pelo seu cliente de email.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 p-8 rounded-lg border border-border bg-card">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Nome" value={form.nome} onChange={(v) => setForm({ ...form, nome: v })} required />
                  <FormField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                </div>
                <FormField label="Assunto" value={form.assunto} onChange={(v) => setForm({ ...form, assunto: v })} />
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Mensagem *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-bordeaux transition-colors"
                >
                  Enviar mensagem <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-gold transition-colors">
      <div className="h-10 w-10 rounded-full bg-gradient-gold grid place-items-center shrink-0">
        <Icon className="h-5 w-5 text-navy-deep" />
      </div>
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}</p>
        <p className="text-foreground mt-1 break-all">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content;
}

function FormField({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}{required && " *"}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}
