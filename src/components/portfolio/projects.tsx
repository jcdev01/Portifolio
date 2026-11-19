import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { useGitHubOverview } from "@/hooks/use-github";
import { formatRepoDate, getDemoUrl, GITHUB_USER, type GitHubRepo } from "@/lib/github";
import { gsap, reducedMotion } from "@/lib/motion";
import { Reveal, SectionHeading } from "./primitives";

function RepoLinks({ repo, light = false }: { repo: GitHubRepo; light?: boolean }) {
  const demo = getDemoUrl(repo);
  const base = light
    ? "border-white/25 text-white hover:border-white hover:bg-white hover:text-foreground"
    : "border-border text-foreground/80 hover:border-primary hover:text-primary";

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer noopener"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${base}`}
      >
        <Github className="size-3.5" aria-hidden />
        Código
      </a>
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer noopener"
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${base}`}
        >
          Ver projeto
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      ) : null}
      {repo.stargazers_count > 0 ? (
        <span
          className={`ml-1 inline-flex items-center gap-1 font-mono text-[0.68rem] ${light ? "text-white/60" : "text-muted-foreground"}`}
        >
          <Star className="size-3" aria-hidden />
          {repo.stargazers_count}
        </span>
      ) : null}
    </div>
  );
}

function FeaturedRepo({ repo }: { repo: GitHubRepo }) {
  const demo = getDemoUrl(repo);

  return (
    <Reveal>
      <article className="grid gap-10 border-y border-border py-12 md:grid-cols-[1fr_0.85fr] md:gap-16">
        <div>
          <p className="eyebrow">em destaque</p>
          <h3 className="mt-5 font-display text-4xl leading-tight font-semibold sm:text-5xl">
            {repo.name}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-[1.8] text-muted-foreground">
            {repo.description ?? "Projeto publicado no GitHub."}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {repo.language ? (
              <span className="rounded-full bg-surface-2 px-3 py-1.5 font-mono text-[0.68rem] text-foreground/75">
                {repo.language}
              </span>
            ) : null}
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-surface-2 px-3 py-1.5 font-mono text-[0.68rem] text-foreground/75"
              >
                {topic}
              </span>
            ))}
          </div>

          <RepoLinks repo={repo} />
        </div>

        <div className="card flex min-h-56 flex-col justify-between overflow-hidden p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="number-mark">repositório · {formatRepoDate(repo.pushed_at)}</span>
            <ArrowUpRight className="size-4 text-primary" aria-hidden />
          </div>
          <div>
            <p className="font-display text-2xl leading-tight font-semibold">
              {demo ? "Aberto para visualizar." : "Código disponível."}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Atualizado pela última vez em {formatRepoDate(repo.pushed_at)}.
            </p>
          </div>
          <div className="mt-8 flex gap-6 border-t border-border pt-5 font-mono text-[0.68rem] text-muted-foreground">
            <span>{repo.stargazers_count} stars</span>
            <span>{repo.forks_count} forks</span>
            <span>{(repo.size / 1024).toFixed(1)} MB</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function RepoGrid({ repos }: { repos: GitHubRepo[] }) {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el || reducedMotion()) return;

    const cards = el.querySelectorAll("[data-repo-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.045, ease: "power3.out" },
      );
    }, el);

    return () => ctx.revert();
  }, [repos]);

  return (
    <div ref={grid} className="mt-8 grid gap-x-8 md:grid-cols-2">
      {repos.map((repo, i) => (
        <a
          data-repo-card
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer noopener"
          className="group flex gap-5 border-t border-border py-7"
        >
          <span className="number-mark pt-1.5">{String(i + 1).padStart(2, "0")}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-semibold break-words transition-colors group-hover:text-primary">
                {repo.name}
              </h3>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                aria-hidden
              />
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {repo.description ?? "Repositório público com código-fonte disponível."}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.65rem] text-muted-foreground">
              {repo.language ? <span>{repo.language}</span> : null}
              <span>{formatRepoDate(repo.pushed_at)}</span>
              {repo.stargazers_count > 0 ? <span>{repo.stargazers_count} stars</span> : null}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export function Projects() {
  const { data, isLoading, isError } = useGitHubOverview();
  const [filter, setFilter] = useState<string | null>(null);

  const repos = data?.repos ?? [];
  const languages = useMemo(
    () => Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean))) as string[],
    [repos],
  );

  const featured = useMemo(() => {
    const withDemo = repos.filter((repo) => getDemoUrl(repo));
    return withDemo[0] ?? repos[0] ?? null;
  }, [repos]);

  const visible = useMemo(
    () => repos.filter((repo) => repo.id !== featured?.id && (!filter || repo.language === filter)),
    [repos, featured, filter],
  );

  return (
    <section id="projetos" className="section-space border-t border-border">
      <div className="section-shell">
        <SectionHeading
          index="04"
          eyebrow="projetos"
          title="Tudo o que construí, em um só lugar."
          subtitle="Projetos publicados no GitHub, ordenados por atividade. Use os filtros para navegar por linguagem."
        />

        {isLoading ? (
          <div className="mt-12 space-y-5" aria-hidden>
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="flex gap-5 border-t border-border py-7">
                <div className="h-3 w-6 animate-pulse rounded bg-surface-2" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-40 animate-pulse rounded bg-surface-2" />
                  <div className="h-3 w-full max-w-md animate-pulse rounded bg-surface-2" />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {isError || (!isLoading && !data) ? (
          <div className="card mt-12 p-7">
            <p className="text-sm text-muted-foreground">
              Os projetos não puderam ser carregados do GitHub. Tente novamente em instantes ou
              acesse diretamente o perfil.
            </p>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              Ir para o GitHub <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        ) : null}

        {featured && !filter ? (
          <div className="mt-12">
            <FeaturedRepo repo={featured} />
          </div>
        ) : null}

        {languages.length > 0 ? (
          <div className="mt-14 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter(null)}
              className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] transition-colors ${
                filter === null
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              todos · {repos.length}
            </button>
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setFilter((current) => (current === lang ? null : lang))}
                className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] transition-colors ${
                  filter === lang
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        ) : null}

        {visible.length > 0 ? <RepoGrid repos={visible} /> : null}

        {filter && visible.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">
            Nenhum projeto encontrado para {filter}.
          </p>
        ) : null}
      </div>
    </section>
  );
}
