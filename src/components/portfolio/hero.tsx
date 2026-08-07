import { ArrowDown, ArrowRight, Github, MapPin } from "lucide-react";
import { GITHUB_URL } from "./data";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ScrollReveal } from "./scroll-reveal";
import TextType from "./text-type";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--gradient-brand)" }}
        aria-hidden
      />

      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="reveal-in font-mono text-sm text-accent">
            <span aria-hidden>&gt; </span>

            <TextType
              as="span"
              text="Olá, eu sou"
              typingSpeed={40}
              initialDelay={100}
              loop={false}
              showCursor={false}
            />

            <span
              className="animate-caret ml-1 inline-block text-primary"
              aria-hidden
            >
              _
            </span>
          </p>

          <TextType
            as="h1"
            text="Jairo Costa"
            className="mt-4 text-[2.6rem] leading-[1.05] font-bold sm:text-6xl lg:text-[4.1rem]"
            typingSpeed={60}
            initialDelay={500}
            loop={false}
            showCursor
            cursorCharacter="|"
            cursorClassName="text-primary"
          />

          <ScrollReveal
            text="Desenvolvedor Backend construindo APIs, sistemas e soluções digitais."
            className="mt-5 max-w-xl font-display text-xl leading-snug text-foreground/90 sm:text-2xl"
            highlightWords={[
              "APIs,",
              "sistemas",
              "soluções",
              "digitais.",
            ]}
          />

          <TextType
            as="p"
            text="Transformo regras de negócio e ideias em aplicações organizadas, seguras e escaláveis, utilizando Java, Spring Boot, bancos de dados e boas práticas de desenvolvimento."
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            typingSpeed={12}
            initialDelay={0}
            loop={false}
            showCursor={false}
          />

          <ul className="mt-7 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            {["Java", "Spring Boot", "APIs REST", "PostgreSQL"].map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-surface px-3 py-1.5"
              >
                {tech}
              </li>
            ))}

            <li className="flex items-center gap-1.5 px-1 py-1.5">
              <MapPin className="size-3.5 text-accent" aria-hidden />
              Maragogi, Alagoas — Brasil
            </li>
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-brand)" }}
            >
              Ver projetos

              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>

            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
            >
              Entrar em contato
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" aria-hidden />
              GitHub
            </a>
          </div>
        </div>

        <ArchitectureDiagram />
      </div>

      <div className="section-shell mt-16 hidden md:block">
        <a
          href="#sobre"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowDown className="size-3.5 animate-pulse-soft" aria-hidden />
          continuar
        </a>
      </div>
    </section>
  );
}