import { PROCESS } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function Process() {
  return (
    <section id="processo" className="section-space border-t border-border">
      <div className="section-shell">
        <SectionHeading
          index="06"
          eyebrow="processo"
          title="Como eu construo."
          subtitle="Um fluxo simples e consistente, do entendimento do problema até a evolução da aplicação."
        />

        <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((item, i) => (
            <Reveal
              as="article"
              key={item.step}
              delay={(i % 3) * 70}
              className="group border-t border-border py-7"
            >
              <span className="font-display text-4xl font-semibold text-foreground/10 transition-colors group-hover:text-primary/25">
                {item.step}
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
