import { useEffect, useRef } from "react";
import { JOURNEY } from "./data";
import { gsap, reducedMotion } from "@/lib/motion";
import { Reveal, SectionHeading } from "./primitives";

export function Journey() {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!list.current || !line.current || reducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list.current,
            start: "top 72%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="jornada" className="section-space border-t border-border">
      <div className="section-shell">
        <SectionHeading
          index="05"
          eyebrow="jornada"
          title="Um passo de cada vez."
          subtitle="Do primeiro contato com lógica de programação aos estudos em segurança e arquitetura — o caminho ainda está em construção."
        />

        <ol ref={list} className="relative mt-14">
          <div
            ref={line}
            className="absolute top-2 bottom-2 left-[5px] w-px bg-primary/45 md:left-[6.5rem]"
            aria-hidden
          />
          {JOURNEY.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 40}
              className="relative grid gap-2 pb-10 pl-8 last:pb-0 md:grid-cols-[5.5rem_1fr] md:gap-10 md:pl-0"
            >
              <span className="number-mark pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <div className="relative">
                <span
                  className="absolute top-2 -left-[2.03rem] size-[11px] rounded-full border-2 border-background bg-primary md:-left-[7.05rem]"
                  aria-hidden
                />
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
