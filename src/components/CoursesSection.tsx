"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Code2,
  Database,
  Cpu,
  GraduationCap,
  Calendar,
  Clock,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Trophy,
  Flame,
  Copy,
  Check,
  TrendingUp,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

/* ─── i18n texts ─── */
const TEXTS = {
  pt: {
    badge: "Formação & Certificações",
    titleLine1: "Minha",
    titleHighlight: "Jornada",
    titleLine2: "de Conhecimento",
    subtitle1: "Cada certificação representa dedicação e evolução constante.",
    subtitle2: "Aprendizado",
    subtitle2b: "transformado em prática",
    statCourses: "Cursos",
    statHours: "Horas de Estudo",
    statInstitutions: "Instituições",
    categoryFrontend: "Front-end & Web",
    categoryBackend: "Back-end & Dados",
    categoryFundamentals: "Fundamentos & Lógica",
    courses: "cursos",
    verified: "Verificado",
    copyCode: "Copiar código",
    copied: "Copiado!",
    intensive: "Intensivo",
    bottomQuote1: "Aprendizado contínuo",
    bottomQuote2: "é a chave para a evolução",
  },
  en: {
    badge: "Education & Certifications",
    titleLine1: "My",
    titleHighlight: "Learning",
    titleLine2: "Journey",
    subtitle1: "Each certification represents dedication and constant evolution.",
    subtitle2: "Knowledge",
    subtitle2b: "turned into practice",
    statCourses: "Courses",
    statHours: "Study Hours",
    statInstitutions: "Institutions",
    categoryFrontend: "Front-end & Web",
    categoryBackend: "Back-end & Data",
    categoryFundamentals: "Fundamentals & Logic",
    courses: "courses",
    verified: "Verified",
    copyCode: "Copy code",
    copied: "Copied!",
    intensive: "Intensive",
    bottomQuote1: "Continuous learning",
    bottomQuote2: "is the key to evolution",
  },
};

/* ─── Course data with bilingual support ─── */
interface Course {
  id: string;
  title: { pt: string; en: string };
  institution: string;
  completionDate: string;
  hours: string;
  description: { pt: string; en: string };
  verificationLink: string;
  category: "frontend" | "backend" | "fundamentals";
}

