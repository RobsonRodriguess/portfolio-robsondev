"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "./SoundContext";
import { useEffect, useState } from "react";

export default function SoundToggle() {
  const { isMuted, toggleMute, playClick } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        toggleMute();
        if (isMuted) playClick(); // Toca o click ao ligar o som
      }}
      className="fixed top-[4.5rem] md:top-20 right-6 z-[999] p-2.5 md:p-3 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-lg hover:scale-110 transition-all duration-300"
      aria-label="Toggle Sound"
    >
      {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  );
}