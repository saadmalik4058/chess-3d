"use client";

import { Suspense } from "react";
import * as THREE from "three";

import { BOARD_SURFACE_Y } from "@/lib/board";
import { squareToWorld } from "@/lib/board";
import { PieceColor, PieceType, usePieceMaterials } from "./usePieceMaterials";
import { getPieceGeometry } from "./PieceGeometry";

type PieceProps = {
  type: PieceType;
  color: PieceColor;
  fileIndex: number;
  rankIndex: number;
};

const PIECE_SCALE = 0.95;
const PIECE_Y_OFFSET = 0.016;

function FallbackPiece({ type, color, fileIndex, rankIndex }: PieceProps) {
  const geometry = getPieceGeometry(type);
  const materials = usePieceMaterials();
  const [x, , z] = squareToWorld(fileIndex, rankIndex);
  const material = color === "white" ? materials.white : materials.black;

  return (
    <group position={[x, BOARD_SURFACE_Y + PIECE_Y_OFFSET, z]}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      <mesh
        position={[0, 0.004, 0]}
        material={materials.base}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.038, 0.042, 0.008, 32]} />
      </mesh>
    </group>
  );
}

export type { PieceColor, PieceType };

export function Piece(props: PieceProps) {
  return (
    <Suspense fallback={<FallbackPiece {...props} />}>
      <FallbackPiece {...props} />
    </Suspense>
  );
}