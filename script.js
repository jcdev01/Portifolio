// Stack
const stack = ["Java", "Spring", "Python", "JavaScript", "HTML/CSS", "REST APIs", "Git"];

// Projetos
const projects = [
  {
    title: "Site Rio Carima",
    description: "Site institucional desenvolvido com HTML, CSS e JavaScript, hospedado na Vercel.",
    language: "Html, css e js",
    icon: "🌐",
    repo: "https://github.com/jcdev01/Site-rio-Carima",
    demo: "https://site-rio-carima.vercel.app",
  },
  {
    title: "Login — Frontend",
    description: "Interface de autenticação consumindo a API de login. Layout responsivo e integração via fetch.",
    language: "Html,css e js",
    icon: "🔐",
    repo: "https://github.com/jcdev01/Login-frontend",
    demo: "https://login-frontend-orcin.vercel.app",
  },
  {
    title: "Login — Backend API",
    description: "API REST de autenticação em Java/Spring com JWT, validação de usuários e rotas protegidas.",
    language: "Java",
    icon: "⚙️",
    repo: "https://github.com/jcdev01/Login-backend-API",
  },
  {
    title: "Projeto Java Web Spring",
    description: "Aplicação web full-stack construída com Spring Framework, explorando MVC e persistência.",
    language: "Java",
    icon: "☕",
    repo: "https://github.com/jcdev01/Projeto-java-web-spring",
  },
  {
    title: "Locadora",
    description: "Sistema de locadora em Python com modelagem de dados e regras de negócio para aluguéis.",
    language: "Python",
    icon: "🚗",
    repo: "https://github.com/jcdev01/Locadora",
  },
  {
    title: "bora ler ",
    description: " Aplicação WEB de Biblioteca Virtual com autenticação local, Busca de livros via API Open Library",
    language: "Html,css e js",
    icon: "📘",
    repo: "https://github.com/jcdev01/menu-terminal",
    demo:"https://boraler.vercel.app"
  },
  {
    title: "Maré Burguer — Cardápio",
    description: "Cardápio digital de hamburgueria, primeira versão em HTML/CSS.",
    language: "HTML",
    icon: "🍔",
    repo: "https://github.com/jcdev01/Mare-Burguer-cardapio-old",
  },
  {
    title: "Vibenet",
    description: "PixelNet é uma rede social simulada no estilo anos 2000 , construída com HTML, CSS e JavaScript puro. O projeto consome a JSONPlaceholder API",
    language: "Html,css e js",
    icon: "🌐",
    repo: "https://github.com/jcdev01/jairocosta-analise-de-lista",
    demo: "https://vibe-net-rho.vercel.app/"
  },
];



// Render projetos
const grid = document.getElementById("projects-grid");
projects.forEach((p) => {
  const article = document.createElement("article");
  article.className = "card";
  article.innerHTML = `
    <div class="card-head">
      <div class="card-icon">${p.icon}</div>
      <span class="card-lang">${p.language}</span>
    </div>
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <div class="card-links">
      <a href="${p.repo}" target="_blank" rel="noopener">↗ Código</a>
      ${p.demo ? `<a class="demo" href="${p.demo}" target="_blank" rel="noopener">↗ Demo</a>` : ""}
    </div>
  `;
  grid.appendChild(article);
});

// Ano dinâmico
document.getElementById("year").textContent = new Date().getFullYear();
 

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});

document.addEventListener("mousedown", () => {
    cursor.classList.add("click");
});

document.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
});

