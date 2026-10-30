"use client";

import { Environment, Lightformer } from "@react-three/drei";

import { SCENE_COLORS } from "@/lib/scene-config";
import { useSceneStore } from "@/store/useSceneStore";

/**
 * A fully local HDRI substitute: drei renders these lightformers into a
 * cubemap, so we get soft studio reflections without downloading an asset.
 */
export function StudioEnvironment() {
  const environmentIntensity = useSceneStore(
    (state) => state.environmentIntensity,
  );

  return (
    <Environment
      resolution={256}
      frames={1}
      background={false}
      environmentIntensity={environmentIntensity}
    >
      <color attach="background" args={[SCENE_COLORS.background]} />

      {/* Overhead softbox */}
      <Lightformer
        form="rect"
        intensity={5}
        color="#ffffff"
        position={[0, 7, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[12, 12, 1]}
      />

      {/* Front-left bounce */}
      <Lightformer
        form="rect"
        intensity={2.2}
        color={SCENE_COLORS.warmKey}
        position={[-8, 4, 5]}
        rotation={[0, Math.PI / 3, 0]}
        scale={[8, 6, 1]}
      />

      {/* Back-right rim strip */}
      <Lightformer
        form="rect"
        intensity={3.2}
        color={SCENE_COLORS.coolFill}
        position={[7, 5, -7]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={[10, 4, 1]}
      />

      {/* Low warm accent for the plinth */}
      <Lightformer
        form="circle"
        intensity={1.6}
        color={SCENE_COLORS.accent}
        position={[0, 0.4, 9]}
        rotation={[0, Math.PI, 0]}
        scale={[4, 4, 1]}
      />
    </Environment>
  );
}
