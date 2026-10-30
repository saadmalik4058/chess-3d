"use client";

import { motion } from "framer-motion";

import { useSceneStore } from "@/store/useSceneStore";

export function SceneOverlay() {
  const autoRotate = useSceneStore((state) => state.autoRotate);
  const toggleAutoRotate = useSceneStore((state) => state.toggleAutoRotate);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-start justify-between gap-6"
      >
        <div>
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.45em] text-amber-200/60">
            Stage 01
          </p>
          <h1 className="mt-2 text-2xl font-medium tracking-tight text-zinc-100 sm:text-3xl">
            Chess <span className="text-zinc-600">/</span> 3D
          </h1>
        </div>

        <button
          type="button"
          onClick={toggleAutoRotate}
          aria-pressed={autoRotate}
          className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-md transition-colors hover:border-white/20 hover:text-zinc-100"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              autoRotate
                ? "bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.45)]"
                : "bg-zinc-600"
            }`}
          />
          Auto-orbit
        </button>
      </motion.header>

      <motion.footer
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between gap-4 text-[0.65rem] uppercase tracking-[0.22em] text-zinc-500"
      >
        <span>Studio scene</span>
        <span className="hidden sm:inline">Drag to orbit · Scroll to zoom</span>
      </motion.footer>
    </div>
  );
}
