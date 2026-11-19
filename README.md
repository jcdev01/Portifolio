# Jairo Costa — Portfólio

Portfólio pessoal de Jairo Costa, desenvolvedor backend focado em Java, Spring Boot, APIs REST e arquitetura de software. Projetos e estatísticas são carregados em tempo real da API pública do GitHub.

## Sobre

Uma página única, editorial e responsiva, que apresenta trajetória, stack, projetos publicados e formas de contato. Os dados de repositórios, seguidores, linguagens e atividade vêm do GitHub — não há lista manual de projetos para manter.

## Tecnologias

- React 19 + TypeScript
- TanStack Start, Router e Query
- Vite 8 + Tailwind CSS 4
- GSAP (ScrollTrigger) para animações
- Zod (validação) + Sonner (notificações)
- Lucide React e componentes Radix UI

## Funcionalidades

- Projetos publicados no GitHub, com filtro por linguagem e links de código/demo
- Estatísticas ao vivo: repositórios, seguidores, linguagens, stars e forks
- Card de perfil e gráfico de linguagens alimentados pela API
- Animações de entrada, parallax, contadores e linha do tempo com GSAP
- Formulário validado que abre o aplicativo de e-mail com a mensagem pronta
- SEO: metadados, Schema.org, favicon SVG e imagem de preview (Open Graph)
- Respeito a `prefers-reduced-motion`, navegação por teclado e contraste WCAG AA

## Como executar

```bash
bun install
bun run dev
```

Alternativa com npm:

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Scripts

| Comando             | Descrição                   |
| ------------------- | --------------------------- |
| `bun run dev`       | Servidor de desenvolvimento |
| `bun run build`     | Build de produção           |
| `bun run build:dev` | Build em modo development   |
| `bun run preview`   | Preview do build            |
| `bun run lint`      | ESLint + Prettier           |
| `bun run format`    | Formatação com Prettier     |

## Estrutura

```
src/
├── components/portfolio/   Seções e primitivas visuais
├── components/ui/          Componentes base (shadcn/Radix)
├── hooks/use-github.ts     Hook com cache React Query
├── lib/github.ts           Cliente, tipos e agregação de estatísticas
├── lib/motion.ts           Configuração do GSAP
├── routes/                 Página inicial e layout raiz
└── styles.css              Design system (tokens e utilities)
```

## Dados do GitHub

A API pública é usada sem autenticação e o usuário consultado é `jcdev01`. Perfil e repositórios vêm de dois endpoints; a distribuição de linguagens usa `/repos/{owner}/{repo}/languages`, que retorna bytes reais de código por linguagem — o tamanho total do repositório não é usado como peso, pois inclui imagens e outros assets. O resultado fica em cache por 30 minutos (React Query + `sessionStorage`) para respeitar o limite de 60 requisições por hora. A fonte está em `src/lib/github.ts`.

## Contato

- E-mail: Jairocostanascimento@gmail.com
- GitHub: https://github.com/jcdev01
- LinkedIn: https://www.linkedin.com/in/jairo-costa-ab4a13346

## Autor

**Jairo Costa** — Maragogi, Alagoas — Brasil.
