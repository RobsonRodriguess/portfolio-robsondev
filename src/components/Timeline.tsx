"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Cloud,
  ChevronDown,
  MapPin,
  Star,
  ArrowRight,
  Terminal as TerminalIcon,
  Cpu,
} from "lucide-react";
import { useSound } from "./SoundContext";
import { useLanguage } from "./LanguageContext";

// ═══════════════════════════════════════════════════════════
//  Data with Full PT & EN Bilingual Support
// ═══════════════════════════════════════════════════════════
const timelineData = [
  {
    id: 1,
    period: { pt: "2026 — Presente", en: "2026 — Present" },
    periodTag: { pt: "FOCO ATUAL", en: "CURRENT FOCUS" },
    title: { pt: "Arquitetura Cloud & DevOps", en: "Cloud Architecture & DevOps" },
    company: { pt: "Especialização Contínua", en: "Continuous Specialization" },
    location: { pt: "Remoto / Brasília", en: "Remote / Brasília" },
    description: {
      pt: "Aprofundamento em infraestrutura escalável, computação em nuvem e governança de TI. Foco ativo nas certificações Azure Fundamentals (AZ-900) e ITIL v4, unindo engenharia de software fullstack moderna a práticas de entrega contínua e arquitetura em microsserviços.",
      en: "Deepening knowledge in scalable infrastructure, cloud computing, and IT governance. Actively pursuing Microsoft Azure Fundamentals (AZ-900) and ITIL v4 certifications, bridging modern fullstack software engineering with continuous delivery and microservices.",
    },
    icon: Cloud,
    color: "#38bdf8",
    colorClass: "sky",
    tags: ["Azure (AZ-900)", "Docker", "CI/CD", "ITIL v4", "Cloud Native", "Next.js 16"],
    stats: {
      pt: [
        { label: "Área", value: "Cloud & DevOps" },
        { label: "Meta", value: "AZ-900 + ITIL" },
        { label: "Status", value: "Em Progresso" },
      ],
      en: [
        { label: "Domain", value: "Cloud & DevOps" },
        { label: "Goal", value: "AZ-900 + ITIL" },
        { label: "Status", value: "In Progress" },
      ],
    },
    achievements: {
      pt: [
        "Preparação intensiva para exames oficiais Microsoft Azure Fundamentals",
        "Modelagem de pipelines de CI/CD automatizadas com GitHub Actions e Docker",
        "Aprofundamento em arquiteturas distribuídas e boas práticas ITIL",
      ],
      en: [
        "Intensive preparation for Microsoft Azure Fundamentals exams",
        "Architecting automated CI/CD pipelines with GitHub Actions & Docker",
        "Deep dive into distributed architectures and ITIL v4 service practices",
      ],
    },
  },
  {
    id: 2,
    period: { pt: "2025 — 2026", en: "2025 — 2026" },
    periodTag: { pt: "ENTREGAS EM PRODUÇÃO", en: "PRODUCTION DELIVERIES" },
    title: { pt: "Engenheiro Full Stack Freelancer", en: "Freelance Full Stack Engineer" },
    company: { pt: "Projetos Reais em Produção", en: "Real-World Production Projects" },
    location: { pt: "Brasília, DF", en: "Brasília, DF" },
    description: {
      pt: "Arquitetura e desenvolvimento de plataformas web completas para clientes reais. Criação do 'Candangos Shop' (e-commerce com foco em UX e responsividade) e 'Gabriela Decorações' (alta performance, Core Web Vitals no verde e estratégias avançadas de SEO técnico).",
      en: "Architecting and engineering complete web platforms for production clients. Delivered 'Candangos Shop' (e-commerce prioritizing UX & responsiveness) and 'Gabriela Decorações' (high performance, all-green Core Web Vitals, and technical SEO).",
    },
    icon: Briefcase,
    color: "#a855f7",
    colorClass: "purple",
    tags: ["Next.js", "React 19", "Tailwind CSS", "SEO Técnico", "Web Vitals", "PostgreSQL"],
    stats: {
      pt: [
        { label: "Aplicações", value: "2 em Produção" },
        { label: "Performance", value: "95+ Lighthouse" },
        { label: "Entrega", value: "100% no Prazo" },
      ],
      en: [
        { label: "Apps", value: "2 in Production" },
        { label: "Performance", value: "95+ Lighthouse" },
        { label: "Delivery", value: "100% On Time" },
      ],
    },
    achievements: {
      pt: [
        "Candangos Shop — Plataforma moderna de comércio eletrônico com Next.js",
        "Gabriela Decorações — Indexação no Google e otimização Core Web Vitals",
        "Integrações de formulários serverless, analytics e resiliência de borda",
      ],
      en: [
        "Candangos Shop — Modern e-commerce platform built with Next.js",
        "Gabriela Decorações — Search indexing & Core Web Vitals optimization",
        "Serverless form integration, edge resilience, and custom analytics",
      ],
    },
  },
  {
    id: 3,
    period: { pt: "2023 — 2027", en: "2023 — 2027" },
    periodTag: { pt: "FORMAÇÃO ACADÊMICA", en: "ACADEMIC FOUNDATION" },
    title: { pt: "Análise e Desenvolvimento de Sistemas", en: "Systems Analysis and Development" },
    company: { pt: "Instituto Federal de Goiás (IFG)", en: "Federal Institute of Goiás (IFG)" },
    location: { pt: "Goiás, Brasil", en: "Goiás, Brazil" },
    description: {
      pt: "Formação acadêmica sólida em ciência da computação, engenharia de software, estruturas de dados e arquitetura de sistemas. Projeto de conclusão de curso (TCC): defesa da plataforma de eHealth 'Mind Health', com backend seguro e arquitetura escalável.",
      en: "Rigorous academic education in computer science, software engineering, data structures, and system design. Capstone project: defense of 'Mind Health' eHealth platform, with hardened security and scalable architecture.",
    },
    icon: GraduationCap,
    color: "#10b981",
    colorClass: "emerald",
    tags: ["Estruturas de Dados", "Engenharia de Software", "Banco de Dados", "Segurança", "TCC"],
    stats: {
      pt: [
        { label: "Grau", value: "Tecnólogo" },
        { label: "TCC", value: "Mind Health" },
        { label: "Foco", value: "Engenharia de Software" },
      ],
      en: [
        { label: "Degree", value: "Associate Degree" },
        { label: "Capstone", value: "Mind Health" },
        { label: "Focus", value: "Software Engineering" },
      ],
    },
    achievements: {
      pt: [
        "Desenvolvimento e defesa do Mind Health — Plataforma de Saúde Digital",
        "Modelagem e normalização de bancos de dados relacionais e não-relacionais",
        "Fundamentação rigorosa em algoritmos, POO e padrões de projeto",
      ],
      en: [
        "Engineered and defended Mind Health — Digital Health Platform",
        "Relational and NoSQL database modeling and normalization",
        "Rigorous foundation in algorithms, OOP, and software design patterns",
      ],
    },
  },
];

