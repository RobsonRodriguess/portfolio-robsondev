# Robson Rodrigues — Software Engineer Portfolio

Portfólio pessoal e showcase de projetos desenvolvido por **Robson Rodrigues**, Engenheiro de Software & Desenvolvedor Fullstack baseado em Brasília, DF.

Construído com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** e **Framer Motion**, com foco em engenharia limpa, alta performance, acessibilidade e experiência de usuário.

🌐 **Acesse online:** [robsondev.vercel.app](https://robsondev.vercel.app)

---

## 🚀 Destaques do Projeto

- **Showcase de Projetos:** Grid editorial 2x2 com foco no essencial, screenshots reais das aplicações em produção, tags de tecnologias e links diretos para plataformas no ar e repositórios.
- **Matriz de Arquitetura & Especialidades:** Painel interativo de competências técnicas categorizadas (Frontend, Backend, Bancos de Dados e DevOps) com inspeção detalhada de aplicações em produção.
- **Career Timeline:** Trajetória profissional e acadêmica com indicador interativo e detalhamento de entregas.
- **Internacionalização Nativa (i18n):** Suporte completo e dinâmico a múltiplos idiomas (Português e Inglês) via Context API.
- **Integração Spotify em Tempo Real:** Widget e card conectado à API oficial do Spotify exibindo a faixa em reprodução no momento (*Now Playing*).
- **Dark / Light Mode:** Alternância fluida de temas sem flash de estilos (FOUC), persistida via `next-themes`.
- **Performance & SEO:** Otimização para Core Web Vitals, metadados dinâmicos e geração automatizada de OpenGraph via `@vercel/og`.
- **Observabilidade:** Monitoramento e telemetria integrados com `@vercel/analytics` e `@vercel/speed-insights`.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Biblioteca UI:** [React 19](https://react.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Observabilidade:** [@vercel/analytics](https://vercel.com/analytics) & [@vercel/speed-insights](https://vercel.com/docs/speed-insights)
- **Deploy & Infra:** [Vercel](https://vercel.com/)

---

## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── api/                  # Endpoints serverless (Spotify, GitHub, Contato)
│   ├── globals.css           # Estilos globais e tokens Tailwind
│   ├── layout.tsx            # Root layout, providers e metadados SEO/OG
│   ├── page.tsx              # Página principal do portfólio
│   ├── opengraph-image.tsx   # Geração dinâmica da imagem OpenGraph
│   ├── sitemap.ts            # Geração do sitemap.xml
│   └── robots.ts             # Configuração do robots.txt
└── components/               # Componentes modulares
    ├── AboutMe.tsx           # Seção sobre mim
    ├── WorksSection.tsx      # Showcase de projetos selecionados
    ├── SkillTree.tsx         # Matriz interativa de arquitetura e competências
    ├── Timeline.tsx          # Linha do tempo de carreira e formação
    ├── StatsSection.tsx      # Métricas e estatísticas
    ├── FloatingSpotify.tsx   # Player flutuante do Spotify
    ├── SpotifyCard.tsx       # Card musical com Now Playing
    ├── ThemeToggle.tsx       # Alternador de tema (Dark/Light)
    └── LanguageToggle.tsx    # Alternador de idioma (PT/EN)
```

---

## 👤 Autor

**Robson Rodrigues**  
- GitHub: [@RobsonRodriguess](https://github.com/RobsonRodriguess)  
- LinkedIn: [Robson Rodrigues](https://www.linkedin.com/in/robson-rodrigues-dev)  
- Localização: Brasília, DF — Brasil  
- Portfólio: [robsondev.vercel.app](https://robsondev.vercel.app)