const COURSES_DATA: Course[] = [
  {
    id: "1",
    title: {
      pt: "JavaScript: Fundamentos para Desenvolvimento Web Interativo",
      en: "JavaScript: Fundamentals for Interactive Web Development",
    },
    institution: "Instituto Federal do Rio Grande do Sul (IFRS)",
    completionDate: "29/10/2024",
    hours: "40h",
    description: {
      pt: "Introdução ao JavaScript, Sintaxe Básica, Funções, Manipulação do DOM, Eventos do navegador, Trabalhando com Formulários e Validação de Dados.",
      en: "JavaScript Introduction, Basic Syntax, Functions, DOM Manipulation, Browser Events, Working with Forms and Data Validation.",
    },
    verificationLink: "Código 67217647-2fe0-4549-a47b-1a600ade0004",
    category: "frontend",
  },
  {
    id: "2",
    title: {
      pt: "CSS: folhas de estilo",
      en: "CSS: Stylesheets",
    },
    institution: "Instituto Federal do Rio Grande do Sul (IFRS)",
    completionDate: "29/10/2024",
    hours: "30h",
    description: {
      pt: "Vinculando o CSS no código HTML, Formatação de textos, Links, Listas, Media Query, Formatação de página, imagens, tabelas e DIVs.",
      en: "Linking CSS in HTML, Text Formatting, Links, Lists, Media Query, Page Layout, Images, Tables and DIVs.",
    },
    verificationLink: "Código 67216bef-aef4-4dda-b8f9-190e0ade0004",
    category: "frontend",
  },
  {
    id: "3",
    title: {
      pt: "HTML: Introdução ao desenvolvimento de páginas web",
      en: "HTML: Introduction to Web Page Development",
    },
    institution: "Instituto Federal do Rio Grande do Sul (IFRS)",
    completionDate: "19/09/2024",
    hours: "20h",
    description: {
      pt: "Introdução ao Desenvolvimento, Formatação, links, listas, Imagem, áudio, vídeos e Validação de página HTML.",
      en: "Development Introduction, Formatting, Links, Lists, Images, Audio, Videos and HTML Page Validation.",
    },
    verificationLink: "Código 66eb9b67-a69c-45c0-8c13-2a080ade0006",
    category: "frontend",
  },
  {
    id: "4",
    title: {
      pt: "Introduction to Python",
      en: "Introduction to Python",
    },
    institution: "Rocketseat",
    completionDate: "19/02/2026",
    hours: "10h",
    description: {
      pt: "Python Fundamentals, API Concepts, HTTP Methods, Database, Flask, Authentication with Flask-Login, Error Handling and Deploy.",
      en: "Python Fundamentals, API Concepts, HTTP Methods, Database, Flask, Authentication with Flask-Login, Error Handling and Deploy.",
    },
    verificationLink: "app.rocketseat.com.br/certificates (Código: 068bb1d5-6b33-4849-8f26-28132cc24bd8)",
    category: "backend",
  },
  {
    id: "5",
    title: {
      pt: "Banco de Dados: Oracle PL/SQL",
      en: "Database: Oracle PL/SQL",
    },
    institution: "Instituto Federal do Rio Grande do Sul (IFRS)",
    completionDate: "29/10/2024",
    hours: "20h",
    description: {
      pt: "Comandos da Linguagem PL/SQL e Blocos Anônimos, Procedures, Functions, Cursores, Exception, Package e Trigger.",
      en: "PL/SQL Language Commands and Anonymous Blocks, Procedures, Functions, Cursors, Exceptions, Packages and Triggers.",
    },
    verificationLink: "Código 6721669e-974c-4b02-a658-17ea0ade0004",
    category: "backend",
  },
  {
    id: "6",
    title: {
      pt: "Análise de Dados no Power BI",
      en: "Data Analysis with Power BI",
    },
    institution: "Fundação Bradesco / Microsoft",
    completionDate: "11/11/2024",
    hours: "4h",
    description: {
      pt: "Análise de dados, visualizações interativas, dashboards, DAX, modelagem de dados.",
      en: "Data analysis, interactive visualizations, dashboards, DAX, data modeling.",
    },
    verificationLink: "Código 6F6407FF-CB31-42BF-84BE-B994B1E2313D",
    category: "backend",
  },
  {
    id: "7",
    title: {
      pt: "Lógica de Programação: múltiplos valores e módulos",
      en: "Programming Logic: Multiple Values and Modules",
    },
    institution: "Instituto Federal do Rio Grande do Sul (IFRS)",
    completionDate: "31/10/2024",
    hours: "20h",
    description: {
      pt: "Conhecendo o Portugol Studio, Vetores, Matrizes, Funções e Parâmetros.",
      en: "Getting to know Portugol Studio, Arrays, Matrices, Functions and Parameters.",
    },
    verificationLink: "Código 6722ff77-0718-4974-bf9f-26180ade0004",
    category: "fundamentals",
  },
  {
    id: "8",
    title: {
      pt: "Lógica de Programação: deixando os seus programas espertos",
      en: "Programming Logic: Making Your Programs Smart",
    },
    institution: "Instituto Federal do Rio Grande do Sul (IFRS)",
    completionDate: "31/10/2024",
    hours: "20h",
    description: {
      pt: "Operadores relacionais lógicos, Desvio Condicional e Laços de Repetição.",
      en: "Relational and Logical Operators, Conditional Branching and Loops.",
    },
    verificationLink: "Código 6722fd93-a0a0-4033-a53e-25c80ade0004",
    category: "fundamentals",
  },
  {
    id: "9",
    title: {
      pt: "Lógica de Programação: começando a desenvolver seus primeiros programas",
      en: "Programming Logic: Starting to Develop Your First Programs",
    },
    institution: "Instituto Federal do Rio Grande do Sul (IFRS)",
    completionDate: "31/10/2024",
    hours: "20h",
    description: {
      pt: "Conhecendo o Portugol Studio, Entrada e Saída de Dados, Variáveis e Operadores Aritméticos.",
      en: "Getting to know Portugol Studio, Data Input/Output, Variables and Arithmetic Operators.",
    },
    verificationLink: "Código 6722fae0-6b08-4104-b615-25e50ade0004",
    category: "fundamentals",
  },
  {
    id: "10",
    title: {
      pt: "Fundamentos de TI: Hardware e Software",
      en: "IT Fundamentals: Hardware and Software",
    },
    institution: "Fundação Bradesco",
    completionDate: "30/10/2024",
    hours: "7h",
    description: {
      pt: "Conhecimentos básicos sobre hardware, software, sistemas operacionais e arquitetura de computadores.",
      en: "Basic knowledge of hardware, software, operating systems and computer architecture.",
    },
    verificationLink: "Código 12AEEE80-8435-4563-89A8-67DC743282E1",
    category: "fundamentals",
  },
];

