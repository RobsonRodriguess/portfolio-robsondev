"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion} from "framer-motion";
import Link from "next/link";

/* ─── Floating Particle ─── */
function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-green-500/20"
      style={{ width: size, height: size, left: `${x}%` }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{
        y: "-10vh",
        opacity: [0, 0.6, 0],
        x: [0, Math.sin(x) * 30, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

/* ─── Glitch Text ─── */
function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      {glitch && (
        <>
          <span
            className="absolute top-0 left-0 text-cyan-500/70 z-0"
            style={{ transform: "translate(-3px, -2px)", clipPath: "inset(20% 0 40% 0)" }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-rose-500/70 z-0"
            style={{ transform: "translate(3px, 2px)", clipPath: "inset(50% 0 10% 0)" }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
}

/* ─── Terminal typing effect ─── */
function TerminalLine({ text, delay, prefix = "$" }: { text: string; delay: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div className="flex gap-2 font-mono text-sm">
      <span className="text-green-500 flex-shrink-0">{prefix}</span>
      <span className="text-zinc-300">
        {displayed}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-green-500 ml-0.5 translate-y-[2px]"
          />
        )}
      </span>
    </div>
  );
}

/* ─── Astronaut SVG ─── */
function Astronaut() {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_30px_rgba(34,197,94,0.15)]"
      >
        {/* Helmet */}
        <circle cx="100" cy="75" r="45" fill="#1a1a2e" stroke="#3f3f46" strokeWidth="2" />
        <circle cx="100" cy="75" r="35" fill="#0f0f1a" stroke="#52525b" strokeWidth="1.5" />
        {/* Visor reflection */}
        <ellipse cx="88" cy="65" rx="12" ry="18" fill="rgba(34,197,94,0.08)" />
        {/* Visor glow */}
        <circle cx="100" cy="75" r="33" fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="1" />

        {/* Body */}
        <rect x="70" y="115" width="60" height="55" rx="12" fill="#1a1a2e" stroke="#3f3f46" strokeWidth="2" />
        {/* Chest light */}
        <circle cx="100" cy="135" r="5" fill="#22c55e" opacity="0.6" />
        <circle cx="100" cy="135" r="8" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3" />

        {/* Backpack */}
        <rect x="130" y="120" width="15" height="40" rx="5" fill="#1a1a2e" stroke="#3f3f46" strokeWidth="1.5" />

        {/* Arms */}
        <rect x="45" y="125" width="28" height="12" rx="6" fill="#1a1a2e" stroke="#3f3f46" strokeWidth="1.5" transform="rotate(-20 45 125)" />
        <rect x="127" y="120" width="28" height="12" rx="6" fill="#1a1a2e" stroke="#3f3f46" strokeWidth="1.5" transform="rotate(15 127 120)" />

        {/* Legs */}
        <rect x="75" y="168" width="16" height="25" rx="6" fill="#1a1a2e" stroke="#3f3f46" strokeWidth="1.5" transform="rotate(5 75 168)" />
        <rect x="108" y="168" width="16" height="25" rx="6" fill="#1a1a2e" stroke="#3f3f46" strokeWidth="1.5" transform="rotate(-5 108 168)" />

        {/* Connection tube */}
        <path d="M 55 135 Q 40 80 60 60" fill="none" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>

      {/* Floating stars around astronaut */}
      {[
        { x: -30, y: -10, s: 1.5, d: 0 },
        { x: 50, y: -30, s: 1, d: 1 },
        { x: -20, y: 60, s: 2, d: 2 },
        { x: 70, y: 40, s: 1.2, d: 0.5 },
      ].map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: star.s,
            height: star.s,
            left: `calc(50% + ${star.x}px)`,
            top: `calc(50% + ${star.y}px)`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: star.d }}
        />
      ))}
    </motion.div>
  );
}

/* ─── Main 404 Page ─── */
export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center relative overflow-hidden selection:bg-green-500/20"
    >
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle
          key={i}
          delay={i * 0.7}
          x={Math.random() * 100}
          size={2 + Math.random() * 3}
        />
      ))}

      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: "20%",
            left: "10%",
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5,
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
            bottom: "10%",
            right: "10%",
            x: mousePos.x * -0.3,
            y: mousePos.y * -0.3,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Astronaut */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
          style={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
        >
          <Astronaut />
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter select-none"
            style={{ color: "rgba(255,255,255,0.06)" }}
          >
            <GlitchText text="404" />
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-xl md:text-2xl font-bold text-zinc-200 mb-3">
            Página não encontrada
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
            Parece que este astronauta se perdeu no espaço. A página que você está procurando não existe ou foi movida.
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto mb-10"
        >
          <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/40">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                terminal — robson.dev
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-5 space-y-3 text-left">
              <TerminalLine text="cd /requested-page" delay={800} />
              <TerminalLine text="Error: ENOENT — page not found" delay={2200} prefix="✗" />
              <TerminalLine text='echo "Redirecionando para home..."' delay={3800} />
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl bg-white text-black font-black uppercase tracking-[0.15em] text-xs hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)] transition-shadow duration-500 flex items-center gap-3 group cursor-pointer"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar ao início
            </motion.button>
          </Link>

          <a href="https://github.com/RobsonRodriguess" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-bold uppercase tracking-[0.15em] text-xs hover:border-green-500/30 hover:text-white transition-all duration-500 flex items-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Ver GitHub
            </motion.button>
          </a>
        </motion.div>

        {/* Bottom signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-800">
            ROBSON.DEV — Lost in space, but not in code
          </span>
        </motion.div>
      </div>
    </div>
  );
}
