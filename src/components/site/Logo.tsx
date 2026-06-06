export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.86 0.09 85)" />
          <stop offset="100%" stopColor="oklch(0.6 0.13 65)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />
      <path
        d="M32 12 L32 44 M24 22 L40 22"
        stroke="url(#goldGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M26 44 Q32 52 38 44 Q42 40 38 36 Q32 34 26 36 Q22 40 26 44 Z"
        fill="url(#goldGrad)"
        opacity="0.95"
      />
      <circle cx="32" cy="40" r="1.5" fill="oklch(0.38 0.14 20)" />
    </svg>
  );
}

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <Logo className="h-10 w-10" />
      <div className="leading-tight">
        <div className="font-display text-lg tracking-[0.2em] text-gold">SANCTUS</div>
        <div className="font-display text-base tracking-[0.3em] text-bordeaux -mt-1">DOMINUS</div>
      </div>
    </div>
  );
}
