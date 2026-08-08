import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

interface ScrollRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  baseOpacity?: number;
  blurStrength?: number;
  wordAnimationEnd?: string;
}

export function ScrollReveal({
  text,
  className = "",
  highlightWords = [],
  highlightClassName = "text-gradient",
  baseOpacity = 0.15,
  blurStrength = 6,
  wordAnimationEnd = "bottom bottom-=15%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  const words = useMemo(() => text.split(" "), [text]);
  const highlightSet = useMemo(() => new Set(highlightWords), [highlightWords]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordElements = el.querySelectorAll<HTMLElement>(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          filter: isMobile ? "none" : `blur(${blurStrength}px)`,
        },
        {
          opacity: 1,
          filter: isMobile ? "none" : "blur(0px)",
          ease: "none",
          stagger: isMobile ? 0.02 : 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=10%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [baseOpacity, blurStrength, wordAnimationEnd, isMobile]);

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,!?]/g, "");
        const isHighlighted = highlightSet.has(cleanWord);
        return (
          <span
            key={i}
            className={`reveal-word inline-block ${isHighlighted ? highlightClassName : ""}`}
          >
            {word}&nbsp;
          </span>
        );
      })}
    </p>
  );
}