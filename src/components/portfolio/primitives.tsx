import type { ElementType, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 93%", once: true },
        },
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

export function CountUp({
  value,
  className,
  duration = 1.5,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (n: number) => {
      el.textContent = String(Math.round(n));
    };

    if (reducedMotion()) {
      render(value);
      return;
    }

    const counter = { n: 0 };
    render(0);

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => render(counter.n),
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      0
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  index,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  index?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          {index ? <span className="text-foreground/35">{index}</span> : null}
          {index ? <span className="h-px w-6 bg-foreground/25" aria-hidden /> : null}
          {eyebrow}
        </p>
      </Reveal>

      {typeof title === "string" ? (
        <ScrollReveal
          text={title}
          className="mt-5 text-3xl leading-[1.12] font-semibold sm:text-4xl md:text-[2.85rem]"
        />
      ) : (
        <Reveal delay={70}>
          <h2 className="mt-5 text-3xl leading-[1.12] font-semibold sm:text-4xl md:text-[2.85rem]">
            {title}
          </h2>
        </Reveal>
      )}

      {subtitle ? (
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.2,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden>
      <div ref={ref} className="h-full w-full origin-left bg-primary" />
    </div>
  );
}
