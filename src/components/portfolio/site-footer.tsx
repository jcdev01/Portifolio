import { Github } from "lucide-react";
import { GITHUB_URL } from "./data";

const LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Contato", href: "#contato" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="section-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-display text-sm font-semibold">© Jairo Costa</p>
          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground">
            Desenvolvido com foco em tecnologia, aprendizado e evolução contínua.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.external ? <Github className="size-3.5" aria-hidden /> : null}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
