"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════
//  GlitchTitle — Scramble Decode + Cursor + Hover + SFX
//  The name scrambles from random chars, decodes letter by
//  letter, holds, glitches, erases, and loops.
// ═══════════════════════════════════════════════════════════

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const LINE1 = "ROBSON";
const LINE2 = "DEV";
const REVEAL_PER_LETTER = 130;
const SCRAMBLE_MS = 400;
const HOLD_MS = 600;
const FLASH_MS = 200;

const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

const playSFX = () => {
  try {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const c = new AudioCtx();
    if (c.state === "suspended") {
      c.close().catch(() => {});
      return;
    }
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(400 + Math.random() * 800, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(120, c.currentTime + 0.08);
    g.gain.setValueAtTime(0.018, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.connect(g); g.connect(c.destination);
    o.start(c.currentTime);
    o.stop(c.currentTime + 0.1);
  } catch { /* muted or blocked */ }
};

export default function GlitchTitle() {
  const [line1, setLine1] = useState<string[]>(LINE1.split(""));
  const [line2, setLine2] = useState<string[]>(LINE2.split(""));
  const isResolved1Ref = useRef(new Set<number>(Array.from({ length: LINE1.length }, (_, i) => i)));
  const isResolved2Ref = useRef(new Set<number>(Array.from({ length: LINE2.length }, (_, i) => i)));
  const [glitching, setGlitching] = useState(false);
  const [isDecoded, setIsDecoded] = useState(true);

  const tRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addT = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    tRef.current.push(id);
    return id;
  }, []);

  const cancelAll = useCallback(() => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
  }, []);

  // Quick scramble & decode on mount or user interaction
  const triggerScramble = useCallback((isInitial = false) => {
    cancelAll();
    setGlitching(true);
    setIsDecoded(false);

    // Initial random chars
    setLine1(Array.from({ length: LINE1.length }, rand));
    setLine2(Array.from({ length: LINE2.length }, rand));
    isResolved1Ref.current.clear();
    isResolved2Ref.current.clear();

    if (!isInitial) playSFX();

    let count = 0;
    const intervalTime = 70;
    const maxTicks = 4;

    const scId = setInterval(() => {
      count++;
      setLine1(prev => prev.map((c, i) => isResolved1Ref.current.has(i) ? c : rand()));
      setLine2(prev => prev.map((c, i) => isResolved2Ref.current.has(i) ? c : rand()));

      if (count >= maxTicks) {
        clearInterval(scId);
        setGlitching(false);

        // Fast reveal letters
        LINE1.split("").forEach((ch, i) => {
          addT(() => {
            isResolved1Ref.current.add(i);
            setLine1(prev => { const n = [...prev]; n[i] = ch; return n; });
          }, i * 50);
        });

        const l1Time = LINE1.length * 50;
        LINE2.split("").forEach((ch, i) => {
          addT(() => {
            isResolved2Ref.current.add(i);
            setLine2(prev => { const n = [...prev]; n[i] = ch; return n; });
          }, l1Time + 50 + i * 50);
        });

        addT(() => {
          setLine1(LINE1.split(""));
          setLine2(LINE2.split(""));
          isResolved1Ref.current = new Set(Array.from({ length: LINE1.length }, (_, i) => i));
          isResolved2Ref.current = new Set(Array.from({ length: LINE2.length }, (_, i) => i));
          setIsDecoded(true);
        }, l1Time + 100 + LINE2.length * 50);
      }
    }, intervalTime);
  }, [cancelAll, addT]);

  useEffect(() => {
    // Run an initial brief decode after 800ms
    const t = setTimeout(() => {
      triggerScramble(true);
    }, 800);
    return () => {
      clearTimeout(t);
      cancelAll();
    };
  }, [triggerScramble, cancelAll]);

  const onHover = useCallback(() => {
    if (glitching) return;
    triggerScramble(false);
  }, [glitching, triggerScramble]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gtsk{0%,100%{transform:translate(0)}25%{transform:translate(-2px,1px)}50%{transform:translate(2px,-1px)}75%{transform:translate(-1px,1px)}}
        @keyframes curbl{0%,49%{opacity:1}50%,100%{opacity:0}}
        .g-shake{animation:gtsk .12s linear infinite}
        .c-blk{animation:curbl 600ms step-end infinite}
      `}} />

      <span
        className={`relative inline-block select-none ${glitching ? "g-shake" : ""}`}
        onMouseEnter={onHover}
        onClick={onHover}
        style={{ cursor: "pointer", minHeight: "1.8em" }}
      >
        {/* Ghost chromatic aberration during glitch */}
        {glitching && (
          <>
            <span className="absolute top-0 left-[2px] text-sky-500/40 select-none pointer-events-none mix-blend-screen whitespace-pre" aria-hidden="true">
              {line1.join("")}<br />{line2.join("")}
            </span>
            <span className="absolute top-0 -left-[2px] text-red-500/30 select-none pointer-events-none mix-blend-screen whitespace-pre" aria-hidden="true">
              {line1.join("")}<br />{line2.join("")}
            </span>
          </>
        )}

        {/* Main text with zero layout shift */}
        <span className="relative z-10 block">
          <span className="text-black dark:text-white inline-block">
            {line1.map((c, i) => (
              <span
                key={i}
                className={isResolved1Ref.current.has(i) ? "text-black dark:text-white" : "text-sky-500/80"}
              >
                {c}
              </span>
            ))}
          </span>
          <span className="text-zinc-400 dark:text-zinc-800">.</span>
          <br />
          <span className="text-zinc-500 dark:text-zinc-700 inline-block">
            {line2.map((c, i) => (
              <span
                key={i}
                className={isResolved2Ref.current.has(i) ? "text-zinc-500 dark:text-zinc-700" : "text-green-500/80"}
              >
                {c}
              </span>
            ))}
          </span>

          {/* Cursor blink — 100% pure CSS, 0 React re-renders */}
          <span className="c-blk ml-1.5 inline-block w-[3px] h-[0.65em] bg-green-500/60 align-middle rounded-sm" />
        </span>
      </span>
    </>
  );
}
