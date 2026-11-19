import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useGitHubOverview } from "@/hooks/use-github";
import { GITHUB_USER, type LanguageStat } from "@/lib/github";
import { gsap, reducedMotion } from "@/lib/motion";
import { CountUp, Reveal } from "./primitives";

function LanguageBars({ languages }: { languages: LanguageStat[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;

    const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: (index: number) => (languages[index]?.share ?? 0) / 100,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [languages]);

  return (
    <div ref={root}>
      {languages.map((lang) => (
        <div key={lang.name} className="flex items-center gap-4 py-2.5">
          <span className="w-24 shrink-0 truncate font-mono text-[0.7rem] text-white/70">
            {lang.name}
          </span>
          <div className="h-px flex-1 bg-white/15">
            <div
              data-bar
              className="h-px w-full bg-accent-soft"
              style={{ transform: `scaleX(${lang.share / 100})` }}
            />
          </div>
          <span className="w-9 shrink-0 text-right font-mono text-[0.7rem] text-white/45">
            {lang.share}%
          </span>
        </div>
      ))}
    </div>
  );
}

export function GitHubSection() {
  const { data, isLoading, isError } = useGitHubOverview();
  const stats = data?.stats;

  const metrics = stats
    ? [
        { value: stats.publicRepos, label: "repositórios públicos" },
        { value: stats.followers, label: "seguidores" },
        { value: stats.languageCount, label: "linguagens" },
        { value: stats.yearsActive, label: "anos no GitHub" },
      ]
    : [];

  return (
    <section className="bg-foreground py-20 text-background md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="eyebrow text-accent-soft/80">08 — atividade</p>
          <h2 className="mt-6 text-3xl leading-[1.12] font-semibold text-white sm:text-4xl md:text-[2.85rem]">
            Prova de trabalho,{" "}
            <span className="editorial font-normal text-accent-soft">em público.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
            Repositórios, linguagens e números carregados diretamente da API do GitHub — sem
            atualização manual.
          </p>

          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent-soft hover:text-foreground"
          >
            <Github className="size-4" aria-hidden />
            Ver perfil completo
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>

        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-8" aria-hidden>
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="space-y-3">
                  <div className="h-12 w-24 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
                </div>
              ))}
            </div>
          ) : null}

          {isError || (!isLoading && !stats) ? (
            <p className="text-sm text-white/60">
              Não foi possível carregar as estatísticas agora. Os dados ficam disponíveis no perfil
              do GitHub.
            </p>
          ) : null}

          {stats ? (
            <>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4">
                {metrics.map((metric, i) => (
                  <Reveal key={metric.label} delay={i * 60}>
                    <dd className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      <CountUp value={metric.value} />
                    </dd>
                    <dt className="mt-2 font-mono text-[0.65rem] tracking-[0.08em] text-white/45 uppercase">
                      {metric.label}
                    </dt>
                  </Reveal>
                ))}
              </dl>

              <div className="mt-12 border-t border-white/15 pt-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] text-white/45 uppercase">
                    linguagens mais utilizadas
                  </p>
                  <p className="font-mono text-[0.65rem] text-white/35">
                    {stats.totalStars} stars · {stats.totalForks} forks
                  </p>
                </div>
                <div className="mt-5">
                  <LanguageBars
                    languages={stats.languages.filter((lang) => lang.share > 0).slice(0, 6)}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
