"use client";

import { RoundedBox } from "@react-three/drei";
import type * as THREE from "three";

import { BOARD_EXTENT } from "@/lib/board";

type BoardFrameProps = {
  material: THREE.Material;
};

const FRAME_WIDTH = 0.26;
const FRAME_HEIGHT = 0.13;
const FRAME_OUTER = BOARD_EXTENT + FRAME_WIDTH * 2;
const FRAME_OFFSET = (BOARD_EXTENT + FRAME_WIDTH) / 2;
const FRAME_Y = 0.245;

export function BoardFrame({ material }: BoardFrameProps) {
  return (
    <group>
      <RoundedBox
        args={[FRAME_OUTER, FRAME_HEIGHT, FRAME_WIDTH]}
        radius={0.02}
        smoothness={4}
        position={[0, FRAME_Y, FRAME_OFFSET]}
        castShadow
        receiveShadow
        material={material}
      />
      <RoundedBox
        args={[FRAME_OUTER, FRAME_HEIGHT, FRAME_WIDTH]}
        radius={0.02}
        smoothness={4}
        position={[0, FRAME_Y, -FRAME_OFFSET]}
        castShadow
        receiveShadow
        material={material}
      />
      <RoundedBox
        args={[FRAME_WIDTH, FRAME_HEIGHT, BOARD_EXTENT]}
        radius={0.02}
        smoothness={4}
        position={[FRAME_OFFSET, FRAME_Y, 0]}
        castShadow
        receiveShadow
        material={material}
      />
      <RoundedBox
        args={[FRAME_WIDTH, FRAME_HEIGHT, BOARD_EXTENT]}
        radius={0.02}
        smoothness={4}
        position={[-FRAME_OFFSET, FRAME_Y, 0]}
        castShadow
        receiveShadow
        material={material}
      />
    </group>
  );
}
