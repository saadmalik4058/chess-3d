"use client";

import { create } from "zustand";

type SceneState = {
  /** Slow cinematic orbit around the table. */
  autoRotate: boolean;
  /** Strength of the generated studio environment map. */
  environmentIntensity: number;
  toggleAutoRotate: () => void;
  setEnvironmentIntensity: (value: number) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  autoRotate: false,
  environmentIntensity: 0.8,
  toggleAutoRotate: () =>
    set((state) => ({ autoRotate: !state.autoRotate })),
  setEnvironmentIntensity: (environmentIntensity) =>
    set({ environmentIntensity }),
}));
