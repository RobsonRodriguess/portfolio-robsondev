"use client";

import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useSound } from "./SoundContext";

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage();
  const { playHover, playClick } = useSound();

  return (
    <motion.button
      onClick={() => { toggleLang(); playClick(); }}
      onMouseEnter={playHover}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-5 right-16 z-[100] flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-mono uppercase tracking-wider hover:border-green-500/40 dark:hover:border-green-500/30 transition-colors shadow-lg"
      title={lang === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
    >
      <Globe className="w-4 h-4" />
      {lang === 'en' ? 'PT' : 'EN'}
    </motion.button>
  );
}
