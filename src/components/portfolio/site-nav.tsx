import { useEffect, useState } from "react";
import { ArrowUpRight, Linkedin, Menu, X } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, NAV_ITEMS } from "./data";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="section-shell flex h-16 items-center justify-between gap-6 md:h-20"
      >
        <a
          href="#inicio"
          className="flex items-baseline font-display text-lg font-bold tracking-tight"
        >
          jairo<span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative pb-1 text-sm transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-primary after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100",
                  active === item.id
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground after:scale-x-0",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
          >
            GitHub <ArrowUpRight className="size-3" aria-hidden />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
          >
            LinkedIn <Linkedin className="size-3" aria-hidden />
          </a>
          <a
            href="#contato"
            className="hidden items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary md:inline-flex"
          >
            Vamos conversar <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="flex size-9 items-center justify-center lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="section-shell grid gap-1 py-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/70 py-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