const COLOR_CONFIG: Record<
  string,
  {
    accent: string;
    border: string;
    borderGlow: string;
    glow: string;
    nodeBg: string;
    badge: string;
    tagBg: string;
  }
> = {
  sky: {
    accent: "text-sky-400",
    border: "border-sky-500/30",
    borderGlow: "rgba(56, 189, 248, 0.25)",
    glow: "shadow-[0_0_25px_rgba(56,189,248,0.25)]",
    nodeBg: "bg-sky-500/10 border-sky-400 text-sky-400",
    badge: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    tagBg: "bg-sky-500/5 text-sky-300 border-sky-500/20 hover:border-sky-400",
  },
  purple: {
    accent: "text-purple-400",
    border: "border-purple-500/30",
    borderGlow: "rgba(168, 85, 247, 0.25)",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.25)]",
    nodeBg: "bg-purple-500/10 border-purple-400 text-purple-400",
    badge: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    tagBg: "bg-purple-500/5 text-purple-300 border-purple-500/20 hover:border-purple-400",
  },
  emerald: {
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    borderGlow: "rgba(16, 185, 129, 0.25)",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.25)]",
    nodeBg: "bg-emerald-500/10 border-emerald-400 text-emerald-400",
    badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    tagBg: "bg-emerald-500/5 text-emerald-300 border-emerald-500/20 hover:border-emerald-400",
  },
};

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();
  const { lang } = useLanguage();

  // Scroll progress for laser beam
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const toggleExpand = (id: number) => {
    playClick?.();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={containerRef} className="py-28 relative z-20 transition-colors duration-500">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-sky-500/[0.03] dark:bg-sky-500/[0.02] blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-purple-500/[0.03] dark:bg-purple-500/[0.02] blur-[140px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-28 text-center md:text-left"
        >
          <div className="flex items-center gap-3 justify-center md:justify-start mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>
              {lang === "pt"
                ? "Trajetória Profissional & Acadêmica"
                : "Professional & Academic Trajectory"}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
            CAREER{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 italic">
              Timeline.
            </span>
          </h2>
        </motion.div>

        {/* Central Circuit & Timeline */}
        <div className="relative">
          {/* Base Track Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-zinc-200 dark:bg-zinc-800/80 -translate-x-1/2" />

          {/* Active Laser Conduit Beam */}
          <motion.div
            style={{ height: beamHeight }}
            className="absolute left-6 md:left-1/2 top-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-sky-400 via-purple-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.7)] z-0 rounded-full origin-top"
          >
            {/* Travelling Laser Head */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(56,189,248,1),0_0_30px_rgba(168,85,247,0.8)] border border-sky-300" />
          </motion.div>

          {/* Milestone Cards */}
          <div className="space-y-16 md:space-y-24 relative z-10">
            {timelineData.map((item, index) => {
              const config = COLOR_CONFIG[item.colorClass];
              const isExpanded = expandedId === item.id;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16 items-start"
                >
                  {/* Central Timeline Node (Desktop) */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-20 hidden md:block">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      onClick={() => toggleExpand(item.id)}
                      className={`relative w-12 h-12 rounded-2xl border-2 ${config.nodeBg} backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 ${config.glow}`}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Mobile Node */}
                  <div className="absolute left-6 top-6 -translate-x-1/2 z-20 md:hidden">
                    <div
                      className={`w-9 h-9 rounded-xl border ${config.nodeBg} backdrop-blur-md flex items-center justify-center`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Placement */}
                  <div
                    className={`pl-14 sm:pl-16 md:pl-0 ${
                      isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2 md:col-end-3"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={playHover}
                      onClick={() => toggleExpand(item.id)}
                      className={`group relative rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0e0e10]/90 backdrop-blur-xl p-6 md:p-7 shadow-xl hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden ${
                        isExpanded ? "ring-1 ring-white/10" : ""
                      }`}
                      style={{
                        boxShadow: isExpanded
                          ? `0 20px 40px -15px ${config.borderGlow}`
                          : undefined,
                      }}
                    >
                      {/* Top Accent Gradient Bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                        }}
                      />

                      {/* Header Row: Year + Tag */}
                      <div
                        className={`flex items-center gap-3 mb-3 flex-wrap ${
                          isLeft ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-wider">
                          {item.period[lang]}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px]">
                          /
                        </span>
                        <span
                          className={`font-mono text-[10px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded border ${config.badge}`}
                        >
                          {item.periodTag[lang]}
                        </span>
                      </div>

                      {/* Title & Role */}
                      <h3 className="text-xl md:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-1.5">
                        {item.title[lang]}
                      </h3>

                      {/* Company & Location */}
                      <div
                        className={`flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-4 ${
                          isLeft ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {item.company[lang]}
                        </span>
                        <span>·</span>
                        <div className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          <span>{item.location[lang]}</span>
                        </div>
                      </div>

                      {/* Description Preview */}
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-light mb-5">
                        {item.description[lang]}
                      </p>

                      {/* Stats Grid */}
                      <div
                        className={`grid grid-cols-3 gap-2.5 pt-4 border-t border-zinc-100 dark:border-white/[0.05] mb-4 text-left`}
                      >
                        {item.stats[lang].map((s) => (
                          <div
                            key={s.label}
                            className="bg-zinc-50 dark:bg-white/[0.02] p-2.5 rounded-xl border border-zinc-100 dark:border-white/[0.04]"
                          >
                            <span className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                              {s.label}
                            </span>
                            <span className="block font-bold text-xs text-zinc-800 dark:text-zinc-200 truncate mt-0.5">
                              {s.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Deep Dive */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pt-2"
                          >
                            <div className="space-y-4 pt-3 border-t border-zinc-100 dark:border-white/[0.06] text-left">
                              {/* Key Highlights */}
                              <div>
                                <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
                                  <Star className={`w-3.5 h-3.5 ${config.accent}`} />
                                  <span>
                                    {lang === "pt"
                                      ? "Destaques & Entregas"
                                      : "Highlights & Deliverables"}
                                  </span>
                                </div>
                                <ul className="space-y-2">
                                  {item.achievements[lang].map((ach, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-light"
                                    >
                                      <ArrowRight
                                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${config.accent}`}
                                      />
                                      <span>{ach}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Tech Stack Pills */}
                              <div>
                                <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
                                  <Cpu className={`w-3.5 h-3.5 ${config.accent}`} />
                                  <span>
                                    {lang === "pt"
                                      ? "Competências Aplicadas"
                                      : "Applied Competencies"}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider rounded-lg border transition-all ${config.tagBg}`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Card Expand Toggle Trigger */}
                      <div
                        className={`flex items-center gap-1.5 pt-3 text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors ${
                          isLeft ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-wider">
                          {isExpanded
                            ? lang === "pt"
                              ? "Recolher detalhes"
                              : "Collapse details"
                            : lang === "pt"
                            ? "Ver competências & detalhes"
                            : "View competencies & details"}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
