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
    const c = new (window.AudioContext || (window as any).webkitAudioContext)();
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
  // Start with arrays of spaces so they have stable indices;
  // the actual randomness only kicks in after mount (useEffect)
  const [line1, setLine1] = useState<string[]>(Array(LINE1.length).fill(" "));
  const [line2, setLine2] = useState<string[]>(Array(LINE2.length).fill(" "));
  const isResolved1Ref = useRef(new Set<number>());
  const isResolved2Ref = useRef(new Set<number>());
  const [isResolved1Count, setIsResolved1Count] = useState(0);
  const [isResolved2Count, setIsResolved2Count] = useState(0);

  const [glitching, setGlitching] = useState(false);
  const [blinkOn, setBlinkOn] = useState(true);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(true); // false = showing blank/static fallback

  const tRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addT = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    tRef.current.push(id);
    return id;
  }, []);

  const cancelAll = useCallback(() => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
    if (cycleRef.current) clearTimeout(cycleRef.current);
  }, []);

  const scrambleLines = useCallback(() => {
    setLine1(Array.from({ length: LINE1.length }, rand));
    setLine2(Array.from({ length: LINE2.length }, rand));
    isResolved1Ref.current.clear();
    isResolved2Ref.current.clear();
    setIsResolved1Count(0);
    setIsResolved2Count(0);
  }, []);

  const blankLines = useCallback(() => {
    setLine1(Array(LINE1.length).fill(" "));
    setLine2(Array(LINE2.length).fill(" "));
    isResolved1Ref.current.clear();
    isResolved2Ref.current.clear();
    setIsResolved1Count(0);
    setIsResolved2Count(0);
  }, []);

  const resolveLetter = useCallback((line: 1, idx: number, ch: string) => {
    isResolved1Ref.current.add(idx);
    setLine1(prev => { const n = [...prev]; n[idx] = ch; return n; });
    setIsResolved1Count(prev => prev + 1);
  }, []);

  const resolveLetter2 = useCallback((idx: number, ch: string) => {
    isResolved2Ref.current.add(idx);
    setLine2(prev => { const n = [...prev]; n[idx] = ch; return n; });
    setIsResolved2Count(prev => prev + 1);
  }, []);

  const run = useCallback(() => {
    cancelAll();
    setGlitching(false);
    setActive(true);

    // Phase 1: Fill with random chars
    scrambleLines();

    // Rapid re-scramble
    const scId = setInterval(() => {
      setLine1(prev =>
        prev.map((c, i) => isResolved1Ref.current.has(i) ? c : rand())
      );
      setLine2(prev =>
        prev.map((c, i) => isResolved2Ref.current.has(i) ? c : rand())
      );
    }, 50);

    addT(() => {
      clearInterval(scId);
      playSFX();

      // Phase 2: Reveal letters one by one
      LINE1.split("").forEach((ch, i) => {
        addT(() => resolveLetter(1, i, ch), i * REVEAL_PER_LETTER);
      });

      const l1Done = LINE1.length * REVEAL_PER_LETTER;

      LINE2.split("").forEach((ch, i) => {
        addT(() => resolveLetter2(i, ch), l1Done + 200 + i * REVEAL_PER_LETTER);
      });

      const allDone = l1Done + 200 + LINE2.length * REVEAL_PER_LETTER;

      // Phase 3: Hold resolved text
      addT(() => {
        setLine1(LINE1.split(""));
        setLine2(LINE2.split(""));

        // Phase 4: Glitch flash
        addT(() => {
          setGlitching(true);
          playSFX();
          scrambleLines();

          addT(() => {
            setGlitching(false);
            // Quick re-resolve
            setLine1(LINE1.split(""));
            setLine2(LINE2.split(""));
            setIsResolved1Count(LINE1.length);
            setIsResolved2Count(LINE2.length);
            isResolved1Ref.current = new Set(Array.from({ length: LINE1.length }, (_, i) => i));
            isResolved2Ref.current = new Set(Array.from({ length: LINE2.length }, (_, i) => i));

            // Phase 5: Erase (flash to blank)
            addT(() => {
              blankLines();
              setActive(false);

              // Phase 6: Next cycle
              const next = 4000 + Math.random() * 3000;
              cycleRef.current = setTimeout(() => { setActive(true); run(); }, next);
            }, FLASH_MS + 100);
          }, FLASH_MS);
        }, HOLD_MS);
      }, allDone);
    }, SCRAMBLE_MS);
  }, [cancelAll, scrambleLines, blankLines, resolveLetter, resolveLetter2, addT]);

  useEffect(() => {
    cycleRef.current = setTimeout(() => {
      setStarted(true);
      run();
    }, 2500);
    return () => cancelAll();
  }, [run, cancelAll]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlinkOn(p => !p), 530);
    return () => clearInterval(id);
  }, []);

  // Hover: scramble half of line1 then re-resolve
  const onHover = useCallback(() => {
    if (glitching || !active) return;
    playSFX();

    const count = Math.max(1, Math.floor(LINE1.length / 2));
    const indices = Array.from({ length: LINE1.length }, (_, i) => i);
    // Simple pick
    const toScramble = indices.slice(0, count).filter(() => true); // first N

    toScramble.forEach(i => {
      isResolved1Ref.current.delete(i);
      setIsResolved1Count(prev => Math.max(0, prev - 1));
    });
    setLine1(prev =>
      prev.map((c, i) => toScramble.includes(i) ? rand() : c)
    );

    addT(() => {
      playSFX();
      toScramble.forEach((ci, idx) => {
        addT(() => {
          isResolved1Ref.current.add(ci);
          setLine1(prev => { const n = [...prev]; n[ci] = LINE1[ci]; return n; });
          setIsResolved1Count(prev => prev + 1);
        }, idx * 80);
      });
    }, 400);
  }, [glitching, active, addT]);

  return (
    <>
      <style>{`
        @keyframes gtsk{0%,100%{transform:translate(0)}25%{transform:translate(-3px,1px)}50%{transform:translate(2px,-2px)}75%{transform:translate(-1px,2px)}}
        @keyframes curbl{0%,49%{opacity:1}50%,100%{opacity:0}}
        .g-shake{animation:gtsk .1s linear infinite}
        .c-blk{animation:curbl 530ms step-end infinite}
      `}</style>

      <span
        className={`relative inline-block ${glitching ? "g-shake" : ""}`}
        onMouseEnter={onHover}
        style={{ cursor: "pointer" }}
      >
        {/* Ghost layers — chromatic aberration during glitch */}
        {glitching && (
          <>
            <span className="absolute top-0 left-[3px] text-sky-500/50 select-none pointer-events-none mix-blend-screen whitespace-pre" aria-hidden="true">
              {line1.join("")}<br />{line2.join("")}
            </span>
            <span className="absolute top-0 -left-[3px] text-red-500/40 select-none pointer-events-none mix-blend-screen whitespace-pre" aria-hidden="true">
              {line1.join("")}<br />{line2.join("")}
            </span>
          </>
        )}

        {/* Main text */}
        <span className="relative z-10">
          {started && active ? (
            <>
              {line1.map((c, i) => {
                const resolved = isResolved1Ref.current.has(i);
                const cls = resolved
                  ? "text-black dark:text-white"
                  : started ? "text-sky-500/80" : "text-black dark:text-white";
                return (
                  <span key={i} className={`${cls} transition-colors duration-75`}>
                    {c}
                  </span>
                );
              })}
              <span className="text-zinc-400 dark:text-zinc-800">.</span>
              <br />
              {line2.map((c, i) => {
                const resolved = isResolved2Ref.current.has(i);
                const cls = resolved
                  ? "text-zinc-500 dark:text-zinc-700"
                  : started ? "text-green-500/80" : "text-zinc-500 dark:text-zinc-700";
                return (
                  <span key={i} className={`${cls} transition-colors duration-75`}>
                    {c}
                  </span>
                );
              })}
            </>
          ) : (
            <>ROBSON<span className="text-zinc-400 dark:text-zinc-800">.</span><br /><span className="text-zinc-500 dark:text-zinc-700">DEV</span></>
          )}

          {/* Cursor blink */}
          {blinkOn && started && active && (
            <span className="c-blk ml-1 inline-block w-[3px] h-[0.65em] bg-green-500/50 align-middle rounded-sm" />
          )}
        </span>
      </span>
    </>
  );
}
