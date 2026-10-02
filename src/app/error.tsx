"use client";

import React, { useEffect } from "react";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error caught by ErrorBoundary:", error);

    // If it's a ChunkLoadError (caused by outdated cache after deployment or mobile connection drop),
    // automatically reload once to fetch fresh bundles.
    if (
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("Failed to fetch dynamically imported module")
    ) {
      const hasReloaded = sessionStorage.getItem("chunk_reload");
      if (!hasReloaded) {
        sessionStorage.setItem("chunk_reload", "true");
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-2xl backdrop-blur-xl">
        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-black tracking-tight mb-2">
          Ops, algo deu errado
        </h1>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Ocorreu uma falha ao carregar a página. Isso pode acontecer devido a oscilações de conexão ou atualização do sistema.
        </p>

        {error?.message && (
          <div className="mb-6 p-3 rounded-xl bg-black/40 border border-zinc-800 text-left overflow-auto max-h-32 text-xs font-mono text-zinc-400">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              sessionStorage.removeItem("chunk_reload");
              reset();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("chunk_reload");
              window.location.href = "/";
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Início
          </button>
        </div>
      </div>
    </div>
  );
}
