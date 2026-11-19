import { useEffect, useMemo, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

type ScrollRevealProps = {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
};

export function ScrollReveal({
  text,
  className = "",
  highlightWords = [],
  highlightClassName = "text-primary",
}: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(" "), [text]);
  const highlights = useMemo(() => new Set(highlightWords), [highlightWords]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(".reveal-word");

    if (reducedMotion()) {
      gsap.set(targets, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.35,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`reveal-word inline-block ${highlights.has(word.replace(/[.,!?]/g, "")) ? highlightClassName : ""}`}
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}
