import { BookOpen, Database, Layers, Lock, Route, Server, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { ScrollReveal } from "./scroll-reveal";

const FOCUS = [
  { icon: Server, title: "Desenvolvimento Backend", text: "Aplicações organizadas e manuteníveis." },
  { icon: Layers, title: "Java e Spring Boot", text: "Arquitetura em camadas e ecossistema Spring." },
  { icon: Route, title: "APIs REST", text: "Endpoints claros, contratos e validações." },
  { icon: Database, title: "Bancos relacionais", text: "Modelagem, consultas e persistência." },
  { icon: Lock, title: "Segurança e autenticação", text: "Spring Security e autenticação JWT." },
  { icon: Sparkles, title: "Arquitetura de software", text: "Boas práticas e estudos em microsserviços." },
];

export function About() {
  return (
    <section id="sobre" className="relative py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="sobre"
            title="Construindo o que acontece por trás das boas experiências digitais."
          />

          <div className="mt-6 space-y-4">
            <ScrollReveal
              text="Sou desenvolvedor backend e estudante de Ciência da Computação, com foco na criação de APIs, sistemas escaláveis e soluções backend utilizando Java, Spring Boot, bancos de dados relacionais e boas práticas de arquitetura de software."
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            />
            <ScrollReveal
              text="Meu trabalho acontece na camada que sustenta a experiência do usuário: modelagem de dados, regras de negócio, segurança, integrações e organização de código. Gosto de estruturas claras, responsabilidades bem definidas e soluções que continuem simples de evoluir."
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            />
            <ScrollReveal
              text="Também utilizo Python para automações, lógica e pequenas aplicações, e mantenho meus projetos versionados com Git e GitHub. Estou em constante aprendizado, com interesse particular em arquitetura de software e microsserviços."
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            />
          </div>

          <Reveal delay={140} className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Desenvolvedor backend", icon: Server },
              { label: "Ciência da Computação", icon: BookOpen },
              { label: "Aprendizado contínuo", icon: Sparkles },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs text-foreground/85"
              >
                <item.icon className="size-3.5 text-accent" aria-hidden />
                {item.label}
              </span>
            ))}
          </Reveal>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {FOCUS.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 60}
              className="group panel p-5 transition-colors hover:border-primary/45"
            >
              <item.icon className="size-5 text-accent transition-transform group-hover:-translate-y-0.5" aria-hidden />
              <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}