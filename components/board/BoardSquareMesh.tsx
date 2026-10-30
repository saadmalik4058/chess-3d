"use client";

import { memo } from "react";
import type * as THREE from "three";

import {
  BOARD_SURFACE_Y,
  SQUARE_GAP,
  SQUARE_SIZE,
  SQUARE_THICKNESS,
  squareToWorld,
} from "@/lib/board";

type BoardSquareMeshProps = {
  fileIndex: number;
  rankIndex: number;
  material: THREE.Material;
};

export const BoardSquareMesh = memo(function BoardSquareMesh({
  fileIndex,
  rankIndex,
  material,
}: BoardSquareMeshProps) {
  const [x, , z] = squareToWorld(fileIndex, rankIndex);

  return (
    <mesh
      position={[x, BOARD_SURFACE_Y - SQUARE_THICKNESS / 2, z]}
      receiveShadow
      material={material}
    >
      <boxGeometry
        args={[
          SQUARE_SIZE - SQUARE_GAP,
          SQUARE_THICKNESS,
          SQUARE_SIZE - SQUARE_GAP,
        ]}
      />
    </mesh>
  );
});
