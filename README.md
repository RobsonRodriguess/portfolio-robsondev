# Robson Rodrigues — Software Engineer Portfolio

Portfólio pessoal e showcase de projetos desenvolvido por **Robson Rodrigues**, Engenheiro de Software & Desenvolvedor Fullstack baseado em Brasília, DF.

Construído com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** e **Framer Motion**, com foco em performance, experiência do usuário e design interativo.

🌐 **Acesse online:** [robsondev.vercel.app](https://robsondev.vercel.app)

---

## 🚀 Funcionalidades

- **Terminal Interativo:** Interface CLI estilizada no próprio navegador com comandos como `skills`, `projects`, `neofetch`, `fortune` e autocompletion via `Tab`.
- **Integração com Spotify:** Widget e card com status de reprodução em tempo real (*Now Playing*) via Spotify Web API.
- **Estatísticas do GitHub:** Integração direta com a API do GitHub para exibir linguagens mais utilizadas, repositórios e estrelas.
- **Internacionalização (i18n):** Suporte a múltiplos idiomas (Português e Inglês) via Context API.
- **Dark / Light Mode:** Alternância de temas fluida com persistência através de `next-themes`.
- **Efeitos Sonoros e Animações:** Micro-interações táteis opcionais com controle de áudio, além de animações fluidas com Framer Motion.
- **Void Defender (Easter Egg):** Mini game estilo arcade acessível via Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) ou pelo atalho no rodapé.
- **OpenGraph Dinâmico:** Geração automatizada de imagens sociais via `@vercel/og` para compartilhamento em redes sociais.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Biblioteca UI:** [React 19](https://react.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Analytics & Observabilidade:** [@vercel/analytics](https://vercel.com/analytics) & [@vercel/speed-insights](https://vercel.com/docs/speed-insights)
- **Deploy:** [Vercel](https://vercel.com/)

---

## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── api/                  # Endpoints serverless (Spotify, GitHub, Contato)
│   ├── globals.css           # Estilos globais e tokens Tailwind
│   ├── layout.tsx            # Root layout, providers e metadados SEO/OG
│   ├── page.tsx              # Página principal e seções do portfólio
│   ├── opengraph-image.tsx   # Geração dinâmica da imagem OpenGraph
│   ├── sitemap.ts            # Geração do sitemap.xml
│   └── robots.ts             # Configuração do robots.txt
└── components/               # Componentes reutilizáveis e interativos
    ├── AboutMe.tsx
    ├── CoursesSection.tsx
    ├── CurrentStack.tsx
    ├── FloatingSpotify.tsx
    ├── GithubStats.tsx
    ├── GlitchTitle.tsx
    ├── LanguageContext.tsx
    ├── SpaceShooter.tsx
    ├── SpotifyCard.tsx
    ├── Terminal.tsx
    └── Timeline.tsx
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# URL base do site
NEXT_PUBLIC_SITE_URL=https://robsondev.vercel.app

# Integração Web3Forms (Formulário de Contato)
WEB3FORMS_ACCESS_KEY=sua_chave_web3forms

# Integração GitHub API (Opcional, aumenta o rate-limit)
GITHUB_ACCESS_TOKEN=seu_github_personal_access_token

# Integração Spotify (Now Playing)
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
SPOTIFY_REFRESH_TOKEN=seu_refresh_token
```

---

## 💻 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/RobsonRodriguess/portfolio-robsondev.git
   cd portfolio-robsondev
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor local de desenvolvimento |
| `npm run build` | Compila o projeto otimizado para produção |
| `npm run start` | Inicia a build de produção localmente |
| `npm run lint` | Executa a verificação estática de código com ESLint |

---

## 👤 Autor

**Robson Rodrigues**  
- GitHub: [@RobsonRodriguess](https://github.com/RobsonRodriguess)  
- Localização: Brasília, DF — Brasil  
- Portfólio: [robsondev.vercel.app](https://robsondev.vercel.app)
