import { useEffect, useRef } from "react";
import { Database, Layers3, Server, Workflow } from "lucide-react";
import { gsap, reducedMotion } from "@/lib/motion";
import { Reveal, SectionHeading } from "./primitives";

const LAYERS = [
  { icon: Workflow, label: "Controller", detail: "REST · validação" },
  { icon: Server, label: "Service", detail: "regras de negócio" },
  { icon: Layers3, label: "Repository", detail: "Spring Data JPA" },
  { icon: Database, label: "Database", detail: "PostgreSQL" },
] as const;

const DEPTH = 34;

export function Architecture3D() {
  const root = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const pulse = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", el);
    const still = reducedMotion();

    const ctx = gsap.context(() => {
      layers.forEach((layer, index) => {
        gsap.set(layer, { z: index * DEPTH });
      });
      gsap.set(stack.current, { rotateX: 0, rotateZ: -32 });
      gsap.set(tilt.current, { rotateX: 52 });

      if (still) {
        gsap.set(pulse.current, { z: DEPTH * 1.5, opacity: 0.9 });
        return;
      }

      gsap.fromTo(
        layers,
        { autoAlpha: 0, z: (index: number) => -60 - index * 18 },
        {
          autoAlpha: 1,
          z: (index: number) => index * DEPTH,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );

      gsap.to(tilt.current, {
        rotateX: 44,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      gsap.fromTo(
        pulse.current,
        { z: -12, opacity: 0, scale: 0.6 },
        {
          z: DEPTH * 3 + 20,
          opacity: 1,
          scale: 1,
          duration: 2.2,
          repeat: -1,
          repeatDelay: 0.5,
          ease: "power1.inOut",
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reducedMotion() || !stack.current || !root.current) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const el = root.current;
    const rotateX = gsap.quickTo(stack.current, "rotateX", { duration: 0.8, ease: "power2.out" });
    const rotateZ = gsap.quickTo(stack.current, "rotateZ", { duration: 0.8, ease: "power2.out" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotateX(-y * 12);
      rotateZ(-32 + x * 12);
    };

    const onLeave = () => {
      rotateX(0);
      rotateZ(-32);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="arquitetura" className="section-space border-t border-border">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            index="07"
            eyebrow="arquitetura"
            title="Cada camada com uma responsabilidade."
            subtitle="Da requisição HTTP à persistência: desenho APIs com Java e Spring Boot mantendo as fronteiras claras. O resultado é um código fácil de ler, testar e evoluir."
          />

          <Reveal delay={120} className="mt-8 flex flex-wrap gap-2">
            {["Java", "Spring Boot", "Spring Data JPA", "REST", "PostgreSQL"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.68rem] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </div>

        <div ref={root} className="relative h-[380px] w-full sm:h-[440px]" aria-hidden>
          <div className="absolute inset-0 [perspective:1100px]">
            <div ref={tilt} className="absolute inset-0 [transform-style:preserve-3d]">
              <div ref={stack} className="absolute inset-0 [transform-style:preserve-3d]">
                {LAYERS.map((layer) => (
                  <div
                    key={layer.label}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
                  >
                    <div
                      data-layer
                      className="flex w-56 items-center gap-3 rounded-xl border border-border bg-surface/95 p-4 shadow-[0_18px_40px_-24px_rgba(23,25,29,0.55)] sm:w-64"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-primary">
                        <layer.icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-sm font-semibold">
                          {layer.label}
                        </span>
                        <span className="block truncate font-mono text-[0.62rem] text-muted-foreground">
                          {layer.detail}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                  <div
                    ref={pulse}
                    className="size-2.5 rounded-full bg-primary shadow-[0_0_18px_6px_rgba(51,63,184,0.35)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="absolute right-0 bottom-0 font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
            requisição → resposta
          </p>
        </div>
      </div>
    </section>
  );
}
