"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function SpotifyCard() {
  const [data, setData] = useState<any>({ isPlaying: false });
  const [msCounter, setMsCounter] = useState(0);

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/spotify");
      const json = await res.json();
      setData(json);
      if (json.isPlaying) {
        setMsCounter(json.progressMs); // Sincroniza o tempo
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

  // CÁLCULO DA PORCENTAGEM REAL DA BARRA
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
    <div className="w-full max-w-[400px] p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 text-zinc-700 font-mono text-[10px] uppercase tracking-[0.3em] text-center italic">
      Playlist em cooldown. Carregando as energias para o próximo sprint de desenvolvimento...
    </div>
  );

  return (
    <div className="relative group w-full max-w-[420px]">
      <div className="relative z-10 bg-[#080808] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        {/* ÁREA DA CAPA + DISCO */}
        <div className="relative flex justify-center mb-10 h-44 items-center">
          <div className="relative w-40 h-40">
            <motion.div 
              initial={{ x: 65 }}
              animate={{ x: 75 }}
              whileHover={{ x: 95 }}
              className="absolute inset-0 z-0"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full bg-gradient-to-r from-[#050505] via-[#222] to-[#050505] border-[4px] border-zinc-900 shadow-2xl flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 opacity-30">
                   <Image src={data.albumImageUrl} alt="label" fill className="object-cover" />
                </div>
                <div className="w-10 h-10 bg-[#080808] rounded-full border border-white/5 z-10 relative"></div>
              </motion.div>
            </motion.div>

            <div className="relative z-10 w-full h-full">
              <Image 
                src={data.albumImageUrl} 
                alt={data.title} 
                fill 
                className="rounded-2xl object-cover border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* INFO DA MÚSICA */}
        <div className="space-y-2 mb-10 text-center md:text-left">
          <h3 className="text-2xl font-black text-white tracking-tighter truncate uppercase italic leading-none">
            {data.title}
          </h3>
          <p className="text-green-500 font-mono text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">
            {data.artist}
          </p>
        </div>

        {/* CONTADOR REAL E BARRA QUE ACOMPANHA */}
        <div className="space-y-4">
          <div className="relative w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
            {/* A largura agora é dinâmica baseada no tempo real! */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }} 
              transition={{ duration: 1, ease: "linear" }}
              className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
            />
          </div>

          <div className="flex justify-between items-center font-mono text-[11px] font-bold tracking-widest">
            <div className="flex items-center gap-2 text-green-500">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span>{formatTime(msCounter)}</span> 
            </div>
            {/* Mostra também o tempo total da música */}
            <span className="text-zinc-600 italic uppercase">
              {data.durationMs ? formatTime(data.durationMs) : 'LIVE'}
            </span>
          </div>
        </div>

        <a 
          href={data.songUrl} 
          target="_blank"
          className="mt-10 w-full py-4 flex items-center justify-center gap-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-green-500 transition-all duration-300"
        >
          Sincronizar no Spotify <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <SiSpotify className="absolute -bottom-6 -right-6 w-32 h-32 text-white/[0.03] -z-10 rotate-12" />
    </div>
  );
}