"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "./LanguageContext";
import { useSound } from "./SoundContext";

interface Project {
  id: string;
  title: string;
  category: { pt: string; en: string };
  year: string;
  isLive: boolean;
  description: { pt: string; en: string };
  techs: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "candangos-shop",
    title: "Candangos Shop",
    category: {
      pt: "E-Commerce",
      en: "E-Commerce",
    },
    year: "2025",
    isLive: true,
    description: {
      pt: "Loja digital moderna com catálogo de busca instantânea, carrinho dinâmico com persistência e checkout ágil focado em mobile.",
      en: "Modern digital storefront with instant catalog search, persistent dynamic cart, and streamlined mobile-first checkout.",
    },
    techs: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    image: "/candangos.png",
    liveUrl: "https://candangos-shop.vercel.app/",
    githubUrl: "https://github.com/RobsonRodriguess/candangos-shop",
  },
  {
    id: "gabriela-decoracoes",
    title: "Gabriela Decorações",
    category: {
      pt: "Website Comercial",
      en: "Commercial Platform",
    },
    year: "2025",
    isLive: true,
    description: {
      pt: "Website corporativo para cliente real, com SEO técnico para indexação no Google, carregamento instantâneo e Core Web Vitals no verde.",
      en: "Commercial website for a real client, engineered for Google search indexing, instant edge loads, and green Core Web Vitals.",
    },
    techs: ["Next.js", "Tailwind CSS", "SEO Técnico", "Vercel Analytics"],
    image: "/gabrieladecora.png",
    liveUrl: "https://www.gabrieladecoracoes.com.br/",
  },
  {
    id: "mind-health",
    title: "Mind Health",
    category: {
      pt: "Plataforma E-Health",
      en: "E-Health Platform",
    },
    year: "2024",
    isLive: false,
    description: {
      pt: "Plataforma para atendimento psicológico digital com autenticação segura e controle de acesso (RBAC), desenvolvida e defendida no TCC do IFG.",
      en: "Digital mental health platform with secure role-based access control (RBAC), engineered and defended as Bachelor's Capstone at IFG.",
    },
    techs: ["Next.js", "Node.js", "Tailwind CSS", "Segurança & OWASP"],
    image: "/mindhealth.png",
    githubUrl: "https://github.com/RobsonRodriguess/Mind-Health",
  },
  {
    id: "aviator-clone-pro",
    title: "Aviator Clone Pro",
    category: {
      pt: "Lógica em Tempo Real",
      en: "Real-Time Logic",
    },
    year: "2024",
    isLive: false,
    description: {
      pt: "Simulador de probabilidade com loop em 60 FPS, motor matemático de multiplicadores exponenciais e interface reativa concorrente.",
      en: "Real-time probability simulator featuring a 60 FPS animation loop, custom mathematical multiplier engine, and concurrent UI.",
    },
    techs: ["React 19", "JavaScript", "Math Engine", "Tailwind CSS"],
    image: "/aviator.png",
    githubUrl: "https://github.com/RobsonRodriguess/aviator-clone-pro",
  },
];

const I18N = {
  pt: {
    title: "Projetos Selecionados",
    subtitle: "Aplicações reais em produção, com foco em código limpo, performance e experiência do usuário.",
    liveTag: "No ar",
    sourceTag: "Código",
    visitLive: "Acessar site",
    viewSource: "Ver no GitHub",
  },
  en: {
    title: "Selected Projects",
    subtitle: "Real-world production applications, focused on clean code, performance, and user experience.",
    liveTag: "Live",
    sourceTag: "Source",
    visitLive: "Visit live site",
    viewSource: "View on GitHub",
  },
};

export default function WorksSection() {
  const { lang } = useLanguage();
  const { playHover, playClick } = useSound();
  const t = I18N[lang] || I18N.pt;

  return (
    <section className="py-24 relative z-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - Clean & confident */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
            {t.title}
            <span className="text-sky-500">.</span>
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-xl font-light">
            {t.subtitle}
          </p>
        </div>

        {/* 2x2 Curated Grid - Instant scan, zero friction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => {
            const primaryLink = project.liveUrl || project.githubUrl || "#";

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e] p-5 sm:p-6 transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Image container */}
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-6 cursor-pointer border border-zinc-200/60 dark:border-white/[0.05]"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Status Pill on top-right */}
                    <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium backdrop-blur-md bg-black/70 text-white border border-white/10 shadow-sm">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.isLive ? "bg-emerald-400 animate-pulse" : "bg-zinc-400"
                          }`}
                        />
                        {project.isLive ? t.liveTag : t.sourceTag}
                      </span>
                    </div>
                  </a>

                  {/* Header: Title + Category */}
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors group-hover:text-sky-500 dark:group-hover:text-sky-400">
                      <a
                        href={primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="inline-flex items-center gap-1.5"
                      >
                        {project.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                      </a>
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                      {project.category[lang]} · {project.year}
                    </span>
                  </div>

                  {/* Concise description */}
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-light mb-6">
                    {project.description[lang]}
                  </p>
                </div>

                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-zinc-100 dark:border-white/[0.05]">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/[0.05]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-4 text-xs font-mono">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="inline-flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                      >
                        <span>{t.visitLive}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="inline-flex items-center gap-1.5 font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      >
                        <SiGithub className="w-3.5 h-3.5" />
                        <span>{t.viewSource}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
