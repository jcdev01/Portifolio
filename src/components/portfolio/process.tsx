import { PROCESS } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function Process() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="processo"
          title="Como eu construo"
          subtitle="Um fluxo simples e consistente, do entendimento do problema até a evolução da aplicação."
        />

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute top-[3.25rem] right-0 left-0 hidden h-px lg:block"
            style={{ background: "var(--gradient-brand)", opacity: 0.35 }}
            aria-hidden
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((item, i) => (
              <Reveal
                as="li"
                key={item.step}
                delay={i * 60}
                className="panel group relative p-6 transition-colors hover:border-primary/45"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-2 font-mono text-xs text-accent">
                    {item.step}
                  </span>
                  <span className="h-px flex-1 bg-border transition-colors group-hover:bg-primary/40" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
