"use client";

import { SCENE_COLORS } from "@/lib/scene-config";

/**
 * Stand-in pedestal that reserves the footprint for the board.
 * It gives the lighting and shadows something to land on in stage 1.
 */
export function ScenePlaceholder() {
  return (
    <group>
      <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.1, 3.35, 0.18, 96]} />
        <meshStandardMaterial
          color={SCENE_COLORS.plinth}
          roughness={0.42}
          metalness={0.55}
        />
      </mesh>

      <mesh position={[0, 0.181, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.9, 96]} />
        <meshStandardMaterial
          color={SCENE_COLORS.plinthTop}
          roughness={0.85}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.183, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.72, 2.86, 96]} />
        <meshStandardMaterial
          color={SCENE_COLORS.accent}
          emissive={SCENE_COLORS.accent}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
