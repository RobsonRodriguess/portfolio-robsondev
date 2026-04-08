"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Lang = 'en' | 'pt';

type Texts = {
  hero_badge: string;
  hero_title: string;
  resume_btn: string;
  works_title: string;
  works_label: string;
  live: string;
  source: string;
  visit_live: string;
  view_source: string;
  available: string;
  connecting_title: string;
  rhythm_label: string;
  genre_pop: string;
  genre_metal: string;
  genre_alt: string;
  genre_indie: string;
  coding_text: string;
  rhythm_text: string;
  mood: string;
  mood_val: string;
  vibe: string;
  vibe_val: string;
  output: string;
  output_val: string;
  in_zone: string;
  coding_rhythm_desc: string;
  github: string;
  linkedin: string;
  discord: string;
  discord_copy: string;
  discord_copied: string;
  send_title: string;
  send_subtitle: string;
  send_btn: string;
  sending_btn: string;
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  message_label: string;
  message_placeholder: string;
  success_title: string;
  success_text: string;
  success_again: string;
  footer_text: string;
  stats_projects: string;
  stats_technologies: string;
  stats_experience: string;
  stats_commits: string;
  easter_egg: string;
  void_defender: string;
  sound_on: string;
  sound_off: string;
  about_badge: string;
  about_title: string;
  about_location: string;
  about_p1: string;
  about_p2: string;
  about_p3: string;
  about_p4: string;
  theme_dark: string;
  theme_light: string;
  scroll_top: string;
  projects: {
    [key: string]: {
      category: string;
      description: string;
      title: string;
    };
  };
  techs: string[];
};

