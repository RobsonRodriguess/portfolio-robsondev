"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom,
  Database,
  Palette,
  FileCode2,
  Server,
  Cloud,
  Layers,
  Lock,
  Zap,
  GitBranch,
  Box,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { useSound } from "./SoundContext";
import { useLanguage } from "./LanguageContext";

/* ─── Type Definitions ─── */
export interface SkillNode {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "devops";
  categoryLabel: { pt: string; en: string };
  status: { pt: string; en: string };
  statusColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  description: { pt: string; en: string };
  capabilities: { pt: string[]; en: string[] };
  productionFocus: { pt: string; en: string };
  connections: string[];
}

/* ─── Skills Data with Full PT & EN Bilingual Support ─── */
const SKILL_NODES: SkillNode[] = [
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "frontend",
    categoryLabel: {
      pt: "Frontend & Arquitetura",
      en: "Frontend & Architecture",
    },
    status: {
      pt: "Stack Principal · Diário",
      en: "Primary Stack · Daily Use",
    },
    statusColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    icon: Atom,
    color: "#38bdf8",
    description: {
      pt: "Arquitetura moderna com App Router, React Server Components (RSC), Server Actions nativas, rotas dinâmicas e compilação ultrarrápida com Turbopack.",
      en: "Modern architecture with App Router, React Server Components (RSC), native Server Actions, dynamic routes, and lightning-fast compilation with Turbopack.",
    },
    capabilities: {
      pt: [
        "Server Actions & React Server Components",
        "App Router com Suspense e Streaming SSR",
        "Compilação Turbopack de Alta Velocidade",
        "SEO Técnico & Otimização de OpenGraph",
      ],
      en: [
        "Server Actions & React Server Components",
        "App Router with Suspense & Streaming SSR",
        "High-Speed Turbopack Bundling",
        "Technical SEO & OpenGraph Optimization",
      ],
    },
    productionFocus: {
      pt: "App Router & SSR",
      en: "App Router & SSR",
    },
    connections: ["react", "typescript", "tailwind", "performance", "docker"],
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    categoryLabel: {
      pt: "Frontend & Interfaces",
      en: "Frontend & Interfaces",
    },
    status: {
      pt: "Avançado · Componentes",
      en: "Advanced · Components",
    },
    statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    icon: Atom,
    color: "#61DAFB",
    description: {
      pt: "Construção de interfaces de alto padrão, renderização concorrente, gerenciamento de estado previsível e custom hooks reutilizáveis com performance refinada.",
      en: "High-standard componentized interfaces, concurrent rendering, predictable state management, and high-performance reusable custom hooks.",
    },
    capabilities: {
      pt: [
        "Concurrent Features & Transições Fluídas",
        "Custom Hooks Modulares e Reutilizáveis",
        "Gerenciamento de Estado Otimizado",
        "Padrões Avançados de Componentização",
      ],
      en: [
        "Concurrent Features & Fluid Transitions",
        "Modular & Reusable Custom Hooks",
        "Optimized State Management",
        "Advanced Component Composition",
      ],
    },
    productionFocus: {
      pt: "Interfaces Reativas",
      en: "Reactive Interfaces",
    },
    connections: ["nextjs", "typescript", "tailwind"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    categoryLabel: {
      pt: "Tipagem & Segurança",
      en: "Type Safety & Contracts",
    },
    status: {
      pt: "Strict Mode · Zero Any",
      en: "Strict Mode · Zero Any",
    },
    statusColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    icon: FileCode2,
    color: "#3178C6",
    description: {
      pt: "Tipagem estática estrita ponta a ponta, validação de esquemas em runtime, genéricos avançados e contratos seguros entre frontend e backend.",
      en: "Strict end-to-end static typing, runtime schema validation, advanced generics, and robust type-safe contracts between frontend and backend.",
    },
    capabilities: {
      pt: [
        "Generics Avançados & Utility Types",
        "Strict Null Checks e Type Narrowing",
        "Inferência Automática e Refatoração Segura",
        "Contratos Tipados de API ponta a ponta",
      ],
      en: [
        "Advanced Generics & Utility Types",
        "Strict Null Checks & Type Narrowing",
        "Type Inference & Safe Refactoring",
        "End-to-End Type-Safe API Contracts",
      ],
    },
    productionFocus: {
      pt: "Strict Type Safety",
      en: "Strict Type Safety",
    },
    connections: ["nextjs", "react", "nodejs", "prisma"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "frontend",
    categoryLabel: {
      pt: "Estilização & Design System",
      en: "Styling & Design System",
    },
    status: {
      pt: "Design Tokens & Animações",
      en: "Design Tokens & Animations",
    },
    statusColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    icon: Palette,
    color: "#06B6D4",
    description: {
      pt: "Design systems modernos, tokens de cores consistentes, responsividade sem atrito e suporte fluido a temas Dark/Light sem 'flash of unstyled content'.",
      en: "Modern design systems, consistent color tokens, seamless responsiveness, and fluid Dark/Light mode transitions without flash of unstyled content.",
    },
    capabilities: {
      pt: [
        "Engine Moderna do Tailwind v4",
        "Design Tokens & Variáveis CSS Nativas",
        "Temas Dark e Light sem FOUC",
        "Integração Fluida com Framer Motion",
      ],
      en: [
        "Modern Tailwind v4 Engine",
        "Design Tokens & Native CSS Variables",
        "FOUC-Free Dark & Light Themes",
        "Fluid Framer Motion Micro-Interactions",
      ],
    },
    productionFocus: {
      pt: "Design System Fluido",
      en: "Fluid Design System",
    },
    connections: ["nextjs", "react", "performance"],
  },
  {
    id: "performance",
    name: "Performance & SEO",
    category: "frontend",
    categoryLabel: {
      pt: "Métricas & Web Vitals",
      en: "Metrics & Web Vitals",
    },
    status: {
      pt: "Lighthouse 95+ · Otimização",
      en: "Lighthouse 95+ · Optimization",
    },
    statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    icon: Zap,
    color: "#f59e0b",
    description: {
      pt: "Otimização obsessiva de Core Web Vitals (LCP, INP, CLS), redução drástica de bundle JavaScript, estratégias de cache na borda e indexação no Google.",
      en: "Obsessive optimization of Core Web Vitals (LCP, INP, CLS), drastic JavaScript bundle reduction, edge caching strategies, and Google search indexing.",
    },
    capabilities: {
      pt: [
        "Otimização de Core Web Vitals (LCP, INP, CLS)",
        "Lighthouse Score 95+ em Produção",
        "Estratégias de Edge Caching & Streaming",
        "Schema.org & Metatags Dinâmicas",
      ],
      en: [
        "Core Web Vitals Tuning (LCP, INP, CLS)",
        "Production Lighthouse 95+ Score",
        "Edge Caching & Streaming Strategies",
        "Schema.org & Dynamic Metadata",
      ],
    },
    productionFocus: {
      pt: "Core Web Vitals no Verde",
      en: "Green Core Web Vitals",
    },
    connections: ["nextjs", "tailwind", "devops"],
  },
  {
    id: "nodejs",
    name: "Node.js & NestJS",
    category: "backend",
    categoryLabel: {
      pt: "Backend & Microsserviços",
      en: "Backend & Microservices",
    },
    status: {
      pt: "Arquitetura Limpa · REST",
      en: "Clean Architecture · REST",
    },
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    icon: Server,
    color: "#10b981",
    description: {
      pt: "Serviços corporativos de backend, arquitetura limpa com injeção de dependências, tratamento resiliente de erros, validação DTO e APIs RESTful escaláveis.",
      en: "Enterprise backend services, clean architecture with dependency injection, resilient error handling, DTO validation, and scalable RESTful APIs.",
    },
    capabilities: {
      pt: [
        "Arquitetura Limpa & Módulos Isolados",
        "Injeção de Dependências (IoC Pattern)",
        "Guards, Interceptors & Tratamento Global de Erros",
        "APIs RESTful Escaláveis e Documentadas",
      ],
      en: [
        "Clean Architecture & Isolated Modules",
        "Dependency Injection (IoC Pattern)",
        "Guards, Interceptors & Global Exception Filters",
        "Documented & Scalable RESTful APIs",
      ],
    },
    productionFocus: {
      pt: "Clean Architecture",
      en: "Clean Architecture",
    },
    connections: ["typescript", "postgres", "security", "docker"],
  },
  {
    id: "security",
    name: "Segurança & OWASP",
    category: "backend",
    categoryLabel: {
      pt: "Proteção & Auditoria",
      en: "Protection & Auditing",
    },
    status: {
      pt: "Boas Práticas & Hardening",
      en: "Best Practices & Hardening",
    },
    statusColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    icon: Lock,
    color: "#f43f5e",
    description: {
      pt: "Mitigação proativa de riscos OWASP Top 10, sanitização rigorosa de inputs, proteção contra XSS/CSRF/SSRF, autenticação segura com JWT e gestão estrita de segredos.",
      en: "Proactive OWASP Top 10 risk mitigation, strict input sanitization, defense against XSS/CSRF/SSRF, secure JWT authentication, and hardened secrets management.",
    },
    capabilities: {
      pt: [
        "Mitigação Ativa do OWASP Top 10",
        "Autenticação Segura & Controle RBAC",
        "Sanitização Rigorosa de Payloads & Headers",
        "Gestão Segura de Variáveis e Segredos",
      ],
      en: [
        "Active OWASP Top 10 Mitigation",
        "Secure Authentication & RBAC Control",
        "Strict Payload Sanitization & Security Headers",
        "Hardened Secrets & Environment Management",
      ],
    },
    productionFocus: {
      pt: "Defesa em Profundidade",
      en: "Defense in Depth",
    },
    connections: ["nextjs", "nodejs", "postgres"],
  },
  {
    id: "postgres",
    name: "PostgreSQL & MySQL",
    category: "database",
    categoryLabel: {
      pt: "Banco Relacional & Modelagem",
      en: "Relational DB & Modeling",
    },
    status: {
      pt: "ACID · Queries Otimizadas",
      en: "ACID · Optimized Queries",
    },
    statusColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    icon: Database,
    color: "#6366f1",
    description: {
      pt: "Modelagem relacional de alta integridade, normalização até 3FN, indexação estratégica para performance de leitura e garantia estrita de transações ACID.",
      en: "High-integrity relational modeling, 3NF normalization, strategic indexing for read performance, and strict ACID transaction guarantees.",
    },
    capabilities: {
      pt: [
        "Modelagem Relacional & Normalização 3FN",
        "Otimização de Índices e Planos de Execução",
        "Transações ACID com Isolamento Seguro",
        "Integridade Referencial & Constraints",
      ],
      en: [
        "Relational Modeling & 3NF Normalization",
        "Index Optimization & Execution Plans",
        "ACID Transactions with Safe Isolation",
        "Referential Integrity & Constraints",
      ],
    },
    productionFocus: {
      pt: "Integridade ACID",
      en: "ACID Integrity",
    },
    connections: ["nodejs", "prisma", "security"],
  },
  {
    id: "prisma",
    name: "Prisma & Supabase",
    category: "database",
    categoryLabel: {
      pt: "ORM & Infraestrutura",
      en: "ORM & Cloud Data",
    },
    status: {
      pt: "Type-Safe · Migrações",
      en: "Type-Safe · Migrations",
    },
    statusColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    icon: Layers,
    color: "#a855f7",
    description: {
      pt: "Acesso a dados com tipagem estática ponta a ponta via Prisma ORM, versionamento seguro de schemas e infraestrutura serverless moderna com Supabase.",
      en: "End-to-end type-safe database queries via Prisma ORM, deterministic schema versioning, and modern serverless database infrastructure with Supabase.",
    },
    capabilities: {
      pt: [
        "Consultas Tipadas com Prisma Client",
        "Migrações Automatizadas de Schemas",
        "Supabase Auth & Realtime Database",
        "Row Level Security (RLS) para Proteção de Dados",
      ],
      en: [
        "Strictly Typed Queries with Prisma Client",
        "Automated & Deterministic Schema Migrations",
        "Supabase Auth & Realtime Database",
        "Row Level Security (RLS) Data Protection",
      ],
    },
    productionFocus: {
      pt: "Type-Safe Data Layer",
      en: "Type-Safe Data Layer",
    },
    connections: ["postgres", "typescript", "nodejs"],
  },
  {
    id: "docker",
    name: "Docker & Containers",
    category: "devops",
    categoryLabel: {
      pt: "Containers & Isolamento",
      en: "Containers & Isolation",
    },
    status: {
      pt: "Multi-Stage · Produção",
      en: "Multi-Stage · Production",
    },
    statusColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    icon: Box,
    color: "#0284c7",
    description: {
      pt: "Padronização total de ambientes de desenvolvimento e produção, Dockerfile multi-stage enxuto para redução de tamanho de imagens e orquestração com Docker Compose.",
      en: "Total parity between development and production environments, lean multi-stage Dockerfiles for reduced image footprint, and multi-service orchestration with Docker Compose.",
    },
    capabilities: {
      pt: [
        "Builds Multi-Stage Otimizados para Produção",
        "Docker Compose para Ambientes Multi-Serviço",
        "Isolamento Completo de Dependências",
        "Imagens Enxutas e Seguras",
      ],
      en: [
        "Production-Optimized Multi-Stage Builds",
        "Multi-Service Docker Compose Environments",
        "Complete Dependency Isolation",
        "Lean & Hardened Container Images",
      ],
    },
    productionFocus: {
      pt: "Ambientes Padronizados",
      en: "Standardized Environments",
    },
    connections: ["nodejs", "git", "devops"],
  },
  {
    id: "git",
    name: "Git & CI/CD",
    category: "devops",
    categoryLabel: {
      pt: "Versionamento & Entrega",
      en: "Versioning & Delivery",
    },
    status: {
      pt: "GitHub Actions · Automação",
      en: "GitHub Actions · Automation",
    },
    statusColor: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    icon: GitBranch,
    color: "#f97316",
    description: {
      pt: "Controle de versão com branches organizadas, automação de testes, linting e typecheck via GitHub Actions e deploys contínuos instantâneos na Vercel.",
      en: "Structured branch workflows, automated testing, linting and typecheck pipelines via GitHub Actions, and seamless continuous deployments to Vercel.",
    },
    capabilities: {
      pt: [
        "Pipelines Automatizadas com GitHub Actions",
        "Estratégias de Branching (Trunk / Git Flow)",
        "Validação de Testes e Lint antes de Merge",
        "Deploys Contínuos & Rollbacks Rápidos",
      ],
      en: [
        "Automated Pipelines with GitHub Actions",
        "Branching Strategies (Trunk / Git Flow)",
        "Pre-Merge Test & Typecheck Enforcement",
        "Continuous Deploys & Instant Rollbacks",
      ],
    },
    productionFocus: {
      pt: "Entrega Contínua",
      en: "Continuous Delivery",
    },
    connections: ["docker", "devops", "typescript"],
  },
  {
    id: "devops",
    name: "Cloud & Azure (AZ-900)",
    category: "devops",
    categoryLabel: {
      pt: "Nuvem & Governança",
      en: "Cloud & Governance",
    },
    status: {
      pt: "Certificação em Progresso",
      en: "Active Certification Prep",
    },
    statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    icon: Cloud,
    color: "#0078d4",
    description: {
      pt: "Fundamentos de arquitetura em nuvem, computação elástica, redes seguras, conformidade corporativa e alinhamento com práticas de governança ITIL v4.",
      en: "Cloud architecture fundamentals, elastic compute, secure virtual networking, enterprise compliance, and alignment with ITIL v4 governance practices.",
    },
    capabilities: {
      pt: [
        "Fundamentos Oficiais Microsoft Azure (AZ-900)",
        "Arquitetura Escalável e Redes Seguras",
        "Edge Computing e Redes Globais de Borda",
        "Práticas de Governança e Serviços ITIL v4",
      ],
      en: [
        "Official Microsoft Azure Fundamentals (AZ-900)",
        "Scalable Architecture & Secure Networks",
        "Edge Computing & Global Content Delivery",
        "ITIL v4 Service Management & Governance",
      ],
    },
    productionFocus: {
      pt: "AZ-900 + ITIL v4",
      en: "AZ-900 + ITIL v4",
    },
    connections: ["docker", "git", "performance"],
  },
];

/* ─── i18n Strings ─── */
const I18N = {
  pt: {
    eyebrow: "Arquitetura & Engenharia",
    titleMain: "Stack &",
    titleHighlight: "Especialidades.",
    subtitle:
      "Padrões de projeto, ecossistema moderno e ferramentas que domino para construir aplicações resilientes, rápidas e seguras.",
    allTab: "Todas as Especialidades",
    frontendTab: "Frontend & UI",
    backendTab: "Backend & APIs",
    databaseTab: "Bancos de Dados",
    devopsTab: "DevOps & Cloud",
    activeCount: "competências ativas",
    inspectorBadge: "Inspeção Técnica",
    capabilitiesTitle: "Aplicações & Competências Reais",
    connectionsTitle: "Conexões na Arquitetura",
    productionFocusLabel: "Foco Técnico",
    verifiedTag: "Prática em Produção",
    selectPrompt: "Selecione uma especialidade para inspecionar",
  },
  en: {
    eyebrow: "Architecture & Engineering",
    titleMain: "Stack &",
    titleHighlight: "Specializations.",
    subtitle:
      "Design patterns, modern ecosystem, and tools I use to engineer resilient, fast, and production-ready applications.",
    allTab: "All Disciplines",
    frontendTab: "Frontend & UI",
    backendTab: "Backend & APIs",
    databaseTab: "Databases",
    devopsTab: "DevOps & Cloud",
    activeCount: "active skills",
    inspectorBadge: "Technical Inspector",
    capabilitiesTitle: "Production Capabilities & Real-World Use",
    connectionsTitle: "Connected in Architecture",
    productionFocusLabel: "Technical Focus",
    verifiedTag: "Production Proven",
    selectPrompt: "Select a specialization to inspect",
  },
};

export default function SkillTree() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string>("nextjs");
  const { playHover, playClick } = useSound();
  const { lang } = useLanguage();

  const t = I18N[lang] || I18N.pt;

  const categories = useMemo(
    () => [
      { id: "all", label: t.allTab },
      { id: "frontend", label: t.frontendTab },
      { id: "backend", label: t.backendTab },
      { id: "database", label: t.databaseTab },
      { id: "devops", label: t.devopsTab },
    ],
    [t]
  );

  const filteredNodes = useMemo(() => {
    if (activeCategory === "all") return SKILL_NODES;
    return SKILL_NODES.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  const selectedNode = useMemo(() => {
    return SKILL_NODES.find((s) => s.id === selectedId) || SKILL_NODES[0];
  }, [selectedId]);

  return (
    <section className="py-24 relative z-20 transition-colors duration-500">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-sky-500/[0.03] dark:bg-sky-500/[0.02] blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.02] blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.eyebrow}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
              {t.titleMain}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 italic">
                {t.titleHighlight}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Discipline Category Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    playClick?.();
                  }}
                  onMouseEnter={playHover}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 border ${
                    isActive
                      ? "border-sky-500/60 bg-sky-500/10 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      : "border-zinc-200 dark:border-white/[0.06] bg-zinc-100/60 dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Master & Deep Inspector Grid: 100% Anti-Clutter & Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Structured Skills Matrix (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            <div className="flex items-center justify-between px-1 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                {t.selectPrompt}
              </span>
              <span>
                {filteredNodes.length} {t.activeCount}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const Icon = node.icon;

                return (
                  <motion.div
                    key={node.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => {
                      setSelectedId(node.id);
                      playClick?.();
                    }}
                    onMouseEnter={playHover}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedId(node.id);
                        playClick?.();
                      }
                    }}
                    className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer select-none overflow-hidden ${
                      isSelected
                        ? "bg-zinc-900 dark:bg-[#121215] border-sky-500/60 shadow-[0_0_24px_rgba(56,189,248,0.18)]"
                        : "bg-white/80 dark:bg-[#0c0c0e]/80 border-zinc-200/90 dark:border-white/[0.07] hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#111114]"
                    }`}
                  >
                    {/* Active Accent Ambient Edge */}
                    {isSelected && (
                      <div
                        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-40"
                        style={{ backgroundColor: node.color }}
                      />
                    )}

                    {/* Top Row: Icon + Status Pill */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${node.color}15`,
                          borderColor: `${node.color}35`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5 transition-colors"
                          style={{ color: node.color }}
                        />
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border tracking-wide whitespace-nowrap ${node.statusColor}`}
                      >
                        {node.status[lang]}
                      </span>
                    </div>

                    {/* Middle: Title & Category */}
                    <div>
                      <h3
                        className={`text-base font-bold tracking-tight transition-colors ${
                          isSelected
                            ? "text-white"
                            : "text-zinc-900 dark:text-zinc-100 group-hover:text-sky-400"
                        }`}
                      >
                        {node.name}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                        {node.categoryLabel[lang]}
                      </p>
                    </div>

                    {/* Bottom: Capabilities preview pills & chevron */}
                    <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate">
                        {node.productionFocus[lang]}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${
                          isSelected
                            ? "translate-x-0.5 text-sky-400"
                            : "text-zinc-400 dark:text-zinc-600 group-hover:translate-x-0.5 group-hover:text-zinc-300"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Deep Telemetry Inspector Panel (5 Cols, Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e]/95 backdrop-blur-xl p-6 md:p-7 shadow-2xl overflow-hidden"
              >
                {/* Glowing top line accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${selectedNode.color}, transparent)`,
                  }}
                />

                {/* Inspector Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-sm"
                      style={{
                        backgroundColor: `${selectedNode.color}15`,
                        borderColor: `${selectedNode.color}45`,
                      }}
                    >
                      <selectedNode.icon
                        className="w-6 h-6"
                        style={{ color: selectedNode.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                        {selectedNode.name}
                      </h3>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                        {selectedNode.categoryLabel[lang]}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-semibold tracking-wider ${selectedNode.statusColor}`}
                  >
                    {selectedNode.status[lang]}
                  </span>
                </div>

                {/* Focus Badge */}
                <div className="mb-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-xl bg-zinc-100 dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.06]">
                    <ShieldCheck
                      className="w-3.5 h-3.5"
                      style={{ color: selectedNode.color }}
                    />
                    <span>
                      {t.productionFocusLabel}:{" "}
                      <strong>{selectedNode.productionFocus[lang]}</strong>
                    </span>
                  </span>
                </div>

                {/* Technical Description */}
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed font-light mb-6">
                  {selectedNode.description[lang]}
                </p>

                {/* Production Capabilities Checklist */}
                <div className="mb-6">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
                    {t.capabilitiesTitle}
                  </span>
                  <div className="space-y-2">
                    {selectedNode.capabilities[lang].map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-mono bg-zinc-50 dark:bg-white/[0.02] px-3.5 py-2.5 rounded-xl border border-zinc-100 dark:border-white/[0.04]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: selectedNode.color }}
                        />
                        <span className="leading-snug">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Architecture Ecosystem */}
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-2.5">
                    {t.connectionsTitle}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.connections.map((targetId) => {
                      const target = SKILL_NODES.find((s) => s.id === targetId);
                      if (!target) return null;
                      return (
                        <button
                          key={target.id}
                          onClick={() => {
                            setSelectedId(target.id);
                            playClick?.();
                          }}
                          onMouseEnter={playHover}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 hover:border-sky-400 dark:hover:border-sky-500/50 hover:text-sky-500 dark:hover:text-sky-400 transition-all cursor-pointer"
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: target.color }}
                          />
                          <span>{target.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
