import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { BrandMark } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/camisaria", label: "Camisaria" },
  { to: "/studio", label: "Studio de Criação" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("sd-theme");
    const prefersDark = stored === "dark";
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("sd-theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 bg-white text-navy-deep ${
        scrolled ? "shadow-elegant border-b border-navy-deep/10" : "border-b border-navy-deep/5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-28 md:h-32 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Sanctus Dominus — Home">
          <BrandMark />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm tracking-wide uppercase text-navy-deep/75 hover:text-bordeaux transition-colors relative group"
              activeProps={{ className: "text-bordeaux" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bordeaux transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-navy-deep/5 transition-colors"
            aria-label="Alternar tema"
          >
            {dark ? <Sun className="h-5 w-5 text-gold" /> : <Moon className="h-5 w-5 text-navy-deep" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full hover:bg-navy-deep/5 text-navy-deep"
            aria-label="Abrir menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-navy-deep/10 bg-white animate-fade-in">
          <nav className="px-5 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-base font-display tracking-wide text-navy-deep hover:text-bordeaux"
                activeProps={{ className: "text-bordeaux" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
