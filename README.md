<div align="center">

![NEXUS Portfolio](https://img.shields.io/badge/NEXUS-Portfolio-22c55e?style=for-the-badge&logo=github&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Personal portfolio built with **Next.js**, **Framer Motion**, and a whole lot of attention to detail.

[Live Demo](https://your-url-here.vercel.app) · [Report Bug](https://github.com/RobsonRodriguess/meu-portfolio/issues)

<img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2FRobsonRodriguess%2Fmeu-portfolio&query=%24.stargazers_count&label=Stars&style=flat&color=orange" alt="Stars" />
<img src="https://img.shields.io/github/forks/RobsonRodriguess/meu-portfolio?label=Forks&style=flat&color=blue" alt="Forks" />
<img src="https://img.shields.io/github/last-commit/RobsonRodriguess/meu-portfolio?style=flat&color=green" alt="Last Commit" />

</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **Glitch Title** | Auto-cycling scramble decode effect on the hero name + hover interactions + SFX |
| **Selected Works** | Interactive project showcase with navigation, badges, and animated transitions |
| **NEXUS Terminal** | VS Code-style terminal with typing animation, `neofetch`, `skills`, `matrix` and more |
| **Career Timeline** | Expandable cards with alternating layout, animated progress line, and skill stats |
| **Skill Constellation** | Interactive node graph with SVG connections, floating nodes, and detail modals |
| **Coding Rhythm** | Animated music section with floating notes, equalizer bars, and Spotify integration |
| **Void Defender** | 🎮 Easter egg space shooter (Konami code or footer button) |
| **Loading Screen** | Terminal-style boot sequence with progress bar |
| **Sound Effects** | Subtle hover/click audio via `SoundContext` |
| **Dark / Light** | Full theme support with smooth transitions |

## Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

</div>

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles
├── components/
│   ├── GlitchTitle.tsx     # Scramble decode hero title
│   ├── LoadingScreen.tsx   # Terminal boot animation
│   ├── SkillTree.tsx       # Interactive skill constellation
│   ├── SpaceShooter.tsx    # Easter egg space shooter
│   ├── Terminal.tsx        # Interactive VS Code-style terminal
│   ├── Timeline.tsx        # Career milestone cards
│   ├── SoundContext.tsx    # Global audio provider
│   ├── SoundToggle.tsx     # Mute toggle button
│   ├── SpotifyCard.tsx     # Spotify now-playing card
│   ├── FloatingSpotify.tsx # Floating Spotify widget
│   ├── GithubStats.tsx     # GitHub contribution stats
│   └── ThemeProvider.tsx   # Dark/light theme provider
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Terminal Commands

The portfolio includes an interactive terminal. Try these:

| Command | Action |
|---------|--------|
| `help` | List all available commands |
| `neofetch` | System info with ASCII art |
| `skills` | Technical skills with animated bars |
| `projects` | Featured project list |
| `matrix` | Animated Matrix rain effect |
| `fortune` | Random dev wisdom quotes |
| `coffee` | ASCII coffee art |

> **Tip:** Press `Tab` to autocomplete commands and `↑/↓` to navigate history.

## Easter Egg

Type the **Konami Code** on your keyboard to unlock the space shooter:

```
↑ ↑ ↓ ↓ ← → ← → B A
```

Or click the **"Void Defender"** button in the footer.

---

<div align="center">

Built by [**Robson Rodrigues**](https://github.com/RobsonRodriguess) · Brasília, DF

![Visaual Studio Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NEXUS](https://img.shields.io/badge/NEXUS_v2.0-22c55e?style=for-the-badge)

</div>
