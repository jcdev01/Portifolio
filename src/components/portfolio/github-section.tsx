import { useQuery } from "@tanstack/react-query";
import { Github, Star } from "lucide-react";
import { GITHUB_URL } from "./data";
import { Reveal, SectionHeading } from "./primitives";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch("https://api.github.com/users/jcdev01/repos?per_page=100&sort=updated");
  if (!res.ok) throw new Error("Não foi possível carregar os repositórios.");
  return (await res.json()) as Repo[];
}

export function GitHubSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const repos = (data ?? []).filter((r) => !r.fork).slice(0, 6);
  const languages = Array.from(
    (data ?? []).reduce((map, repo) => {
      if (!repo.language) return map;
      map.set(repo.language, (map.get(repo.language) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <section className="relative py-20 md:py-28">
      <div className="section-shell">
        <div className="panel relative overflow-hidden p-7 md:p-12">
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="github"
                title="Conheça mais projetos e acompanhe minha evolução."
                subtitle="Repositórios públicos com estudos, projetos pessoais e acadêmicos, versionados e organizados."
              />
              <Reveal delay={80} className="mt-7">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Github className="size-4" aria-hidden />
                  Acessar GitHub
                </a>
              </Reveal>

              {languages.length ? (
                <Reveal delay={140} className="mt-7">
                  <p className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                    linguagens mais utilizadas
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {languages.map(([lang, count]) => (
                      <li
                        key={lang}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[0.68rem] text-muted-foreground"
                      >
                        {lang} · {count}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>

            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                repositórios recentes
              </p>
              {isLoading ? (
                <ul className="mt-4 grid gap-3" aria-hidden>
                  {[0, 1, 2, 3].map((n) => (
                    <li
                      key={n}
                      className="h-[4.5rem] animate-pulse rounded-xl border border-border/70 bg-surface/50"
                    />
                  ))}
                </ul>
              ) : null}
              {isError ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Não foi possível carregar os repositórios agora. Você pode acessá-los diretamente
                  no GitHub.
                </p>
              ) : null}
              {repos.length ? (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {repos.map((repo) => (
                    <li key={repo.id}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex h-full flex-col rounded-xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-primary/50"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate font-mono text-xs text-foreground/90">
                            {repo.name}
                          </span>
                          {repo.stargazers_count > 0 ? (
                            <span className="flex items-center gap-1 text-[0.65rem] text-muted-foreground">
                              <Star className="size-3" aria-hidden />
                              {repo.stargazers_count}
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-2 line-clamp-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                          {repo.description ?? "Repositório público no GitHub."}
                        </span>
                        {repo.language ? (
                          <span className="mt-3 font-mono text-[0.62rem] text-accent">
                            {repo.language}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
