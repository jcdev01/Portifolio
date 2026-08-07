import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/portfolio/site-nav";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Stack } from "@/components/portfolio/stack";
import { Projects } from "@/components/portfolio/projects";
import { Journey } from "@/components/portfolio/journey";
import { Process } from "@/components/portfolio/process";
import { GitHubSection } from "@/components/portfolio/github-section";
import { Contact } from "@/components/portfolio/contact";
import { SiteFooter } from "@/components/portfolio/site-footer";

const TITLE = "Jairo Costa | Desenvolvedor Backend Java e Spring Boot";
const DESCRIPTION =
  "Portfólio de Jairo Costa, desenvolvedor backend focado em Java, Spring Boot, APIs REST, bancos de dados e arquitetura de software.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "Jairo Costa" },
      {
        name: "keywords",
        content:
          "Jairo Costa, desenvolvedor backend, Java, Spring Boot, API REST, PostgreSQL, portfólio",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Jairo Costa",
          jobTitle: "Desenvolvedor Backend",
          description: DESCRIPTION,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Maragogi",
            addressRegion: "AL",
            addressCountry: "BR",
          },
          knowsAbout: ["Java", "Spring Boot", "APIs REST", "PostgreSQL", "Python", "Git"],
          sameAs: ["https://github.com/jcdev01"],
        }),
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Ir para o conteúdo
      </a>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Journey />
        <Process />
        <GitHubSection />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
