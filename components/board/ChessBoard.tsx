"use client";

import { RoundedBox } from "@react-three/drei";

import { BOARD_EXTENT, BOARD_SQUARES } from "@/lib/board";

import { BoardFrame } from "./BoardFrame";
import { BoardSquareMesh } from "./BoardSquareMesh";
import { useBoardMaterials } from "./useBoardMaterials";

const BASE_SIZE = 5.2;
const BASE_HEIGHT = 0.16;
const BASE_Y = 0.13;

const FOOT_SIZE = 5.32;
const FOOT_HEIGHT = 0.05;
const FOOT_Y = 0.025;

const INLAY_SIZE = BOARD_EXTENT + 0.26;
const INLAY_HEIGHT = 0.04;
const INLAY_Y = 0.23;

export function ChessBoard() {
  const materials = useBoardMaterials();

  return (
    <group>
      {/* Thin brass foot plate */}
      <RoundedBox
        args={[FOOT_SIZE, FOOT_HEIGHT, FOOT_SIZE]}
        radius={0.02}
        smoothness={4}
        position={[0, FOOT_Y, 0]}
        castShadow
        receiveShadow
        material={materials.brassDark}
      />

      {/* Dark marble body */}
      <RoundedBox
        args={[BASE_SIZE, BASE_HEIGHT, BASE_SIZE]}
        radius={0.06}
        smoothness={5}
        position={[0, BASE_Y, 0]}
        castShadow
        receiveShadow
        material={materials.base}
      />

      {/* Brass plate visible through the square gaps */}
      <RoundedBox
        args={[INLAY_SIZE, INLAY_HEIGHT, INLAY_SIZE]}
        radius={0.015}
        smoothness={3}
        position={[0, INLAY_Y, 0]}
        castShadow
        receiveShadow
        material={materials.brassDark}
      />

      {BOARD_SQUARES.map((square) => (
        <BoardSquareMesh
          key={square.name}
          fileIndex={square.fileIndex}
          rankIndex={square.rankIndex}
          material={square.isDark ? materials.dark : materials.light}
        />
      ))}

      <BoardFrame material={materials.brass} />
    </group>
  );
}
