import { useState } from "react";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { GITHUB_USER } from "@/lib/github";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "./data";
import { Reveal, SectionHeading } from "./primitives";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  email: z.string().trim().email("Informe um e-mail válido.").max(255, "E-mail muito longo."),
  assunto: z.string().trim().min(3, "Informe o assunto.").max(150, "Assunto muito longo."),
  mensagem: z
    .string()
    .trim()
    .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
    .max(1500, "Mensagem muito longa."),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const FIELDS = [
  { name: "nome", label: "Nome", type: "text", placeholder: "Seu nome" },
  { name: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
  { name: "assunto", label: "Assunto", type: "text", placeholder: "Sobre o que quer falar?" },
] as const;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Revise os campos do formulário.");
      return;
    }

    const { nome, email, assunto, mensagem } = parsed.data;
    const subject = `${assunto} — ${nome}`;
    const body = `${mensagem}\n\n---\n${nome}\n${email}`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setErrors({});
    window.location.href = href;
    toast.success("Seu aplicativo de e-mail foi aberto.", {
      description: "Confirme o envio por lá — a mensagem já está pronta.",
    });
  }

  return (
    <section id="contato" className="section-space border-t border-border">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            index="09"
            eyebrow="contato"
            title="Vamos construir algo juntos?"
            subtitle="Estou aberto a oportunidades, colaborações, projetos e desafios que permitam criar soluções úteis e evoluir como desenvolvedor."
          />

          <Reveal delay={100} className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="size-3.5" aria-hidden />
              {CONTACT_EMAIL}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              github.com/{GITHUB_USER}
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="size-3.5" aria-hidden />
              LinkedIn
            </a>
          </Reveal>

          <Reveal
            delay={150}
            className="mt-10 border-t border-border pt-6 font-mono text-xs leading-relaxed text-muted-foreground"
          >
            <p className="text-signal">// disponibilidade</p>
            <p className="mt-3">status: aberto a oportunidades e freelance</p>
            <p>local: Maragogi, Alagoas — Brasil</p>
            <p>foco: Java · Spring Boot · APIs REST</p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {FIELDS.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `${field.name}-erro` : undefined}
                  className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                />
                {errors[field.name] ? (
                  <p id={`${field.name}-erro`} className="mt-1.5 text-xs text-destructive">
                    {errors[field.name]}
                  </p>
                ) : null}
              </div>
            ))}

            <div>
              <label
                htmlFor="mensagem"
                className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={4}
                placeholder="Conte um pouco sobre a ideia, projeto ou oportunidade."
                aria-invalid={Boolean(errors.mensagem)}
                aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
                className="mt-2 w-full resize-y border-0 border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
              />
              {errors.mensagem ? (
                <p id="mensagem-erro" className="mt-1.5 text-xs text-destructive">
                  {errors.mensagem}
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail className="size-4" aria-hidden />
                  Abrir e-mail
                </button>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="size-4" aria-hidden />
                  ou me chame no LinkedIn
                </a>
              </div>
              <p className="mt-4 font-mono text-[0.65rem] leading-relaxed text-muted-foreground">
                Ao enviar, seu aplicativo de e-mail será aberto com a mensagem já pronta.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
