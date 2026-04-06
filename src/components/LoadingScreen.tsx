"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "NEXUS SYSTEM INITIALIZING...", delay: 200 },
  { text: "Loading kernel modules ............ OK", delay: 400 },
  { text: "Initializing portfolio engine ..... OK", delay: 300 },
  { text: "Mounting React components ......... OK", delay: 350 },
  { text: "Establishing secure connection .... OK", delay: 250 },
  { text: "", delay: 100 },
  { text: "System ready. Launching interface.", delay: 500 },
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState<number[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;

    // Phase 1: Boot text lines
    const showLines = async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        await new Promise((r) => setTimeout(r, BOOT_LINES[i].delay));
        setBootLines((prev) => [...prev, i]);
      }
    };

    showLines();

    // Phase 2: Progress bar
    const progStart = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(onDone, 600);
            }, 300);
            return 100;
          }
          // Variable speed: fast at first, slow in middle, fast at end
          const increment =
            p < 30 ? Math.random() * 4 + 2 :
            p < 70 ? Math.random() * 3 + 1 :
            p < 90 ? Math.random() * 5 + 3 :
            Math.random() * 3 + 1;
          return Math.min(100, p + increment);
        });
      }, 80);
      return interval;
    }, 1200);

    return () => {
      clearTimeout(progStart);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={fadeOut ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center font-mono"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl px-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 text-center"
        >
          <span className="text-green-400 text-2xl md:text-3xl font-black tracking-[0.3em]">
            NEXUS
            <span className="text-zinc-600">.DEV</span>
          </span>
        </motion.div>

        {/* Boot text */}
        <div className="space-y-1 mb-8">
          {BOOT_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: bootLines.includes(i) ? 1 : 0,
                x: bootLines.includes(i) ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
              className={`text-xs md:text-sm ${line.text.includes("OK") ? "text-green-500/80" : line.text === "" ? "" : "text-zinc-400"}`}
            >
              {line.text !== "" && (
                <>
                  <span className="text-zinc-600 mr-2">[{String(i + 1).padStart(2, "0")}]</span>
                  {line.text}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] text-zinc-500">
            <span className="uppercase tracking-widest">Loading</span>
            <span className="text-green-400">{Math.floor(progress)}%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Blinking cursor */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mt-6 text-zinc-600 text-xs"
        >
          ▌
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
