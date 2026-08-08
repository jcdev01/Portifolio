import { ArrowDown, ArrowRight, Github, MapPin } from "lucide-react";
import { GITHUB_URL } from "./data";
import { ArchitectureDiagram } from "./architecture-diagram";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div
        className="grid-backdrop pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <div
        className="noise-backdrop pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--gradient-brand)" }}
        aria-hidden
      />

      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="font-mono text-sm text-accent">
            <span aria-hidden>&gt; </span>
            Olá, eu sou
            <span
              className="animate-caret ml-1 inline-block text-primary"
              aria-hidden
            >
              _
            </span>
          </p>

          <h1 className="mt-4 text-[2.6rem] leading-[1.05] font-bold sm:text-6xl lg:text-[4.1rem]">
            Jairo Costa
          </h1>

          <p className="mt-5 max-w-xl font-display text-xl leading-snug text-foreground/90 sm:text-2xl">
            Desenvolvedor Backend construindo{" "}
            <span className="text-gradient">APIs, sistemas e soluções digitais.</span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Transformo regras de negócio e ideias em aplicações organizadas,
            seguras e escaláveis, utilizando Java, Spring Boot, bancos de dados
            e boas práticas de desenvolvimento.
          </p>

          <ul className="mt-7 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            {["Java", "Spring Boot", "APIs REST", "PostgreSQL"].map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-surface px-3 py-1.5"
              >
                {t}
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