import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, reducedMotion } from "@/lib/motion";
import { ProfileCard } from "./profile-card";
import { JavaCube } from "./java-cube";

const HEADLINE = ["Jairo Costa", "backend, com", "propósito."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-line]", {
        yPercent: 115,
        duration: 1.05,
        stagger: 0.11,
      })
        .from("[data-hero-fade]", { autoAlpha: 0, y: 16, duration: 0.75, stagger: 0.09 }, "-=0.7")
        .from(
          "[data-hero-rule]",
          { scaleX: 0, transformOrigin: "left", duration: 0.9, ease: "power2.inOut" },
          "-=0.9",
        );

      gsap.to("[data-hero-visual]", {
        y: -34,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="inicio"
      className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24"
    >
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p data-hero-fade className="eyebrow flex items-center gap-3">
            <span className="text-foreground/30">01</span>
            <span className="h-px w-6 bg-foreground/25" aria-hidden />
            desenvolvedor backend
          </p>

          <h1 className="mt-8 text-[3.35rem] leading-[0.98] font-semibold sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span
                  data-hero-line
                  className={`inline-block ${i > 0 ? "editorial font-normal text-primary" : ""}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-fade
            className="mt-8 max-w-xl text-base leading-[1.8] text-muted-foreground md:text-lg"
          >
            Transformo regras de negócio em APIs claras, seguras e fáceis de evoluir. Trabalho com
            Java, Spring Boot, bancos relacionais e arquitetura em camadas.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ver projetos
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#contato"
              className="group relative inline-flex items-center gap-2 pb-1 text-sm font-medium after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              Vamos conversar
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>

          <div data-hero-rule className="mt-12 h-px w-full bg-border" aria-hidden />

          <ul
            data-hero-fade
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-[0.08em] text-muted-foreground uppercase"
          >
            <li>Java</li>
            <li className="text-border" aria-hidden>
              /
            </li>
            <li>Spring Boot</li>
            <li className="text-border" aria-hidden>
              /
            </li>
            <li>APIs REST</li>
            <li className="text-border" aria-hidden>
              /
            </li>
            <li>Maragogi, AL</li>
          </ul>
        </div>

        <div data-hero-visual>
          <ProfileCard />
          <JavaCube />
        </div>
      </div>

      <div className="section-shell mt-16 hidden md:block">
        <a
          href="#sobre"
          className="group inline-flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary"
        >
          <ArrowDown
            className="size-3.5 transition-transform group-hover:translate-y-1"
            aria-hidden
          />
          role para explorar
        </a>
      </div>
    </section>
  );
}
