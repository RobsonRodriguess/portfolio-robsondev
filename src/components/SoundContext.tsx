"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Começamos mutado por padrão para não assustar o usuário, ou "false" se quiser que já comece tocando.
  const [isMuted, setIsMuted] = useState(true); 

  const playHover = () => {
    if (isMuted) return;
    const audio = new Audio('/sounds/hover.wav');
    audio.volume = 0.1; // Volume bem baixinho (10%) para ser elegante
    audio.play().catch(() => {}); // O catch evita erros caso o navegador bloqueie
  };

  const playClick = () => {
    if (isMuted) return;
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.2; // Volume um pouco maior (20%)
    audio.play().catch(() => {});
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute: () => setIsMuted(!isMuted), playHover, playClick }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound deve ser usado dentro de um SoundProvider");
  return context;
};