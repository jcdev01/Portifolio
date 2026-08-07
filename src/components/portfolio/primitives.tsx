import type { ElementType, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal"; // ajuste o path conforme seu projeto

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, filter: "blur(0px)", y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, filter: "blur(8px)", y: 24 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=10%",
            toggleActions: "play none none once",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  highlightWords = [],
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** Só é usado quando `title` é string (ativa o ScrollReveal por palavra) */
  highlightWords?: string[];
}) {
  const isStringTitle = typeof title === "string";

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <p className="font-mono text-xs tracking-[0.28em] text-accent uppercase">
          {eyebrow}
        </p>
      </Reveal>

      {isStringTitle ? (
        <ScrollReveal
          text={title as string}
          className="mt-4 text-3xl leading-[1.12] font-semibold sm:text-4xl md:text-[2.75rem]"
          highlightWords={highlightWords}
        />
      ) : (
        <Reveal delay={80}>
          <h2 className="mt-4 text-3xl leading-[1.12] font-semibold sm:text-4xl md:text-[2.75rem]">
            {title}
          </h2>
        </Reveal>
      )}

      {subtitle ? (
        <Reveal delay={160}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}