import { FOCUS } from "./data";
import { Reveal, SectionHeading } from "./primitives";
import { ScrollReveal } from "./scroll-reveal";

export function About() {
  return (
    <section id="sobre" className="section-space border-t border-border">
      <div className="section-shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionHeading index="02" eyebrow="sobre" title="O que acontece antes da interface." />

          <div className="mt-9 space-y-6">
            <ScrollReveal
              text="Sou desenvolvedor backend e estudante de Ciência da Computação. Construo APIs, sistemas e soluções com Java, Spring Boot, bancos relacionais e atenção real à arquitetura de software."
              className="text-base leading-[1.85] text-muted-foreground md:text-lg"
              highlightWords={["APIs,", "arquitetura"]}
            />
            <ScrollReveal
              text="Meu trabalho fica na camada que sustenta tudo: modelagem de dados, regras de negócio, segurança, integrações e código organizado. Gosto de responsabilidades bem definidas e soluções que continuem simples de evoluir."
              className="text-base leading-[1.85] text-muted-foreground md:text-lg"
            />
          </div>

          <Reveal delay={100} className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {["Backend", "Ciência da Computação", "Aprendizado contínuo"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-xs text-foreground/75">
                <span className="size-1 rounded-full bg-primary" aria-hidden />
                {item}
              </span>
            ))}
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">áreas de foco</p>
          </Reveal>
          <ul className="mt-6">
            {FOCUS.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 55}
                className="group flex gap-5 border-t border-border py-5 last:border-b"
              >
                <span className="number-mark pt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-base font-semibold transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
