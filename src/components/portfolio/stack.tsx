import { Braces, Database, GitBranch, Leaf, Network, Terminal } from "lucide-react";
import { STACK } from "./data";
import { Reveal, SectionHeading } from "./primitives";

const ICONS = [Braces, Leaf, Database, Terminal, GitBranch, Network];

export function Stack() {
  return (
    <section id="tecnologias" className="relative py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{ background: "var(--gradient-brand)", opacity: 0.35 }}
        aria-hidden
      />
      <div className="section-shell">
        <SectionHeading
          eyebrow="tecnologias"
          title="Tecnologias que fazem parte da minha stack"
          subtitle="Ferramentas que utilizo no dia a dia para desenvolver APIs, aplicações e automações."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((tech, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <Reveal
                as="li"
                key={tech.name}
                delay={i * 60}
                className="group panel relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div
                  className="pointer-events-none absolute -top-24 -right-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: "var(--gradient-brand)" }}
                  aria-hidden
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
                    {tech.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{tech.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tech.description}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
