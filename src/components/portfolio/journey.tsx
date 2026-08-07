import { JOURNEY } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function Journey() {
  return (
    <section id="jornada" className="relative py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="jornada"
          title="Evolução técnica, um passo por vez"
          subtitle="Um panorama do caminho percorrido entre os estudos, a prática e a construção de projetos."
        />

        <ol className="relative mt-12 ml-3 border-l border-border pl-6 sm:ml-4 sm:pl-9">
          {JOURNEY.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 50} className="relative pb-9 last:pb-0">
              <span
                className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full border-2 border-background sm:-left-[2.65rem]"
                style={{ background: "var(--gradient-brand)" }}
                aria-hidden
              />
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                etapa {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
