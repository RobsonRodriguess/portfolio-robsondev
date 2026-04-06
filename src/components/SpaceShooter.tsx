"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Trophy, Crosshair } from "lucide-react";

interface Vec2 {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
  size: number;
}

interface Enemy {
  x: number;
  y: number;
  size: number;
  speed: number;
  hp: number;
  type: "basic" | "fast" | "tank";
  shootTimer: number;
  wobble: number;
  wobbleSpeed: number;
}

interface EnemyBullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
}

interface PlayerState {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  shootCooldown: number;
  invincible: number;
}

type GameStatus = "menu" | "playing" | "gameover";

const COLORS = {
  green: "#22c55e",
  greenDim: "rgba(34,197,94,0.3)",
  sky: "#0ea5e9",
  skyDim: "rgba(14,165,233,0.3)",
  white: "#e4e4e7",
  whiteDim: "rgba(228,228,231,0.1)",
  red: "#ef4444",
  orange: "#f97316",
  purple: "#a855f7",
  bg: "#0a0a0a",
};

const ENEMY_COLORS: Record<string, string> = {
  basic: COLORS.green,
  fast: COLORS.sky,
  tank: COLORS.purple,
};

export default function SpaceShooter({
  onClose,
}: {
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);

  const gameRef = useRef({
    status: "menu" as GameStatus,
    player: {
      x: 0,
      y: 0,
      width: 32,
      height: 40,
      speed: 6,
      shootCooldown: 0,
      invincible: 0,
    } as PlayerState,
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    enemyBullets: [] as EnemyBullet[],
    particles: [] as Particle[],
    stars: [] as Star[],
    keys: {} as Record<string, boolean>,
    score: 0,
    lives: 3,
    wave: 1,
    waveTimer: 0,
    spawnTimer: 0,
    shakeTimer: 0,
    shakeIntensity: 0,
    combo: 0,
    comboTimer: 0,
    mouseX: 0,
    mouseY: 0,
    useMouseControl: false,
    isMobile: false,
  });

  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const initGame = useCallback(() => {
    const g = gameRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    g.player = {
      x: canvas.width / 2,
      y: canvas.height - 80,
      width: 32,
      height: 40,
      speed: 6,
      shootCooldown: 0,
      invincible: 0,
    };
    g.bullets = [];
    g.enemies = [];
    g.enemyBullets = [];
    g.particles = [];
    g.score = 0;
    g.lives = 3;
    g.wave = 1;
    g.waveTimer = 0;
    g.spawnTimer = 0;
    g.shakeTimer = 0;
    g.combo = 0;
    g.comboTimer = 0;

    g.stars = [];
    for (let i = 0; i < 120; i++) {
      g.stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 1.5 + 0.3,
        brightness: Math.random(),
      });
    }

    setScore(0);
    setLives(3);
    setWave(1);
  }, []);

  const spawnParticles = useCallback(
    (x: number, y: number, count: number, color: string, spread = 3) => {
      const g = gameRef.current;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * spread + 0.5;
        g.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          size: Math.random() * 3 + 1,
          color,
        });
      }
    },
    []
  );

  const spawnEnemy = useCallback(
    (canvasW: number) => {
      const g = gameRef.current;
      const rand = Math.random();
      let type: Enemy["type"];
      if (rand < 0.6) type = "basic";
      else if (rand < 0.85) type = "fast";
      else type = "tank";

      const configs = {
        basic: { size: 24, speed: 1.5 + g.wave * 0.15, hp: 1 },
        fast: { size: 18, speed: 3 + g.wave * 0.2, hp: 1 },
        tank: { size: 34, speed: 0.8 + g.wave * 0.1, hp: 3 },
      };

      const cfg = configs[type];
      g.enemies.push({
        x: Math.random() * (canvasW - cfg.size * 2) + cfg.size,
        y: -cfg.size,
        size: cfg.size,
        speed: cfg.speed,
        hp: cfg.hp,
        type,
        shootTimer: Math.random() * 120 + 60,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
      });
    },
    []
  );

  const drawPlayer = useCallback(
    (ctx: CanvasRenderingContext2D, p: PlayerState) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      if (p.invincible > 0 && Math.floor(p.invincible * 10) % 2 === 0) {
        ctx.globalAlpha = 0.3;
      }

      // Engine glow
      const glowGrad = ctx.createRadialGradient(0, p.height / 2 + 5, 0, 0, p.height / 2 + 5, 20);
      glowGrad.addColorStop(0, COLORS.greenDim);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(-20, p.height / 2 - 5, 40, 30);

      // Ship body
      ctx.fillStyle = COLORS.green;
      ctx.beginPath();
      ctx.moveTo(0, -p.height / 2);
      ctx.lineTo(-p.width / 2, p.height / 2);
      ctx.lineTo(-p.width / 4, p.height / 3);
      ctx.lineTo(0, p.height / 2.5);
      ctx.lineTo(p.width / 4, p.height / 3);
      ctx.lineTo(p.width / 2, p.height / 2);
      ctx.closePath();
      ctx.fill();

      // Ship outline
      ctx.strokeStyle = COLORS.sky;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cockpit
      ctx.fillStyle = COLORS.sky;
      ctx.beginPath();
      ctx.ellipse(0, -2, 4, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Engine flame
      const flameH = Math.random() * 8 + 4;
      ctx.fillStyle = COLORS.orange;
      ctx.beginPath();
      ctx.moveTo(-6, p.height / 3);
      ctx.lineTo(0, p.height / 3 + flameH);
      ctx.lineTo(6, p.height / 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    },
    []
  );

  const drawEnemy = useCallback(
    (ctx: CanvasRenderingContext2D, e: Enemy) => {
      ctx.save();
      ctx.translate(e.x, e.y);

      const color = ENEMY_COLORS[e.type];

      // Glow
      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, e.size * 1.5);
      glowGrad.addColorStop(0, `${color}33`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(-e.size * 1.5, -e.size * 1.5, e.size * 3, e.size * 3);

      if (e.type === "basic") {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, -e.size / 2);
        ctx.lineTo(e.size / 2, e.size / 4);
        ctx.lineTo(e.size / 3, e.size / 2);
        ctx.lineTo(-e.size / 3, e.size / 2);
        ctx.lineTo(-e.size / 2, e.size / 4);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = `${color}88`;
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (e.type === "fast") {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, -e.size / 2);
        ctx.lineTo(e.size / 2, e.size / 2);
        ctx.lineTo(0, e.size / 3);
        ctx.lineTo(-e.size / 2, e.size / 2);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(-e.size / 2, -e.size / 2, e.size, e.size);
        ctx.strokeStyle = `${color}88`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-e.size / 2, -e.size / 2, e.size, e.size);

        // HP indicator
        ctx.fillStyle = COLORS.white;
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${e.hp}`, 0, 4);
      }

      ctx.restore();
    },
    []
  );

  const gameLoop = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 16.67, 3);
      lastTimeRef.current = timestamp;

      const g = gameRef.current;

      // === UPDATE ===
      if (g.status === "playing") {
        // Player movement
        const p = g.player;
        if (g.useMouseControl) {
          const dx = g.mouseX - p.x;
          const dy = g.mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 2) {
            p.x += (dx / dist) * Math.min(p.speed * 1.2, dist);
            p.y += (dy / dist) * Math.min(p.speed * 1.2, dist);
          }
        } else {
          if (g.keys["ArrowLeft"] || g.keys["a"]) p.x -= p.speed * dt;
          if (g.keys["ArrowRight"] || g.keys["d"]) p.x += p.speed * dt;
          if (g.keys["ArrowUp"] || g.keys["w"]) p.y -= p.speed * dt;
          if (g.keys["ArrowDown"] || g.keys["s"]) p.y += p.speed * dt;
        }

        p.x = Math.max(p.width / 2, Math.min(canvas.width - p.width / 2, p.x));
        p.y = Math.max(p.height / 2, Math.min(canvas.height - p.height / 2, p.y));

        // Shooting
        if (p.shootCooldown > 0) p.shootCooldown -= dt;
        if (
          (g.keys[" "] || g.keys["ArrowUp"] || g.useMouseControl) &&
          p.shootCooldown <= 0
        ) {
          g.bullets.push(
            { x: p.x - 8, y: p.y - p.height / 2, vy: -10, size: 3 },
            { x: p.x + 8, y: p.y - p.height / 2, vy: -10, size: 3 }
          );
          p.shootCooldown = 10;
        }

        if (p.invincible > 0) p.invincible -= dt / 60;

        // Combo timer
        if (g.comboTimer > 0) {
          g.comboTimer -= dt;
          if (g.comboTimer <= 0) g.combo = 0;
        }

        // Bullets
        g.bullets = g.bullets.filter((b) => {
          b.y += b.vy * dt;
          return b.y > -10;
        });

        // Enemy bullets
        g.enemyBullets = g.enemyBullets.filter((b) => {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          return b.y < canvas.height + 10 && b.y > -10 && b.x > -10 && b.x < canvas.width + 10;
        });

        // Spawn enemies
        const spawnRate = Math.max(20, 60 - g.wave * 3);
        g.spawnTimer += dt;
        if (g.spawnTimer >= spawnRate) {
          spawnEnemy(canvas.width);
          g.spawnTimer = 0;
        }

        // Wave progression
        g.waveTimer += dt;
        if (g.waveTimer >= 600) {
          g.wave++;
          g.waveTimer = 0;
          setWave(g.wave);
        }

        // Enemies
        g.enemies = g.enemies.filter((e) => {
          e.wobble += e.wobbleSpeed * dt;
          e.y += e.speed * dt;
          e.x += Math.sin(e.wobble) * 0.8 * dt;

          // Enemy shooting (fast and tank types)
          if (e.type !== "basic") {
            e.shootTimer -= dt;
            if (e.shootTimer <= 0 && e.y > 0 && e.y < canvas.height * 0.7) {
              const dx = p.x - e.x;
              const dy = p.y - e.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const bulletSpeed = 3 + g.wave * 0.2;
              g.enemyBullets.push({
                x: e.x,
                y: e.y + e.size / 2,
                vx: (dx / dist) * bulletSpeed,
                vy: (dy / dist) * bulletSpeed,
                size: e.type === "tank" ? 5 : 3,
              });
              e.shootTimer = e.type === "fast" ? 90 : 60;
            }
          }

          // Collision with player
          if (p.invincible <= 0) {
            const dx = p.x - e.x;
            const dy = p.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < p.width / 2 + e.size / 2) {
              g.lives--;
              p.invincible = 2;
              g.shakeTimer = 15;
              g.shakeIntensity = 8;
              spawnParticles(p.x, p.y, 20, COLORS.red, 5);
              setLives(g.lives);
              if (g.lives <= 0) {
                g.status = "gameover";
                setGameStatus("gameover");
                if (g.score > highScore) {
                  setHighScore(g.score);
                }
              }
              return false;
            }
          }

          return e.y < canvas.height + e.size;
        });

        // Bullet-enemy collision
        g.bullets = g.bullets.filter((b) => {
          let hit = false;
          g.enemies = g.enemies.filter((e) => {
            if (hit) return true;
            const dx = b.x - e.x;
            const dy = b.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < e.size / 2 + b.size) {
              hit = true;
              e.hp--;
              spawnParticles(b.x, b.y, 5, ENEMY_COLORS[e.type], 2);
              if (e.hp <= 0) {
                g.combo++;
                g.comboTimer = 120;
                const points =
                  (e.type === "basic" ? 100 : e.type === "fast" ? 150 : 300) *
                  Math.max(1, g.combo);
                g.score += points;
                setScore(g.score);
                spawnParticles(e.x, e.y, 15, ENEMY_COLORS[e.type], 4);
                return false;
              }
              return true;
            }
            return true;
          });
          return !hit;
        });

        // Enemy bullet - player collision
        if (p.invincible <= 0) {
          g.enemyBullets = g.enemyBullets.filter((b) => {
            const dx = p.x - b.x;
            const dy = p.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < p.width / 2 + b.size) {
              g.lives--;
              p.invincible = 2;
              g.shakeTimer = 15;
              g.shakeIntensity = 8;
              spawnParticles(p.x, p.y, 20, COLORS.red, 5);
              setLives(g.lives);
              if (g.lives <= 0) {
                g.status = "gameover";
                setGameStatus("gameover");
                if (g.score > highScore) setHighScore(g.score);
              }
              return false;
            }
            return true;
          });
        }

        // Particles
        g.particles = g.particles.filter((pt) => {
          pt.x += pt.vx * dt;
          pt.y += pt.vy * dt;
          pt.life -= (dt / 60) * 1.5;
          pt.vx *= 0.98;
          pt.vy *= 0.98;
          return pt.life > 0;
        });
      }

      // Stars always update
      g.stars.forEach((s) => {
        s.y += s.speed * dt;
        s.brightness = 0.3 + Math.sin(timestamp * 0.001 + s.x) * 0.3;
        if (s.y > canvas.height + 5) {
          s.y = -5;
          s.x = Math.random() * canvas.width;
        }
      });

      // === RENDER ===
      ctx.save();

      // Screen shake
      if (g.shakeTimer > 0) {
        g.shakeTimer -= dt;
        const intensity = g.shakeIntensity * (g.shakeTimer / 15);
        ctx.translate(
          (Math.random() - 0.5) * intensity,
          (Math.random() - 0.5) * intensity
        );
      }

      // Background
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      g.stars.forEach((s) => {
        ctx.fillStyle = `rgba(228,228,231,${s.brightness * 0.5})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Grid lines (subtle)
      ctx.strokeStyle = `${COLORS.whiteDim}`;
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      const gridOffset = (timestamp * 0.02) % gridSize;
      for (let y = gridOffset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (g.status === "playing" || g.status === "gameover") {
        // Particles
        g.particles.forEach((pt) => {
          ctx.globalAlpha = pt.life;
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        if (g.status === "playing") {
          // Bullets
          g.bullets.forEach((b) => {
            const grad = ctx.createLinearGradient(b.x, b.y - 8, b.x, b.y + 4);
            grad.addColorStop(0, COLORS.green);
            grad.addColorStop(1, `${COLORS.green}00`);
            ctx.fillStyle = grad;
            ctx.fillRect(b.x - 1, b.y - 8, 2, 12);

            ctx.fillStyle = COLORS.green;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
            ctx.fill();
          });

          // Enemy bullets
          g.enemyBullets.forEach((b) => {
            ctx.fillStyle = COLORS.red;
            ctx.shadowColor = COLORS.red;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          });

          // Enemies
          g.enemies.forEach((e) => drawEnemy(ctx, e));

          // Player
          drawPlayer(ctx, g.player);

          // HUD
          ctx.fillStyle = COLORS.white;
          ctx.font = "bold 14px monospace";
          ctx.textAlign = "left";
          ctx.fillText(`SCORE: ${g.score.toLocaleString()}`, 16, 28);

          ctx.textAlign = "right";
          ctx.fillText(`WAVE ${g.wave}`, canvas.width - 16, 28);

          // Lives
          ctx.textAlign = "left";
          for (let i = 0; i < g.lives; i++) {
            ctx.fillStyle = COLORS.green;
            ctx.beginPath();
            ctx.moveTo(16 + i * 20, canvas.height - 20);
            ctx.lineTo(10 + i * 20, canvas.height - 10);
            ctx.lineTo(22 + i * 20, canvas.height - 10);
            ctx.closePath();
            ctx.fill();
          }

          // Combo
          if (g.combo > 1) {
            ctx.globalAlpha = Math.min(1, g.comboTimer / 30);
            ctx.fillStyle = COLORS.sky;
            ctx.font = `bold ${16 + g.combo}px monospace`;
            ctx.textAlign = "center";
            ctx.fillText(`x${g.combo} COMBO`, canvas.width / 2, 50);
            ctx.globalAlpha = 1;
          }
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(gameLoop);
    },
    [
      drawPlayer,
      drawEnemy,
      spawnParticles,
      spawnEnemy,
      highScore,
    ]
  );

  // Start loop
  useEffect(() => {
    lastTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameLoop]);

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = Math.min(parent.clientWidth * 1.4, window.innerHeight * 0.7);
      canvas.width = w;
      canvas.height = h;

      const g = gameRef.current;
      g.player.x = w / 2;
      if (g.status === "menu") {
        g.player.y = h - 80;
      }

      if (g.stars.length === 0) {
        for (let i = 0; i < 120; i++) {
          g.stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 1.5 + 0.3,
            brightness: Math.random(),
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key] = true;
      gameRef.current.useMouseControl = false;
      if (e.key === " ") e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Touch control for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      const g = gameRef.current;
      g.useMouseControl = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      g.mouseX = touch.clientX - rect.left;
      g.mouseY = touch.clientY - rect.top;
    };

    canvas.addEventListener("touchmove", handleTouch, { passive: false });
    canvas.addEventListener("touchstart", handleTouch, { passive: false });

    return () => {
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  // Mouse control for desktop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const g = gameRef.current;
      if (g.status !== "playing") return;
      g.useMouseControl = true;
      const rect = canvas.getBoundingClientRect();
      g.mouseX = e.clientX - rect.left;
      g.mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const startGame = useCallback(() => {
    initGame();
    gameRef.current.status = "playing";
    setGameStatus("playing");
  }, [initGame]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.15)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Crosshair className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em] text-white font-mono">
              VOID<span className="text-green-500">DEFENDER</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game area */}
        <div className="relative w-full" style={{ aspectRatio: "5/7" }}>
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />

          {/* Menu overlay */}
          <AnimatePresence>
            {gameStatus === "menu" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                    VOID<span className="text-green-500">DEFENDER</span>
                  </h3>
                  <p className="text-zinc-500 font-mono text-sm mb-8">
                    WASD / Arrows to move &middot; Space to shoot &middot; Mouse supported
                  </p>

                  <button
                    onClick={startGame}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add("bg-green-400", "text-black");
                      e.currentTarget.classList.remove("bg-green-500");
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove("bg-green-400", "text-black");
                      e.currentTarget.classList.add("bg-green-500");
                    }}
                    className="px-10 py-4 bg-green-500 text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl hover:bg-green-400 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center gap-3 mx-auto"
                  >
                    <Play className="w-4 h-4" />
                    Start Game
                  </button>

                  {highScore > 0 && (
                    <div className="mt-6 flex items-center gap-2 text-zinc-600 font-mono text-xs justify-center">
                      <Trophy className="w-3 h-3 text-green-500" />
                      High Score: {highScore.toLocaleString()}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Over overlay */}
          <AnimatePresence>
            {gameStatus === "gameover" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-[2px]"
              >
                <motion.div
                  initial={{ y: 20, scale: 0.95 }}
                  animate={{ y: 0, scale: 1 }}
                  className="text-center"
                >
                  <h3 className="text-5xl font-black text-red-500 tracking-tighter mb-4">
                    GAME OVER
                  </h3>
                  <div className="space-y-2 mb-8">
                    <p className="text-2xl font-black text-white font-mono">
                      {score.toLocaleString()} pts
                    </p>
                    <p className="text-zinc-500 font-mono text-sm">
                      Wave {wave} reached
                    </p>
                    {score >= highScore && score > 0 && (
                      <p className="text-green-500 font-mono text-xs flex items-center gap-1 justify-center">
                        <Trophy className="w-3 h-3" />
                        New High Score!
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={startGame}
                      className="px-8 py-3 bg-green-500 text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retry
                    </button>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 border border-zinc-700 text-zinc-400 font-mono text-xs rounded-xl hover:border-zinc-500 hover:text-white transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer HUD */}
        <div className="px-6 py-3 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-4 text-zinc-600 font-mono text-[10px] uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-sm"></span> WASD/Arrows
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-sky-500 rounded-sm"></span> Mouse
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-500 rounded-sm"></span> Touch
            </span>
          </div>
          <div className="text-zinc-700 font-mono text-[10px]">
            Built by Robson
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
