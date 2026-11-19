import { ArrowUpRight, Github } from "lucide-react";
import { useGitHubOverview } from "@/hooks/use-github";
import { GITHUB_USER } from "@/lib/github";
import { CountUp, Reveal } from "./primitives";

function CardSkeleton() {
  return (
    <div className="card p-7" aria-hidden>
      <div className="flex items-center gap-4">
        <div className="size-14 animate-pulse rounded-full bg-surface-2" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-24 animate-pulse rounded bg-surface-2" />
        </div>
      </div>
      <div className="mt-7 h-px bg-border" />
      <div className="mt-7 grid grid-cols-3 gap-4">
        {[0, 1, 2].map((n) => (
          <div key={n} className="space-y-2">
            <div className="h-8 w-12 animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-16 animate-pulse rounded bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileCard() {
  const { data, isLoading, isError } = useGitHubOverview();

  if (isLoading) return <CardSkeleton />;

  if (isError || !data) {
    return (
      <div className="card p-7">
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar meus dados do GitHub agora.
        </p>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          Ver perfil <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
    );
  }

  const { user, stats } = data;
  const metrics = [
    { value: stats.publicRepos, label: "repositórios" },
    { value: stats.followers, label: "seguidores" },
    { value: stats.languageCount, label: "linguagens" },
  ];

  return (
    <Reveal delay={180}>
      <aside className="card p-7 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt=""
              width={56}
              height={56}
              className="size-14 rounded-full border border-border bg-surface-2 object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">{user.name}</p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">@{user.login}</p>
            </div>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Abrir perfil no GitHub"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="size-4" aria-hidden />
          </a>
        </div>

        <p className="mt-6 font-editorial text-2xl leading-snug text-foreground/80">
          “{user.bio ?? "Desenvolvedor backend"}”
        </p>

        <div className="mt-7 h-px bg-border" />

        <dl className="mt-7 grid grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-mono text-[0.62rem] tracking-[0.08em] text-muted-foreground uppercase">
                {metric.label}
              </dt>
              <dd className="mt-1 font-display text-3xl font-semibold tracking-tight">
                <CountUp value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex items-center justify-between gap-3 border-t border-border pt-5">
          <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.1em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-signal" aria-hidden />
            ao vivo · github api
          </span>
          <span className="number-mark">desde {stats.joinedYear}</span>
        </div>
      </aside>
    </Reveal>
  );
}
