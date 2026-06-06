import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-xs tracking-[0.35em] uppercase text-gold mb-4">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {center && (
        <div className="ornament-divider mt-7 max-w-xs mx-auto">
          <span className="text-gold text-xl">✦</span>
        </div>
      )}
    </div>
  );
}
