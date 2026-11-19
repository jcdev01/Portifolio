import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "./data";

const LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Jornada", href: "#jornada" },
  { label: "Arquitetura", href: "#arquitetura" },
  { label: "Contato", href: "#contato" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="section-shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            jairo<span className="text-primary">.</span>
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
            Desenvolvedor backend em construção constante. Projetos versionados, código aberto e
            portas abertas para colaborações.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex flex-col items-start gap-6 md:items-end">
          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-primary"
            >
              <Github className="size-3.5" aria-hidden /> GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-primary"
            >
              <Linkedin className="size-3.5" aria-hidden /> LinkedIn
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
          <p className="number-mark">© {new Date().getFullYear()} Jairo Costa</p>
        </div>
      </div>
    </footer>
  );
}
