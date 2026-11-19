export const GITHUB_URL = "https://github.com/jcdev01";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jairo-costa-ab4a13346";
export const CONTACT_EMAIL = "Jairocostanascimento@gmail.com";

export const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "projetos", label: "Projetos" },
  { id: "jornada", label: "Jornada" },
  { id: "arquitetura", label: "Arquitetura" },
  { id: "contato", label: "Contato" },
] as const;

export const FOCUS = [
  { title: "Desenvolvimento Backend", text: "Aplicações organizadas e manuteníveis." },
  { title: "Java e Spring Boot", text: "Arquitetura em camadas e ecossistema Spring." },
  { title: "APIs REST", text: "Endpoints claros, contratos e validações." },
  { title: "Bancos relacionais", text: "Modelagem, consultas e persistência." },
  { title: "Segurança e autenticação", text: "Spring Security e autenticação JWT." },
  { title: "Arquitetura de software", text: "Boas práticas e estudos em microsserviços." },
] as const;

export const STACK = [
  {
    name: "Java",
    tag: "linguagem principal",
    description:
      "Programação orientada a objetos, Collections, Streams, regras de negócio e desenvolvimento de aplicações.",
  },
  {
    name: "Spring Boot",
    tag: "framework backend",
    description:
      "Desenvolvimento de APIs REST, Spring Data JPA, Spring Security, autenticação JWT e arquitetura em camadas.",
  },
  {
    name: "Bancos de Dados",
    tag: "persistência",
    description: "PostgreSQL, MySQL, modelagem relacional, consultas e persistência de dados.",
  },
  {
    name: "Python",
    tag: "automação",
    description: "Automação, lógica de programação, scripts e desenvolvimento de aplicações.",
  },
  {
    name: "Git e GitHub",
    tag: "versionamento",
    description: "Versionamento, organização de projetos, colaboração e controle de código.",
  },
  {
    name: "APIs e Arquitetura",
    tag: "arquitetura",
    description:
      "APIs REST, arquitetura backend, comunicação entre serviços e estudos em microsserviços.",
  },
] as const;

export const JOURNEY = [
  {
    title: "Início dos estudos em tecnologia",
    text: "Primeiro contato com lógica de programação, algoritmos e desenvolvimento de software.",
  },
  {
    title: "Formação acadêmica em Ciência da Computação",
    text: "Base teórica em estruturas de dados, bancos de dados e engenharia de software.",
  },
  {
    title: "Desenvolvimento com Java",
    text: "Orientação a objetos, Collections, Streams e construção de aplicações organizadas.",
  },
  {
    title: "Aprendizado de Spring Boot",
    text: "Arquitetura em camadas, Spring Data JPA e ecossistema Spring aplicado a projetos.",
  },
  {
    title: "Desenvolvimento de APIs REST",
    text: "Modelagem de endpoints, contratos de requisição e resposta, validações e boas práticas.",
  },
  {
    title: "Segurança, arquitetura e microsserviços",
    text: "Estudos em Spring Security, autenticação JWT, arquitetura de software e microsserviços.",
  },
  {
    title: "Projetos pessoais e acadêmicos",
    text: "Aplicação prática dos estudos em projetos publicados e versionados no GitHub.",
  },
  {
    title: "Em busca de oportunidades profissionais",
    text: "Aberto a oportunidades, colaborações, projetos e trabalhos freelance na área de backend.",
  },
] as const;

export const PROCESS = [
  { step: "01", title: "Entender o problema", text: "Contexto, usuários e regras que importam." },
  { step: "02", title: "Planejar a solução", text: "Escopo, fluxos e decisões técnicas iniciais." },
  { step: "03", title: "Modelar dados e regras", text: "Entidades, relacionamentos e validações." },
  { step: "04", title: "Desenvolver a API", text: "Endpoints, camadas, segurança e integrações." },
  {
    step: "05",
    title: "Testar e validar",
    text: "Verificação de comportamento e cenários de erro.",
  },
  { step: "06", title: "Evoluir a aplicação", text: "Refino, organização e melhoria contínua." },
] as const;
