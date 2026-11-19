import { STACK } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function Stack() {
  return (
    <section id="tecnologias" className="section-space border-t border-border">
      <div className="section-shell">
        <SectionHeading
          index="03"
          eyebrow="tecnologias"
          title="Ferramentas que uso para construir."
          subtitle="Da modelagem do banco à entrega da API: um conjunto enxuto de tecnologias que conheço bem e uso com propósito."
        />

        <ul className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {STACK.map((tech, i) => (
            <Reveal
              as="li"
              key={tech.name}
              delay={(i % 2) * 70}
              className="group flex gap-5 border-t border-border py-6"
            >
              <span className="number-mark pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">
                    {tech.name}
                  </h3>
                  <span className="font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                    {tech.tag}
                  </span>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
