import { ArrowUpRight, Code2, Database, ExternalLink, Github, Monitor, Server } from "lucide-react";
import { FEATURED_PROJECT, PROJECTS, type Project } from "./data";
import { Reveal, SectionHeading } from "./primitives";
import { ScrollReveal } from "./scroll-reveal";

const KIND_ICON = {
  api: Server,
  desktop: Monitor,
  web: Code2,
  academico: Database,
} as const;

/** Mockup abstrato gerado por código, coerente com o tipo de aplicação. */
function ProjectMockup({ kind }: { kind: Project["kind"] }) {
  return (
    <div
      
      className="relative h-36 overflow-hidden rounded-xl border border-border/70 bg-background/60"
      aria-hidden
    >
      <div className="grid-backdrop absolute inset-0 opacity-70" />
      {kind === "api" ? (
        <div className="absolute inset-0 flex flex-col justify-center gap-2 p-4 font-mono text-[0.62rem]">
          {["GET /api/status 200", "POST /api/auth/login 200", "GET /api/usuarios 200"].map((l) => (
            <div key={l} className="flex items-center gap-2 text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="truncate">{l}</span>
            </div>
          ))}
        </div>
      ) : null}
      {kind === "desktop" ? (
        <div className="absolute inset-0 p-4">
          <div className="flex h-full gap-2">
            <div className="w-1/3 space-y-1.5 rounded-lg border border-border/70 bg-surface/70 p-2">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="h-2 rounded bg-primary/25" />
              ))}
            </div>
            <div className="flex-1 space-y-1.5 rounded-lg border border-border/70 bg-surface/50 p-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <div key={n} className="h-2.5 rounded bg-muted" />
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {kind === "web" ? (
        <div className="absolute inset-0 flex items-center justify-center gap-3 p-4">
          <div className="w-24 space-y-2 rounded-lg border border-border/70 bg-surface/70 p-3">
            <div className="h-2 rounded bg-muted" />
            <div className="h-2 rounded bg-muted" />
            <div className="h-2.5 rounded bg-primary/40" />
          </div>
          <svg viewBox="0 0 60 8" className="h-2 w-16 text-accent/70">
            <line
              x1="0"
              y1="4"
              x2="60"
              y2="4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              className="animate-dash-flow"
            />
          </svg>
          <div className="flex size-12 items-center justify-center rounded-lg border border-border/70 bg-surface/70 font-mono text-[0.55rem] text-accent">
            API
          </div>
        </div>
      ) : null}
      {kind === "academico" ? (
        <div className="absolute inset-0 flex items-end gap-1.5 p-5">
          {[38, 60, 28, 74, 50, 86, 44].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${h}%`, background: "var(--gradient-brand)", opacity: 0.45 }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-medium transition-colors hover:border-primary/60"
        >
          <Github className="size-3.5" aria-hidden />
          Ver código
        </a>
      ) : null}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/12 px-3.5 py-2 text-xs font-medium transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          Ver projeto
        </a>
      ) : null}
      {!project.repo && !project.demo ? (
        <span className="font-mono text-[0.65rem] text-muted-foreground">
          projeto acadêmico — sem repositório público
        </span>
      ) : null}
    </div>
  );
}

export function Projects() {
  const FeaturedIcon = KIND_ICON[FEATURED_PROJECT.kind];

  return (
    <section id="projetos" className="relative py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="projetos"
          title="Projetos em destaque"
          subtitle="Projetos desenvolvidos para aplicar conhecimentos em backend, desenvolvimento web, interfaces e arquitetura de software."
        />

        {/* Destaque principal */}
        <Reveal className="mt-12">
          <article className="panel glow-ring grid gap-8 p-6 md:p-9 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                  <FeaturedIcon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                  projeto principal
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
                {FEATURED_PROJECT.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {FEATURED_PROJECT.description}
              </p>
              <ul className="mt-5 grid gap-2">
                {FEATURED_PROJECT.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <TechTags tech={FEATURED_PROJECT.tech} />
              <ProjectLinks project={FEATURED_PROJECT} />
            </div>
            <div className="flex items-center">
              <div className="w-full space-y-3">
                <ProjectMockup kind={FEATURED_PROJECT.kind} />
                <div className="grid grid-cols-3 gap-3">
                  {["Controller", "Service", "Repository"].map((layer) => (
                    <div
                      key={layer}
                      className="rounded-lg border border-border/70 bg-surface/60 px-2 py-3 text-center font-mono text-[0.62rem] text-muted-foreground"
                    >
                      {layer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Demais projetos — grade assimétrica */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {PROJECTS.map((project, i) => {
            const Icon = KIND_ICON[project.kind];
            const span = i % 4 === 0 || i % 4 === 3 ? "lg:col-span-7" : "lg:col-span-5";
            return (
              <Reveal
                as="article"
                key={project.name}
                delay={i * 70}
                className={`panel group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 ${span}`}
              >
                <ProjectMockup kind={project.kind} />
                <div className="mt-5 flex items-center gap-2.5">
                  <Icon className="size-4 text-accent" aria-hidden />
                  <span className="font-mono text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                    {project.summary}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <TechTags tech={project.tech} />
                <ProjectLinks project={project} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
