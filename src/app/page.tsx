"use client";

import React, { useState, useEffect } from "react";
import GlitchTitle from "@/components/GlitchTitle";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Github, ExternalLink, CheckCircle2, Copy, Send, ShieldCheck, Cpu, Sigma, LayoutTemplate, Zap, Search, MonitorSmartphone, ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiLua, SiRoblox, SiNestjs, SiPostgresql,
  SiTailwindcss, SiDocker, SiPython,
  SiMysql, SiGit, SiNginx, SiPrisma, SiVercel, SiSupabase
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import dynamic from "next/dynamic";

const SkillTree = dynamic(() => import("@/components/SkillTree"));
const Timeline = dynamic(() => import("@/components/Timeline"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const WorksSection = dynamic(() => import("@/components/WorksSection"));
const PressSection = dynamic(() => import("@/components/PressSection"));

import AboutMe from "@/components/AboutMe";
import FloatingSpotify from "@/components/FloatingSpotify";
import SpotifyCard from "@/components/SpotifyCard";
import GithubStats from "@/components/GithubStats";
import { useSound } from "@/components/SoundContext";
import { useLanguage } from "@/components/LanguageContext";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollToTop from "@/components/ScrollToTop";
import SpotlightCard from "@/components/SpotlightCard";
import MagneticButton from "@/components/MagneticButton";
import AmbientGlow from "@/components/AmbientGlow";

const techs = [
  { name: "REACT", icon: SiReact, color: "hover:text-[#61DAFB]" },
  { name: "NEXT.JS", icon: SiNextdotjs, color: "hover:text-black dark:hover:text-white" },
  { name: "TYPESCRIPT", icon: SiTypescript, color: "hover:text-[#3178C6]" },
  { name: "NODE.JS", icon: SiNodedotjs, color: "hover:text-[#339933]" },
  { name: "LUA", icon: SiLua, color: "hover:text-[#2C2D72]" },
  { name: "ROBLOX STUDIO", icon: SiRoblox, color: "hover:text-black dark:hover:text-[#FFFFFF]" },
  { name: "JAVA", icon: FaJava, color: "hover:text-[#5382A1]" },
  { name: "PYTHON", icon: SiPython, color: "hover:text-[#3776AB]" },
  { name: "NESTJS", icon: SiNestjs, color: "hover:text-[#E0234E]" },
  { name: "POSTGRESQL", icon: SiPostgresql, color: "hover:text-[#4169E1]" },
  { name: "MYSQL", icon: SiMysql, color: "hover:text-[#4479A1]" },
  { name: "SUPABASE", icon: SiSupabase, color: "hover:text-[#3ECF8E]" },
  { name: "PRISMA", icon: SiPrisma, color: "hover:text-black dark:hover:text-[#FFFFFF]" },
  { name: "TAILWIND", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
  { name: "DOCKER", icon: SiDocker, color: "hover:text-[#2496ED]" },
  { name: "NGINX", icon: SiNginx, color: "hover:text-[#009639]" },
  { name: "GIT", icon: SiGit, color: "hover:text-[#F05032]" },
];

function TechCarouselRow({
  techs: rowTechs,
  direction,
  speed,
  gap,
}: {
  techs: typeof techs;
  direction: number;
  speed: number;
  gap: string;
}) {
  const repeated = [...rowTechs, ...rowTechs, ...rowTechs, ...rowTechs, ...rowTechs, ...rowTechs];
  const animName = `marquee-tech-${direction}-${speed}`;

  return (
    <div className="flex" style={{ height: 72 }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ${animName} {
          0% { transform: translateX(${direction === 1 ? '0%' : '-33.33333%'}); }
          100% { transform: translateX(${direction === 1 ? '-33.33333%' : '0%'}); }
        }
      `}} />
      <motion.div
        className="flex items-center"
        style={{ animation: `${animName} ${speed}s linear infinite` }}
      >
        {repeated.map((tech, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer group/tech"
            style={{ marginLeft: gap }}
          >
            <div className="relative px-5 py-3.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/[0.04] backdrop-blur-sm hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <tech.icon
                className={`w-8 h-8 text-zinc-400 dark:text-zinc-500 transition-all duration-300 group-hover/tech:scale-125 ${tech.color}`}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);
  const { playHover, playClick } = useSound();
  const { t, lang } = useLanguage();
  const { scrollYProgress: globalScroll } = useScroll();
  const scaleX = useSpring(globalScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const discordID = "409017051223556121";

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(discordID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setFormState("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormState("idle");
        alert(lang === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.');
      }
    } catch {
      setFormState("idle");
      alert(lang === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.');
    }
  }

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-800/50 min-h-screen transition-colors duration-500"
      >
      <div className="fixed inset-0 z-[1] opacity-[0.03] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <AmbientGlow />
      <ParticleBackground />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-sky-500 to-purple-500 origin-left z-[100] rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)]"
        style={{ scaleX, opacity: globalScroll }}
      />

      <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-zinc-300/50 dark:bg-zinc-800/20 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[7000ms]"></div>
        <motion.div className="relative z-20 text-center flex flex-col items-center w-full max-w-7xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] text-sm md:text-base mb-8 font-mono">
            <span className="text-sky-500 dark:text-sky-400 mr-2">&lt;</span>{t.hero_badge}<span className="text-sky-500 dark:text-sky-400 ml-2">/&gt;</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.9] mb-10 drop-shadow-xl dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] text-black dark:text-white"
          >
            <GlitchTitle />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <MagneticButton strength={12}>
              <motion.a
                href="/curriculorobson2026.pdf"
                target="_blank"
                onMouseEnter={playHover}
                onClick={playClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest text-xs md:text-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-green-500/20 dark:hover:shadow-green-500/30 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full border border-zinc-700 dark:border-zinc-200 opacity-50 group-hover:border-green-500 transition-colors duration-300"></span>
                {t.resume_btn}
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* Tech carousel — dual-row infinite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20 w-full relative py-4"
          >
            {/* Top gradient lines */}
            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
            <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
              {/* Row 1 — left */}
              <TechCarouselRow
                techs={[techs[0], techs[1], techs[2], techs[3], techs[4], techs[5], techs[6], techs[7]]}
                direction={1}
                speed={50}
                gap="40"
              />
              {/* Row 2 — right */}
              <TechCarouselRow
                techs={[techs[8], techs[9], techs[10], techs[11], techs[12], techs[13], techs[14], techs[15]]}
                direction={-1}
                speed={60}
                gap="48"
              />
            </div>
          </motion.div>

        </motion.div>
      </section>

      <AboutMe />

      <WorksSection />

      <PressSection />

      <StatsSection />
      <Timeline />
      <SkillTree />

      {/* Code Rhythm Section */}
      <section className="py-24 relative z-20 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Animated border gradient */}
            <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 via-sky-500/10 to-purple-500/30 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 blur" />
            <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 via-sky-500/10 to-purple-500/30 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative bg-zinc-50/80 dark:bg-zinc-950/90 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-hidden border border-zinc-200/50 dark:border-white/5 transition-colors duration-500">
              {/* Animated background orbs */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/[0.04] rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/[0.04] rounded-full blur-3xl"
                  animate={{ scale: [1, 1.4, 1], x: [0, -40, 0], y: [0, 20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/[0.03] rounded-full blur-3xl"
                  animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 180] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Sound wave lines */}
                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-[2px] opacity-[0.03]">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[2px] bg-gradient-to-t from-green-500 to-sky-500 rounded-full origin-bottom"
                      style={{ height: "100%" }}
                      animate={{ scaleY: [0.15, 0.3 + Math.random() * 0.7, 0.15] }}
                      transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                    />
                  ))}
                </div>

                {/* Floating musical notes — cleaner */}
                {["♪", "♫", "♬", "♩"].map((note, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-green-500/[0.05] text-3xl select-none"
                    animate={{
                      y: [-20, -60, -20],
                      x: [0, i % 2 === 0 ? 10 : -10, 0],
                      opacity: [0, 0.3, 0],
                      rotate: [0, i % 2 === 0 ? 15 : -15, 0],
                    }}
                    transition={{
                      duration: 6 + i * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 1.5,
                    }}
                    style={{ left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 30}%` }}
                  >
                    {note}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                {/* Left content */}
                <div className="relative z-10">
                  {/* IN ZONE badge — bigger equalizer */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="relative">
                      <span className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-30" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div className="h-8 flex items-end gap-[2.5px]">
                      {Array.from({ length: 12 }).map((_, bar) => (
                        <motion.div
                          key={bar}
                          className="w-[3px] rounded-full bg-gradient-to-t from-green-600 to-green-400"
                          animate={{ height: [4, 10 + Math.sin(bar * 0.6) * 14 + 10, 4] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: bar * 0.08,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest font-bold">{t.in_zone}</span>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight text-black dark:text-white">
                      {t.coding_text} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-sky-500 to-purple-500 uppercase italic text-3xl md:text-4xl lg:text-5xl">
                        {t.rhythm_text}
                      </span>
                    </h2>
                  </motion.div>

                  {/* Genre pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2.5 mt-6 mb-8"
                  >
                    {[t.genre_pop, t.genre_metal, t.genre_alt, t.genre_indie].map((genre, i) => (
                      <motion.span
                        key={genre}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        whileHover={{ scale: 1.05, borderColor: "rgba(34,197,94,0.4)" }}
                        className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-white/5 rounded-full bg-white/40 dark:bg-white/[0.02] hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300 cursor-default"
                      >
                        {genre}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg font-light max-w-md leading-relaxed mb-10 border-l-2 border-green-500/30 pl-6"
                  >
                    {t.coding_rhythm_desc}
                  </motion.p>

                  {/* Stats with mini progress bars */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-6 text-xs"
                  >
                    {[
                      { label: t.mood, value: t.mood_val, pct: 85, color: "from-green-500 to-emerald-400" },
                      { label: t.vibe, value: t.vibe_val, pct: 72, color: "from-sky-500 to-cyan-400" },
                      { label: t.output, value: t.output_val, pct: 93, color: "from-purple-500 to-violet-400" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex-1 max-w-[120px]">
                        <div className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] uppercase tracking-wider mb-1.5">{stat.label}</div>
                        <div className="text-zinc-700 dark:text-zinc-300 font-bold text-sm mb-2">{stat.value}</div>
                        <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right — Spotify */}
                <div className="flex justify-center lg:justify-end relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    <SpotifyCard />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer className="relative z-20 pt-28 md:pt-36 pb-0 overflow-hidden transition-colors duration-500">
        {/* ── Animated background layers ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient orbs */}
          <motion.div
            className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
            animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
            animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
            animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 180] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Top fade edge */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-50 dark:from-[#0a0a0a] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* ── CTA / Hero Area ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20 md:mb-28"
          >
            {/* Big title */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.85] mb-8">
              {lang === 'en' ? "LET'S" : "VAMOS"}{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 italic">
                  {lang === 'en' ? 'Connect.' : 'Conectar.'}
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[4px] rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed"
            >
              {lang === 'en'
                ? 'Based in Brasília, DF. Open to remote projects that challenge conventional logic.'
                : 'Baseado em Brasília, DF. Aberto a projetos remotos que desafiam a lógica convencional.'}
            </motion.p>
          </motion.div>

          {/* ── Main Grid: Social + Form ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24">
            {/* Left — Social Links */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                {/* Section label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-gradient-to-r from-green-500 to-transparent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                    {lang === 'en' ? 'Find me on' : 'Me encontre em'}
                  </span>
                </div>

                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    label: t.github,
                    sub: '@RobsonRodriguess',
                    url: 'https://github.com/RobsonRodriguess',
                    gradient: 'from-green-500 to-emerald-500',
                    hoverBorder: 'hover:border-green-500/40',
                    hoverShadow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.08)]',
                    iconHover: 'group-hover:text-green-500',
                    bgIcon: 'group-hover:bg-green-500/10',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                    label: t.linkedin,
                    sub: 'robson-rodrigues',
                    url: 'https://www.linkedin.com/in/robson-rodrigues-dev/',
                    gradient: 'from-sky-500 to-blue-500',
                    hoverBorder: 'hover:border-sky-500/40',
                    hoverShadow: 'hover:shadow-[0_0_40px_rgba(14,165,233,0.08)]',
                    iconHover: 'group-hover:text-sky-500',
                    bgIcon: 'group-hover:bg-sky-500/10',
                  },
                  {
                    icon: <MessageCircle className="w-5 h-5" />,
                    label: t.discord,
                    sub: copied ? t.discord_copied : t.discord_copy,
                    url: null,
                    gradient: 'from-indigo-500 to-violet-500',
                    hoverBorder: 'hover:border-indigo-500/40',
                    hoverShadow: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]',
                    iconHover: 'group-hover:text-indigo-500',
                    bgIcon: 'group-hover:bg-indigo-500/10',
                    action: () => { handleCopyDiscord(); playClick(); },
                  },
                ].map((link, i) => {
                  const Tag = link.url ? 'a' : 'button';
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <Tag
                        href={link.url || undefined}
                        target={link.url ? '_blank' : undefined}
                        rel={link.url ? 'noopener noreferrer' : undefined}
                        onClick={link.action as React.MouseEventHandler}
                        onMouseEnter={playHover}
                        className={`group relative flex items-center gap-5 w-full px-6 py-5 rounded-2xl bg-white/70 dark:bg-white/[0.025] border border-zinc-200/70 dark:border-white/[0.06] ${link.hoverBorder} ${link.hoverShadow} backdrop-blur-xl transition-all duration-500 hover:-translate-y-1`}
                      >
                        {/* Left gradient accent on hover */}
                        <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className={`w-12 h-12 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/40 flex items-center justify-center text-zinc-400 ${link.iconHover} ${link.bgIcon} transition-all duration-400 flex-shrink-0`}>
                          {link.icon}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-0.5">{link.label}</div>
                          <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono truncate">{link.sub}</div>
                        </div>
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ x: 2, y: -2 }}
                        >
                          <ArrowUpRight className={`w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:opacity-100 opacity-0 ${link.iconHover} transition-all duration-300`} />
                        </motion.div>
                      </Tag>
                    </motion.div>
                  );
                })}

                {/* Extra decoration — code snippet */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 px-5 py-4 rounded-xl bg-zinc-100/80 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/[0.04]"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <code className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 leading-relaxed">
                    <span className="text-purple-500/70">const</span> <span className="text-sky-500/70">dev</span> = &#123; <br />
                    &nbsp;&nbsp;<span className="text-emerald-500/70">focus</span>: <span className="text-amber-500/70">&quot;React & Frontend&quot;</span>,<br />
                    &nbsp;&nbsp;<span className="text-emerald-500/70">status</span>: <span className="text-green-500/80">&quot;{lang === 'en' ? 'open to work' : 'disponível'}&quot;</span><br />
                    &#125;;
                  </code>
                </motion.div>
              </motion.div>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-7 flex">
              <AnimatePresence mode="wait">
                {formState !== "success" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="w-full relative group/form"
                  >
                    {/* Animated border glow */}
                    <div className="absolute -inset-[1px] rounded-[2.1rem] bg-gradient-to-br from-green-500/15 via-transparent to-cyan-500/15 opacity-0 group-hover/form:opacity-100 blur-sm transition-opacity duration-1000" />
                    <div className="absolute -inset-[1px] rounded-[2.1rem] bg-gradient-to-br from-green-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000" />

                    <div className="relative bg-white/80 dark:bg-white/[0.02] backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] overflow-hidden border border-zinc-200/60 dark:border-white/[0.06] transition-all duration-500 shadow-sm group-hover/form:shadow-lg">
                      {/* Decorative acccents */}
                      <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
                      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-green-500/20 rounded-tl-md" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-green-500/20 rounded-br-md" />

                      {/* Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <motion.div
                          whileHover={{ rotate: -10, scale: 1.08 }}
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center border border-green-500/15 shadow-sm"
                        >
                          <Send className="w-5 h-5 text-green-500" />
                        </motion.div>
                        <div>
                          <div className="text-base font-bold text-zinc-800 dark:text-zinc-100">{t.send_title}</div>
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-wider">{t.send_subtitle}</div>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Name */}
                          <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 ml-1">{t.name_label}</label>
                            <div className="relative group/input">
                              <input
                                type="text" name="name" required placeholder={t.name_placeholder}
                                onFocus={playClick}
                                className="w-full bg-zinc-50/60 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08] rounded-xl px-5 py-3.5 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/40 focus:bg-green-500/[0.02] focus:shadow-[0_0_20px_rgba(34,197,94,0.06)] group-hover/input:border-zinc-300 dark:group-hover/input:border-white/[0.12] transition-all duration-300 font-mono text-sm"
                              />
                            </div>
                          </div>
                          {/* Email */}
                          <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 ml-1">{t.email_label}</label>
                            <div className="relative group/input">
                              <input
                                type="email" name="email" required placeholder={t.email_placeholder}
                                onFocus={playClick}
                                className="w-full bg-zinc-50/60 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08] rounded-xl px-5 py-3.5 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/40 focus:bg-green-500/[0.02] focus:shadow-[0_0_20px_rgba(34,197,94,0.06)] group-hover/input:border-zinc-300 dark:group-hover/input:border-white/[0.12] transition-all duration-300 font-mono text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 ml-1">{t.message_label}</label>
                          <textarea
                            name="message" required rows={5} placeholder={t.message_placeholder}
                            onFocus={playClick}
                            className="w-full bg-zinc-50/60 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08] rounded-xl px-5 py-3.5 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/40 focus:bg-green-500/[0.02] focus:shadow-[0_0_20px_rgba(34,197,94,0.06)] transition-all duration-300 font-mono text-sm resize-none"
                          />
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit" disabled={formState === "loading"}
                          onMouseEnter={playHover} onClick={playClick}
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full py-4.5 overflow-hidden rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)] dark:hover:shadow-[0_8px_30px_rgba(34,197,94,0.1)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn mt-2"
                        >
                          {/* Shimmer sweep */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                          <span className="relative">{formState === "loading" ? t.sending_btn : t.send_btn}</span>
                          <Send className="w-4 h-4 relative group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full relative"
                  >
                    <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 to-emerald-500/20 opacity-40 blur" />
                    <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 to-emerald-500/20 opacity-40" />

                    <div className="relative bg-green-50/80 dark:bg-green-500/[0.04] backdrop-blur-xl border border-green-200/80 dark:border-green-500/15 p-10 md:p-14 rounded-[2.5rem] flex flex-col items-center justify-center text-center overflow-hidden min-h-[400px] transition-colors duration-500">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-green-500/40 rounded-full"
                          animate={{
                            y: [0, -40 - i * 8],
                            x: [0, Math.sin(i * 0.8) * 25],
                            opacity: [0, 0.7, 0],
                          }}
                          transition={{
                            duration: 2.5 + i * 0.2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.2,
                          }}
                          style={{ left: `${10 + i * 9}%`, bottom: '15%' }}
                        />
                      ))}

                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
                      >
                        <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tight"
                      >
                        {t.success_title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-zinc-600 dark:text-zinc-400 font-mono text-sm max-w-[300px] leading-relaxed"
                      >
                        {t.success_text}
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => { setFormState("idle"); playClick(); }}
                        className="mt-8 text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                      >
                        {t.success_again}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── GithubStats Section ── */}
          <div className="py-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-white/[0.06] to-transparent" />
            </div>
            <div className="relative">
              <GithubStats />
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="border-t border-zinc-200/60 dark:border-white/[0.04] pt-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Left: brand mark */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="text-xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-100 cursor-default">
                  ROBSON<span className="text-zinc-300 dark:text-zinc-700">.DEV</span>
                </div>
                <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 hidden md:block">
                  {t.footer_text}
                </span>
              </motion.div>

              {/* Right: social mini icons */}
              <div className="flex items-center gap-3">
                {[
                  { url: 'https://github.com/RobsonRodriguess', icon: <Github className="w-4 h-4" /> },
                  {
                    url: 'https://www.linkedin.com/in/robson-rodrigues-dev/',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/[0.06] flex items-center justify-center text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-white/[0.12] transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile footer text */}
            <div className="md:hidden mt-4 text-center">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600">
                {t.footer_text}
              </span>
            </div>
          </div>
        </div>
      </footer>
      <FloatingSpotify />
      <ScrollToTop />
    </motion.main>
    </>
  );
}
