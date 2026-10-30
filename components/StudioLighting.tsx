"use client";

import { SCENE_COLORS, SHADOW_MAP_SIZE } from "@/lib/scene-config";

/**
 * Three-point studio rig.
 * The key light is the only shadow caster so the contact shadow stays crisp.
 */
export function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.12} color="#cfd8ff" />
      <hemisphereLight args={["#dfe8ff", "#08090c", 0.28]} />

      {/* Key */}
      <spotLight
        position={[7, 10, 6]}
        angle={0.6}
        penumbra={1}
        intensity={170}
        color={SCENE_COLORS.warmKey}
        castShadow
        shadow-mapSize={[SHADOW_MAP_SIZE, SHADOW_MAP_SIZE]}
        shadow-radius={10}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />

      {/* Fill */}
      <directionalLight
        position={[-6, 5, 7]}
        intensity={0.45}
        color={SCENE_COLORS.coolFill}
      />

      {/* Rim */}
      <spotLight
        position={[-7, 8, -8]}
        angle={0.75}
        penumbra={1}
        intensity={180}
        color="#bcd2ff"
      />
    </>
  );
}
