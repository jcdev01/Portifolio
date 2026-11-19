import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { Coffee, Container, Database, Layers3, Leaf, Workflow } from "lucide-react";
import { gsap, reducedMotion } from "@/lib/motion";

const FACES = [
  { label: "JAVA", icon: Coffee, className: "[transform:translateZ(var(--cube-depth))]" },
  {
    label: "SPRING",
    icon: Leaf,
    className: "[transform:rotateY(90deg)_translateZ(var(--cube-depth))]",
  },
  {
    label: "JPA",
    icon: Layers3,
    className: "[transform:rotateY(180deg)_translateZ(var(--cube-depth))]",
  },
  {
    label: "REST",
    icon: Workflow,
    className: "[transform:rotateY(-90deg)_translateZ(var(--cube-depth))]",
  },
  {
    label: "DOCKER",
    icon: Container,
    className: "[transform:rotateX(90deg)_translateZ(var(--cube-depth))]",
  },
  {
    label: "POSTGRES",
    icon: Database,
    className: "[transform:rotateX(-90deg)_translateZ(var(--cube-depth))]",
  },
] as const;

type DragState = { id: number; x: number; y: number; rotateX: number; rotateY: number };

export function JavaCube() {
  const float = useRef<HTMLDivElement>(null);
  const cube = useRef<HTMLDivElement>(null);
  const spin = useRef<gsap.core.Tween | null>(null);
  const tilt = useRef<gsap.core.Tween | null>(null);
  const drag = useRef<DragState | null>(null);

  const stopAuto = useCallback(() => {
    spin.current?.kill();
    tilt.current?.kill();
    spin.current = null;
    tilt.current = null;
  }, []);

  const startAuto = useCallback(() => {
    if (reducedMotion() || !cube.current) return;

    const rotateX = Number(gsap.getProperty(cube.current, "rotateX"));
    const rotateY = Number(gsap.getProperty(cube.current, "rotateY"));
    const targetX = rotateX < 0 ? 28 : -28;

    spin.current = gsap.fromTo(
      cube.current,
      { rotateY },
      { rotateY: rotateY + 360, duration: 18, repeat: -1, ease: "none" },
    );
    tilt.current = gsap.fromTo(
      cube.current,
      { rotateX },
      { rotateX: targetX, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" },
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cube.current, { rotateX: -26, rotateY: -24 });
      startAuto();
      if (!reducedMotion()) {
        gsap.to(float.current, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => {
      stopAuto();
      ctx.revert();
    };
  }, [startAuto, stopAuto]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!cube.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    stopAuto();
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      rotateX: Number(gsap.getProperty(cube.current, "rotateX")),
      rotateY: Number(gsap.getProperty(cube.current, "rotateY")),
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId || !cube.current) return;

    gsap.set(cube.current, {
      rotateY: state.rotateY + (event.clientX - state.x) * 0.5,
      rotateX: Math.max(-70, Math.min(70, state.rotateX - (event.clientY - state.y) * 0.4)),
    });
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;

    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    startAuto();
  };

  return (
    <div className="mt-6 flex select-none items-center gap-3 sm:gap-5">
      <div className="min-w-0">
        <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
          stack backend
        </p>
        <p className="mt-1 font-editorial text-base whitespace-nowrap text-foreground/80 sm:text-lg">
          arraste para girar
        </p>
      </div>

      <div
        ref={float}
        aria-hidden
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        className="relative ml-auto size-24 shrink-0 cursor-grab [--cube-depth:48px] [touch-action:none] [perspective:600px] active:cursor-grabbing sm:size-28 sm:[--cube-depth:56px]"
      >
        <div
          ref={cube}
          className="relative size-full [transform-style:preserve-3d]"
          style={{ transform: "rotateX(-26deg) rotateY(-24deg)" }}
        >
          {FACES.map((face) => (
            <div
              key={face.label}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-surface/95 shadow-[0_16px_32px_-20px_rgba(23,25,29,0.6)] [backface-visibility:hidden] ${face.className}`}
            >
              <face.icon className="size-5 text-primary" />
              <span className="font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-foreground">
                {face.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