const texts: Record<Lang, Texts> = {
  en: {
    hero_badge: "Software Engineer & Frontend",
    hero_title: "Robson",
    resume_btn: "View Resume",
    works_title: "Selected",
    works_label: "Works.",
    live: "LIVE",
    source: "SOURCE",
    visit_live: "Visit Live Site",
    view_source: "View on GitHub",
    available: "Available for work",
    connecting_title: "CODING",
    rhythm_label: "Rhythm.",
    genre_pop: "Pop",
    genre_metal: "Metal",
    genre_alt: "Alt Rock",
    genre_indie: "Indie",
    coding_text: "CODING",
    rhythm_text: "Rhythm.",
    mood: "Mood",
    mood_val: "🎧 Focused",
    vibe: "Vibe",
    vibe_val: "Flow State",
    output: "Output",
    output_val: "2x Speed",
    in_zone: "In the zone",
    coding_rhythm_desc: "My musical taste when coding ranges from Billie Eilish and Sabrina Carpenter to 2ZDinizz, Froid, Breezee, and more. The rhythm dictates the speed of the code.",
    github: "GitHub",
    linkedin: "LinkedIn",
    discord: "Discord",
    discord_copy: "Click to copy ID",
    discord_copied: "ID Copied!",
    send_title: "Send a message",
    send_subtitle: "I'll respond within 24h",
    send_btn: "SEND MESSAGE",
    sending_btn: "SENDING...",
    name_label: "Name",
    name_placeholder: "Your name",
    email_label: "Email",
    email_placeholder: "your@email.com",
    message_label: "Message",
    message_placeholder: "How can I help with your project?",
    success_title: "Email sent!",
    success_text: "Your message was successfully received. I will get back to you shortly.",
    success_again: "Send another message",
    footer_text: "© 2026 Developed by Robson Rodrigues",
    stats_projects: "Projects",
    stats_technologies: "Technologies",
    stats_experience: "Experience",
    stats_commits: "Commits/yr",
    easter_egg: "Void Defender",
    void_defender: "Void Defender",
    sound_on: "Sound On",
    sound_off: "Sound Off",
    about_badge: "Who I am",
    about_title: "About Me.",
    about_location: "Brasilia, DF",
    about_p1: "I'm Robson Rodrigues, originally from Brasilia, graduate in Systems Analysis and Development from IFG — Formosa campus. I've always been drawn to technology — from early on I wanted to be part of this world.",
    about_p2: "It all started in middle school when I got my first contact with a computer and tinkered with private CS 1.6 game servers. That hands-on curiosity — the freedom of editing configs, tweaking servers, seeing instant results — hooked me. The moment I finished high school, I went straight to college.",
    about_p3: "Today my focus is on React and frontend — designing interfaces from scratch and styling them until they're pixel-perfect is what brings me the most satisfaction. But I'm no stranger to full-stack or gamedev. I've shipped complete projects across NestJS, PostgreSQL, Docker, and even Roblox Studio.",
    about_p4: "Beyond code, I'm into voice acting, gaming, writing music, and exploring AI tools. I built my first PC at 12 years old. I'm always looking for what's next.",
    theme_dark: "Dark Mode",
    theme_light: "Light Mode",
    scroll_top: "Back to top",
    projects: {
      "1": {
        category: "E-HEALTH PLATFORM",
        description: "Robust architecture for psychological support. Hyper-focused on sensitive data security, complex role management, and academic rigor in backend development.",
        title: "Mind Health",
      },
      "2": {
        category: "REAL-TIME LOGIC",
        description: "Real-time probability simulator with an extreme focus on mathematical modeling and backend logic. Features a transparent, high-frequency multiplier calculation system.",
        title: "Aviator Clone Pro",
      },
      "3": {
        category: "E-COMMERCE UI/UX",
        description: "Digital storefront strictly focused on the user journey. Features dynamic product filtering, an optimized shopping cart state, and high-performance responsive UI.",
        title: "Candangos Shop",
      },
      "4": {
        category: "SEO & PERFORMANCE",
        description: "Production-ready platform delivered with a heavy focus on Search Engine Optimization (SEO), Core Web Vitals, and active traffic monitoring analytics.",
        title: "Gabriela Decorações",
      },
    },
    techs: [
      "REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS",
      "LUA", "ROBLOX STUDIO", "JAVA", "PYTHON",
      "NESTJS", "POSTGRESQL", "MYSQL", "SUPABASE",
      "PRISMA", "TAILWIND", "DOCKER", "NGINX", "GIT"
    ],
  },
  pt: {
    hero_badge: "Engenheiro de Software & Frontend",
    hero_title: "Robson",
    resume_btn: "Ver Currículo",
    works_title: "Trabalhos",
    works_label: "Selecionados.",
    live: "NO AR",
    source: "CÓDIGO",
    visit_live: "Visitar Site",
    view_source: "Ver no GitHub",
    available: "Disponível para trabalho",
    connecting_title: "CODANDO",
    rhythm_label: "Ritmo.",
    genre_pop: "Pop",
    genre_metal: "Metal",
    genre_alt: "Rock Alt",
    genre_indie: "Indie",
    coding_text: "CODANDO",
    rhythm_text: "Ritmo.",
    mood: "Humor",
    mood_val: "🎧 Focado",
    vibe: "Vibe",
    vibe_val: "Flow State",
    output: "Performance",
    output_val: "2x Velocidade",
    in_zone: "Na zona",
    coding_rhythm_desc: "Meu gosto musical ao codar vai de Billie Eilish e Sabrina Carpenter a 2ZDinizz, Froid, Breezee e mais. O ritmo dita a velocidade do código.",
    github: "GitHub",
    linkedin: "LinkedIn",
    discord: "Discord",
    discord_copy: "Clique para copiar ID",
    discord_copied: "ID Copiado!",
    send_title: "Envie uma mensagem",
    send_subtitle: "Responderei em até 24h",
    send_btn: "ENVIAR MENSAGEM",
    sending_btn: "ENVIANDO...",
    name_label: "Nome",
    name_placeholder: "Seu nome",
    email_label: "Email",
    email_placeholder: "seu@email.com",
    message_label: "Mensagem",
    message_placeholder: "Como posso ajudar no seu projeto?",
    success_title: "Mensagem enviada!",
    success_text: "Sua mensagem foi recebida com sucesso. Responderei em breve.",
    success_again: "Enviar outra mensagem",
    footer_text: "© 2026 Desenvolvido por Robson Rodrigues",
    stats_projects: "Projetos",
    stats_technologies: "Tecnologias",
    stats_experience: "Experiência",
    stats_commits: "Commits/ano",
    easter_egg: "Void Defender",
    void_defender: "Void Defender",
    sound_on: "Som Ligado",
    sound_off: "Som Desligado",
    about_badge: "Quem sou eu",
    about_title: "Sobre Mim.",
    about_location: "Brasília, DF",
    about_p1: "Sou Robson Rodrigues, natural de Brasília, formado em Análise e Desenvolvimento de Sistemas pelo IFG — campus Formosa. Sempre fui atraído pela tecnologia — desde cedo quis fazer parte desse universo.",
    about_p2: "Tudo começou no ensino fundamental, quando tive meu primeiro contato com o computador e mexi com servidores de CS 1.6. Aquela curiosidade prática — a liberdade de editar configs, mexer em servidores, ver resultados na hora — me fisgou. Assim que terminei o ensino médio, fui direto pra faculdade.",
    about_p3: "Hoje meu foco é React e frontend — planejar interfaces do zero e estilizar até cada pixel ficar no lugar é o que mais me dá satisfação. Mas não sou leigo em fullstack ou gamedev. Entrego projetos completos com NestJS, PostgreSQL, Docker e até Roblox Studio.",
    about_p4: "Fora do código, curto dublagem, jogos, já escrevi músicas e exploro ferramentas de IA a fundo. Montei meu primeiro computador aos 12 anos. Sempre buscando o que vem depois.",
    theme_dark: "Modo Escuro",
    theme_light: "Modo Claro",
    scroll_top: "Voltar ao topo",
    projects: {
      "1": {
        category: "PLATAFORMA E-HEALTH",
        description: "Arquitetura robusta para suporte psicológico. Focada em segurança de dados sensíveis, gerenciamento complexo de perfis e rigor acadêmico no backend.",
        title: "Mind Health",
      },
      "2": {
        category: "LÓGICA EM TEMPO REAL",
        description: "Simulador de probabilidade em tempo real com foco extremo em modelagem matemática e lógica backend. Sistema transparente de cálculo de multiplicadores em alta frequência.",
        title: "Aviator Clone Pro",
      },
      "3": {
        category: "E-COMMERCE UI/UX",
        description: "Loja digital focada na jornada do usuário. Filtragem dinâmica de produtos, carrinho otimizado e UI responsiva de alta performance.",
        title: "Candangos Shop",
      },
      "4": {
        category: "SEO & PERFORMANCE",
        description: "Plataforma pronta para produção com forte foco em Otimização para Mecanismos de Busca (SEO), Core Web Vitals e análise ativa de tráfego.",
        title: "Gabriela Decorações",
      },
    },
    techs: [
      "REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS",
      "LUA", "ROBLOX STUDIO", "JAVA", "PYTHON",
      "NESTJS", "POSTGRESQL", "MYSQL", "SUPABASE",
      "PRISMA", "TAILWIND", "DOCKER", "NGINX", "GIT"
    ],
  },
};

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: Texts;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && (saved === 'en' || saved === 'pt')) {
      setLang(saved);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'pt' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: texts[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
