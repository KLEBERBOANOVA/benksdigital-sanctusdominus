import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, LogIn } from "lucide-react";
import { BrandMark } from "./Logo";


export function Footer() {
  return (
    <footer className="bg-navy-deep text-cream mt-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.78 0.14 80) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.38 0.14 20) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(10rem,0.75fr)_minmax(20rem,1.25fr)]">
          <div className="space-y-5">
            <BrandMark />
            <p className="text-sm text-cream/70 max-w-md leading-relaxed">
              Arte católica que evangeliza. Peças exclusivas e criações com propósito que
              transformam sua devoção em testemunho.
            </p>
            <div className="ornament-divider max-w-[180px] !justify-start">
              <span className="text-gold">✦</span>
            </div>
            <p className="font-display italic text-gold/90 text-lg">Santo é o Senhor.</p>
          </div>

          <div className="min-w-0">
            <h4 className="text-gold text-sm tracking-[0.2em] uppercase mb-5">Navegação</h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
              <li><Link to="/camisaria" className="hover:text-gold transition">Camisaria</Link></li>
              <li><Link to="/studio" className="hover:text-gold transition">Studio de Criação</Link></li>
              <li><Link to="/sobre" className="hover:text-gold transition">Sobre Nós</Link></li>
              <li><Link to="/contato" className="hover:text-gold transition">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-sm tracking-[0.2em] uppercase mb-5">Contato</h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li>
                <a
                  href="https://wa.me/5581982202007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition"
                >
                  <MessageCircle className="h-4 w-4" /> (81) 98220-2007
                </a>
              </li>
              <li>
                <a
                  href="mailto:sanctusdominusoficial@gmail.com"
                  className="flex items-center gap-2 whitespace-nowrap hover:text-gold transition"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>sanctusdominusoficial@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/sanctusdominusoficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition"
                >
                  <Instagram className="h-4 w-4" /> @sanctusdominusoficial
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-cream/60">
            © 2026 Sanctus Dominus — Todos os direitos reservados.
          </p>
          <p className="text-sm text-cream/80">
            Desenvolvido e Gerenciado pela{" "}
            <a
              href="https://benksdigital.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-benks font-semibold hover:underline underline-offset-4"
            >
              Benks
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
