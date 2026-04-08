"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import { ExternalLink, Radio, Music } from "lucide-react";
import Image from "next/image";

export default function SpotifyCard() {
  const [data, setData] = useState<any>({ isPlaying: false });
  const [msCounter, setMsCounter] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/spotify");
      const json = await res.json();
      setData(json);
      if (json.isPlaying) {
        setMsCounter(json.progressMs);
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: any;
    if (data.isPlaying) {
      interval = setInterval(() => {
        setMsCounter((prev) => prev + 1000);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [data.isPlaying, data.title]);

  const progressPercentage = data.durationMs
    ? (msCounter / data.durationMs) * 100
    : 0;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!data.isPlaying) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-[400px] relative group"
    >
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-green-500/10 to-transparent opacity-50 group-hover:opacity-80 blur-sm transition-opacity duration-700" />
      <div className="relative border border-white/5 bg-zinc-900/40 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] text-center italic p-10 rounded-[2.5rem] backdrop-blur-xl overflow-hidden">
        {/* Idle waveform */}
        <div className="flex items-end justify-center gap-1 mb-6 h-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-green-500/30 rounded-full"
              animate={{ height: [4, 8 + Math.sin(i * 0.5) * 12 + 8, 4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
            />
          ))}
        </div>
        <Music className="w-8 h-8 mx-auto mb-4 text-zinc-700" />
        Playlist em cooldown.<br />
        Carregando as energias para o próximo sprint...
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative group w-full max-w-[420px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-br from-green-500/20 via-sky-500/5 to-purple-500/20 rounded-[3rem] blur-2xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 bg-[#080808]/95 border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Subtle scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }}
        />

        {/* TOP GLOW LINE */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

        {/* COVER ART + VINYL */}
        <div className="flex justify-center items-center h-52 mb-8 relative">
          {/* Vinyl disc (sits behind album, slides out on hover) */}
          <div className="absolute" style={{ right: '5%' }}>
            <motion.div
              className="w-36 h-36 md:w-40 md:h-40 rounded-full relative"
              animate={{ translateX: isHovered ? 40 : 12 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Disc body */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#111]"
                animate={{ rotate: data.isPlaying ? 360 : 0 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                {/* Subtle groove reflections */}
                {[30, 44, 58].map((size, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-full border border-white/[0.03]"
                    style={{
                      inset: `${size}%`,
                    }}
                  />
                ))}
                {/* Label */}
                <div className="absolute inset-[32%] rounded-full overflow-hidden border border-white/5">
                  <Image
                    src={data.albumImageUrl}
                    alt="vinyl label"
                    fill
                    className="object-cover opacity-30 blur-[1px]"
                  />
                </div>
                {/* Center spindle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                  <div className="absolute inset-0 rounded-full bg-[#181818] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  <div className="absolute inset-[1px] rounded-full bg-[#0a0a0a]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-zinc-700" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Album cover (front and center) */}
          <motion.div
            className="relative w-36 h-36 md:w-40 md:h-40 z-10"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
              <Image
                src={data.albumImageUrl}
                alt={data.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Shine reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none rounded-xl" />
            </div>
          </motion.div>
        </div>

        {/* SONG INFO */}
        <AnimatePresence mode="wait">
          <motion.div
            key={data.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 mb-8 text-center md:text-left"
          >
            <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 font-mono text-[9px] uppercase tracking-[0.25em] font-bold">NOW PLAYING</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter truncate uppercase italic leading-none drop-shadow-lg">
              {data.title}
            </h3>
            <p className="text-zinc-400 font-mono text-[11px] tracking-wider">
              {data.artist}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* REAL-TIME PROGRESS + WAVEFORM */}
        <div className="space-y-4">
          {/* Waveform bar visualization */}
          <div className="flex items-end gap-[1.5px] h-6 justify-center mb-2">
            {Array.from({ length: 32 }).map((_, i) => {
              const pct = (i / 32) * 100;
              const isActive = pct <= progressPercentage;
              return (
                <motion.div
                  key={i}
                  className={`w-[2px] rounded-full transition-colors duration-300 ${isActive ? "bg-green-500" : "bg-zinc-800"}`}
                  animate={{
                    height: isActive
                      ? [4, 6 + Math.sin(i * 0.4 + msCounter / 500) * 10 + 10, 4]
                      : [3, 5 + Math.sin(i * 0.4 + msCounter / 800) * 4 + 4, 3],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.03 }}
                />
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-1 bg-zinc-800 rounded-full overflow-hidden group/bar">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "linear" }}
              className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
            />
            {/* Playhead dot */}
            <motion.div
              animate={{ left: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
            />
          </div>

          {/* Time */}
          <div className="flex justify-between items-center font-mono text-[10px] font-bold tracking-widest">
            <div className="flex items-center gap-2 text-green-500">
              <span>{formatTime(msCounter)}</span>
            </div>
            <span className="text-zinc-600 italic uppercase">
              {data.durationMs ? formatTime(data.durationMs) : 'LIVE'}
            </span>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={data.songUrl}
          target="_blank"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full py-4 flex items-center justify-center gap-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-green-500 transition-colors duration-300 group/btn"
        >
          <SiSpotify className="w-4 h-4 group-hover/btn:animate-pulse" />
          Abrir no Spotify <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </motion.a>

        {/* Watermark */}
        <SiSpotify className="absolute -bottom-8 -right-4 w-36 h-36 text-white/[0.02] -rotate-12 pointer-events-none" />
        <Radio className="absolute -top-4 -right-2 w-8 h-8 text-green-500/[0.08] pointer-events-none" />
      </div>
    </motion.div>
  );
}
