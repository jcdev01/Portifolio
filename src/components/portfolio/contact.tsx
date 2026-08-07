import { useState } from "react";
import { Github, Loader2, Mail, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { GITHUB_URL } from "./data";
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
  const [sending, setSending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
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

    setErrors({});
    setSending(true);
    // Estrutura pronta para integração futura com um serviço de envio de e-mails.
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Mensagem registrada! Em breve o envio automático estará ativo.", {
        description: "Enquanto isso, o contato pelo GitHub segue sendo o canal mais rápido.",
      });
    }, 700);
  }

  return (
    <section id="contato" className="relative py-20 md:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="contato"
            title="Vamos construir algo juntos?"
            subtitle="Estou aberto a oportunidades, colaborações, projetos e desafios que permitam criar soluções úteis e evoluir como desenvolvedor."
          />
          <Reveal delay={80} className="mt-8 flex flex-wrap gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
            >
              <Github className="size-4" aria-hidden />
              GitHub
            </a>
            <span className="inline-flex items-center gap-2 rounded-xl border border-border/70 px-5 py-3 text-sm text-muted-foreground">
              <Mail className="size-4 text-accent" aria-hidden />
              Envie sua mensagem pelo formulário
            </span>
          </Reveal>
          <Reveal delay={140} className="panel mt-8 p-5 font-mono text-xs text-muted-foreground">
            <p className="text-accent">// disponibilidade</p>
            <p className="mt-2">status: aberto a oportunidades e freelance</p>
            <p>local: Maragogi, Alagoas — Brasil</p>
            <p>foco: Java · Spring Boot · APIs REST</p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <form onSubmit={handleSubmit} noValidate className="panel p-6 md:p-8">
            <div className="grid gap-5">
              {FIELDS.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase"
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
                    className="mt-2 w-full rounded-lg border border-input bg-background/60 px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
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
                  className="font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  placeholder="Conte um pouco sobre a ideia, projeto ou oportunidade."
                  aria-invalid={Boolean(errors.mensagem)}
                  aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
                  className="mt-2 w-full resize-y rounded-lg border border-input bg-background/60 px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                />
                {errors.mensagem ? (
                  <p id="mensagem-erro" className="mt-1.5 text-xs text-destructive">
                    {errors.mensagem}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                style={{ background: "var(--gradient-brand)" }}
              >
                {sending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}
                {sending ? "Enviando..." : "Enviar mensagem"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