const CATEGORIES = {
  frontend: {
    emoji: "💻",
    icon: Code2,
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    accent: "text-emerald-500",
    accentDark: "text-emerald-400",
    glowRgb: "16, 185, 129",
    dotColor: "bg-emerald-500",
    barBg: "bg-emerald-500/15",
    barFill: "bg-gradient-to-r from-emerald-500 to-teal-400",
  },
  backend: {
    emoji: "⚙️",
    icon: Database,
    gradient: "from-blue-400 via-indigo-400 to-violet-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/5",
    accent: "text-blue-500",
    accentDark: "text-blue-400",
    glowRgb: "59, 130, 246",
    dotColor: "bg-blue-500",
    barBg: "bg-blue-500/15",
    barFill: "bg-gradient-to-r from-blue-500 to-indigo-400",
  },
  fundamentals: {
    emoji: "🧠",
    icon: Cpu,
    gradient: "from-purple-400 via-fuchsia-400 to-pink-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
    accent: "text-purple-500",
    accentDark: "text-purple-400",
    glowRgb: "168, 85, 247",
    dotColor: "bg-purple-500",
    barBg: "bg-purple-500/15",
    barFill: "bg-gradient-to-r from-purple-500 to-fuchsia-400",
  },
};

const categoryKeys = ["frontend", "backend", "fundamentals"] as const;

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── 3D Tilt Card Wrapper ─── */
function TiltCard({
  children,
  className = "",
  glowRgb,
}: {
  children: React.ReactNode;
  className?: string;
  glowRgb: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      rotateX.set(((y - centerY) / centerY) * -6);
      rotateY.set(((x - centerX) / centerX) * 6);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `0 8px 60px rgba(${glowRgb}, 0.15), 0 0 30px rgba(${glowRgb}, 0.08)`
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/* ─── Floating Orb Background ─── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { x: "10%", y: "15%", size: 420, rgb: "16, 185, 129", delay: 0 },
        { x: "75%", y: "60%", size: 360, rgb: "59, 130, 246", delay: 2 },
        { x: "40%", y: "80%", size: 300, rgb: "168, 85, 247", delay: 4 },
        { x: "85%", y: "10%", size: 240, rgb: "236, 72, 153", delay: 6 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, rgba(${orb.rgb}, 0.08) 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}



/* ─── Main Section ─── */
export default function CoursesSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = TEXTS[lang];

  const totalHours = COURSES_DATA.reduce((acc, course) => {
    const hours = parseInt(course.hours);
    return acc + (isNaN(hours) ? 0 : hours);
  }, 0);

  const uniqueInstitutions = new Set(COURSES_DATA.map((c) => c.institution)).size;

  const categoryLabels: Record<string, string> = {
    frontend: t.categoryFrontend,
    backend: t.categoryBackend,
    fundamentals: t.categoryFundamentals,
  };

  useEffect(() => {
    if (expandedCategory === null) {
      setExpandedCategory("frontend");
    }
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleCopy = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-700"
    >
      <FloatingOrbs />


      {/* Subtle radial gradient from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 backdrop-blur-xl mb-8 shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
            </motion.div>
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              {t.badge}
            </span>
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-5 leading-[1.1]"
          >
            {t.titleLine1}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
                {t.titleHighlight}
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
              {t.titleLine2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            {t.subtitle1}
            <br className="hidden sm:block" />
            {t.subtitle2}{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{t.subtitle2b}</span>.
          </motion.p>

          {/* ── STATS ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-14"
          >
            {[
              {
                icon: BookOpen,
                value: COURSES_DATA.length,
                suffix: "",
                label: t.statCourses,
                gradient: "from-emerald-500 to-teal-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
                textColor: "text-emerald-500 dark:text-emerald-400",
              },
              {
                icon: Clock,
                value: totalHours,
                suffix: "h",
                label: t.statHours,
                gradient: "from-blue-500 to-indigo-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                textColor: "text-blue-500 dark:text-blue-400",
              },
              {
                icon: GraduationCap,
                value: uniqueInstitutions,
                suffix: "",
                label: t.statInstitutions,
                gradient: "from-purple-500 to-fuchsia-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
                textColor: "text-purple-500 dark:text-purple-400",
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="group relative"
                >
                  <div
                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                  />
                  <div
                    className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl border ${stat.border} shadow-sm hover:shadow-lg transition-all duration-500`}
                  >
                    <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.textColor}`} />
                    </div>
                    <div className="text-left">
                      <div className={`text-2xl font-black ${stat.textColor} tabular-nums`}>
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── CATEGORY SECTIONS ── */}
        <div className="space-y-6">
          {categoryKeys.map((categoryKey, categoryIndex) => {
            const category = CATEGORIES[categoryKey];
            const Icon = category.icon;
            const categoryCourses = COURSES_DATA.filter((c) => c.category === categoryKey);
            const isExpanded = expandedCategory === categoryKey;
            const categoryHours = categoryCourses.reduce(
              (acc, c) => acc + parseInt(c.hours),
              0
            );
            const progressPercent = Math.round((categoryHours / totalHours) * 100);

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: 0.08 * categoryIndex,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group/cat"
              >
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                    isExpanded
                      ? "bg-white/90 dark:bg-white/[0.03] shadow-xl dark:shadow-2xl"
                      : "bg-white/60 dark:bg-white/[0.02] hover:bg-white/80 dark:hover:bg-white/[0.04] shadow-sm hover:shadow-md"
                  } backdrop-blur-2xl border border-zinc-200/70 dark:border-white/[0.06]`}
                >
                  {/* Animated top border line */}
                  <motion.div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.gradient}`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: isExpanded ? 1 : 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.8 }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Category Header Button */}
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="relative w-full p-5 md:p-7 flex items-center justify-between text-left transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl ${category.bgColor} border ${category.borderColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${category.accent} dark:${category.accentDark}`} />
                        {isExpanded && (
                          <motion.div
                            className={`absolute inset-0 rounded-xl border-2 ${category.borderColor}`}
                            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="text-lg">{category.emoji}</span>
                          <h3 className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                            {categoryLabels[categoryKey]}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <Layers className="w-3.5 h-3.5" />
                            <span className="font-medium">{categoryCourses.length} {t.courses}</span>
                          </div>
                          <span className="text-zinc-300 dark:text-zinc-600">•</span>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-semibold">{categoryHours}h</span>
                          </div>
                          <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline">•</span>
                          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-[160px]">
                            <div className={`h-1.5 flex-1 rounded-full ${category.barBg} overflow-hidden`}>
                              <motion.div
                                className={`h-full rounded-full ${category.barFill}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progressPercent}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-zinc-400">
                              {progressPercent}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`w-10 h-10 rounded-xl ${category.bgColor} border ${category.borderColor} flex items-center justify-center flex-shrink-0 ml-4 transition-colors duration-300`}
                    >
                      <ChevronDown className={`w-5 h-5 ${category.accent}`} />
                    </motion.div>
                  </button>

                  {/* ── Courses Expand Area ── */}
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mx-5 md:mx-7 border-t border-zinc-200/60 dark:border-white/[0.05]" />
                        <div className="p-5 md:p-7 pt-5">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                            {categoryCourses.map((course, index) => (
                              <CourseCard
                                key={course.id}
                                course={course}
                                index={index}
                                category={category}
                                copiedId={copiedId}
                                onCopy={handleCopy}
                                lang={lang}
                                texts={t}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/[0.06] backdrop-blur-xl shadow-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {t.bottomQuote1}
              </span>{" "}
              {t.bottomQuote2}
            </p>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── COURSE CARD COMPONENT ─── */
interface CourseCardProps {
  course: Course;
  index: number;
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES];
  copiedId: string | null;
  onCopy: (id: string, link: string) => void;
  lang: "en" | "pt";
  texts: typeof TEXTS["pt"];
}

function CourseCard({ course, index, category, copiedId, onCopy, lang, texts }: CourseCardProps) {
  const isCopied = copiedId === course.id;
  const hours = parseInt(course.hours);

  return (
    <TiltCard
      className="relative cursor-default rounded-2xl overflow-hidden"
      glowRgb={category.glowRgb}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.4 }}
        className={`relative h-full rounded-2xl border ${category.borderColor} bg-white/70 dark:bg-white/[0.025] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-opacity-60`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 hover:opacity-[0.03] transition-opacity duration-500`}
        />

        {/* Left accent bar */}
        <div
          className={`absolute top-4 bottom-4 left-0 w-[3px] rounded-r-full bg-gradient-to-b ${category.gradient} opacity-60`}
        />

        <div className="relative p-5 md:p-6 pl-5 md:pl-7">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-[15px] font-bold text-zinc-800 dark:text-zinc-100 leading-snug mb-2 line-clamp-2">
                {course.title[lang]}
              </h4>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
                  {course.institution}
                </span>
              </div>
            </div>

            {/* Hours badge */}
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${category.bgColor} border ${category.borderColor} flex-shrink-0`}
            >
              <Clock className={`w-3 h-3 ${category.accent}`} />
              <span className={`text-xs font-bold ${category.accent}`}>{course.hours}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
            {course.description[lang]}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/[0.04]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                <Calendar className="w-3 h-3" />
                <span className="font-medium">{course.completionDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className={`w-3.5 h-3.5 ${category.accent} opacity-70`} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {texts.verified}
                </span>
              </div>
            </div>

            {/* Copy button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                onCopy(course.id, course.verificationLink);
              }}
              className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
                isCopied
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  : `${category.bgColor} ${category.accent} border ${category.borderColor} hover:opacity-80`
              }`}
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    {texts.copied}
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    {texts.copyCode}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Premium badge for 30h+ courses */}
        {hours >= 30 && (
          <div className="absolute top-3 right-3">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30"
            >
              <Flame className="w-3 h-3 text-amber-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {texts.intensive}
              </span>
            </motion.div>
          </div>
        )}
      </motion.div>
    </TiltCard>
  );
}
