"use client";

import { ContactShadows } from "@react-three/drei";

import { SCENE_COLORS } from "@/lib/scene-config";

/** Large studio floor that catches the key light's shadow. */
export function StudioFloor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[24, 96]} />
        <meshStandardMaterial
          color={SCENE_COLORS.floor}
          roughness={0.68}
          metalness={0.35}
        />
      </mesh>

      <ContactShadows
        position={[0, 0.002, 0]}
        opacity={0.55}
        scale={26}
        blur={2.6}
        far={9}
        resolution={1024}
        frames={1}
        color="#000000"
      />
    </group>
  );
}
