"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { MapPin, Code2, Gamepad2, Music, Brain, Sparkles } from "lucide-react";

/* ── Animated counter ── */
function Counter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) { counted.current = true; tick(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  function tick() {
    if (!ref.current) return;
    const dur = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      ref.current!.textContent = String(Math.floor(ease * value));
      if (t < 1) requestAnimationFrame(step);
      else if (suffix) ref.current!.textContent += suffix;
    };
    requestAnimationFrame(step);
  }

  return (
    <div className="text-center group">
      <span ref={ref} className="text-5xl md:text-6xl font-black tracking-tighter text-black dark:text-white tabular-nums" />
      <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mt-1">{label}</p>
    </div>
  );
}

/* ── Spotlight card ── */
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      className={`group relative bg-zinc-100/70 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mx}px ${my}px, rgba(34,197,94,0.12) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function AboutMe() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const globalY = useTransform(scrollYProgress, [0, 0.15], [80, 0]);
  const globalOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const highlights = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <span key={i} className="text-green-500 dark:text-green-400 font-medium not-italic">{part.slice(2, -2)}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section ref={ref} className="relative z-20 transition-colors duration-500 overflow-hidden">

      {/* ═══ TOP SECTION: Photo + Headline ═══ */}
      <motion.div style={{ y: globalY, opacity: globalOpacity }} className="max-w-7xl mx-auto px-6 pt-16 md:pt-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="relative inline-flex">
            <span className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-25" />
            <span className="relative w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </span>
          <span className="text-green-500 font-mono text-[10px] uppercase tracking-[0.35em] font-bold">{t.about_badge}</span>
        </motion.div>

        {/* Big headline with photo */}
        <div className="relative mb-20">
          {/* Giant background name */}
          <motion.span
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-8 md:-top-16 left-0 text-[14vw] md:text-[13vw] font-black tracking-tighter text-black/[0.03] dark:text-white/[0.015] leading-none select-none pointer-events-none z-0"
          >
            ROBSON
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-1 relative z-10 items-start">
            {/* Photo */}
            <div className="lg:col-span-5 xl:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative group/photo"
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br from-green-500 via-sky-500 to-purple-500 opacity-40 group-hover/photo:opacity-80 group-hover/photo:scale-[1.01] blur-sm transition-all duration-700" />
                <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br from-green-500 via-sky-500 to-purple-500 opacity-40 group-hover/photo:opacity-80 group-hover/photo:scale-[1.01] transition-all duration-700" />
                {/* Rotating border animation */}
                <motion.div
                  className="absolute -inset-[2px] rounded-[2rem] opacity-60"
                  style={{
                    background: "conic-gradient(from 0deg, #22c55e, #0ea5e9, #a855f7, #22c55e)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "2px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative rounded-[2rem] overflow-hidden bg-zinc-900 aspect-[4/5]">
                  <Image
                    src="/robson.jpg"
                    alt="Robson Kauã Rodrigues Magalhães"
                    fill
                    className="object-cover transition-transform duration-700 group-hover/photo:scale-105"
                  />

                  {/* Location tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-5 left-5 flex items-center gap-2 backdrop-blur-md bg-black/40 border border-white/10 rounded-xl px-4 py-2.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-white/90 font-mono text-[10px] uppercase tracking-[0.15em] font-bold">
                      {t.about_location}
                    </span>
                  </motion.div>

                  {/* Top tag */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="absolute top-5 right-5 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2"
                  >
                    <span className="text-white/80 font-mono text-[9px] uppercase tracking-[0.3em] font-bold">
                      {lang === "pt" ? "DESENVOLVEDOR" : "DEVELOPER"}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Text side */}
            <div className="lg:col-span-7 xl:col-span-8 self-center">
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black dark:text-white leading-[0.85] mb-8"
              >
                {t.about_title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="text-base md:text-lg font-light text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 max-w-xl"
              >
                {t.about_p1}
              </motion.p>

              {/* Origin */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="text-base md:text-lg font-light text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 max-w-xl"
              >
                {highlights(t.about_p2)}
              </motion.p>

              {/* Focus */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                className="text-base md:text-lg font-light text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 max-w-xl"
              >
                {highlights(t.about_p3)}
              </motion.p>

              {/* Personal */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="text-base md:text-lg font-light text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-xl"
              >
                {highlights(t.about_p4)}
              </motion.p>

              {/* Name + CTA */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ STATS BAR ═══ */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <Counter value={5} suffix="+" label={lang === "pt" ? "Anos de XP" : "Years XP"} />
          <Counter value={17} suffix="" label="Technologies" />
          <Counter value={4} suffix="+" label={lang === "pt" ? "Projetos" : "Projects"} />
          <Counter value={150} suffix="+" label={lang === "pt" ? "Commits" : "Commits/yr"} />
        </motion.div>
      </div>

      {/* ═══ JOURNEY / TIMELINE ═══ */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600 mb-10 font-bold"
        >
          {lang === "pt" ? "MINHA JORNADA" : "MY JOURNEY"}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              year: "2018",
              title: lang === "pt" ? "Onde Tudo Começou" : "Where It All Began",
              desc: lang === "pt" ? "Montei meu primeiro computador aos 12 anos, mexi com servidores de CS 1.6 e descobri a tecnologia como paixão para a vida toda. Ali já sabia que era o meu caminho." : "Built my first PC at 12, tinkered with CS 1.6 servers, and discovered technology as a lifelong passion. I always knew this was my path.",
              bg: "bg-green-500/[0.06]",
              badge: "bg-green-500/10 text-green-500 dark:text-green-400",
            },
            {
              year: "2021",
              title: lang === "pt" ? "Faculdade" : "College",
              desc: lang === "pt" ? "ADS no IFG Formosa. Primeiro código 'profissional'." : "ADS at IFG Formosa. Writing my first 'professional' code.",
              bg: "bg-sky-500/[0.06]",
              badge: "bg-sky-500/10 text-sky-500 dark:text-sky-400",
            },
            {
              year: "2024",
              title: lang === "pt" ? "Hoje" : "Today",
              desc: lang === "pt" ? "Foco em React, Next.js e frontend de alto nível." : "Focused on React, Next.js and high-end frontend.",
              bg: "bg-purple-500/[0.06]",
              badge: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
              pulse: true,
            },
          ].map((item, i) => (
            <SpotlightCard key={item.title} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
                className={`relative ${item.bg} rounded-2xl p-7 hover:border-opacity-100 transition-all h-full`}
              >
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 ${item.badge}`}>
                  {item.pulse && <span className="relative inline-flex w-1.5 h-1.5"><span className="absolute inset-0 rounded-full bg-current animate-ping opacity-30" /><span className="relative rounded-full w-1.5 h-1.5 bg-current" /></span>}
                  {item.year}
                </div>
                <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">{item.title}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mt-2 text-sm">{item.desc}</p>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* ═══ INTERESTS GRID ═══ */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600 mb-10 font-bold"
        >
          {lang === "pt" ? "INTERESSES" : "INTERESTS"}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: <Code2 className="w-5 h-5" />, label: lang === "pt" ? "Full Stack" : "Full Stack", desc: lang === "pt" ? "Front ao Backend" : "Front to Backend" },
            { icon: <Gamepad2 className="w-5 h-5" />, label: "Gamedev", desc: lang === "pt" ? "Roblox Studio & Lua" : "Roblox Studio & Lua" },
            { icon: <Music className="w-5 h-5" />, label: lang === "pt" ? "Dublagem" : "Voice Acting", desc: lang === "pt" ? "Arte vocal" : "Vocal art" },
            { icon: <Brain className="w-5 h-5" />, label: "AI & ML", desc: lang === "pt" ? "Exploração profunda" : "Deep exploration" },
            { icon: <Music className="w-5 h-5" />, label: lang === "pt" ? "Música" : "Music", desc: lang === "pt" ? "Composição" : "Songwriting" },
            { icon: <Sparkles className="w-5 h-5" />, label: "UI / UX", desc: lang === "pt" ? "Do zero ao pixel" : "From scratch to pixel" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              whileHover={{ y: -4, scale: 1.03 }}
            >
              <SpotlightCard>
                <div className="p-5 flex flex-col items-center text-center">
                  <div className={`w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:bg-green-500/10 group-hover:text-green-500 dark:group-hover:bg-green-500/10 dark:group-hover:text-green-400 transition-all duration-300 mb-3`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">
                    {item.label}
                  </span>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-600 font-mono tracking-wider mt-1">
                    {item.desc}
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}