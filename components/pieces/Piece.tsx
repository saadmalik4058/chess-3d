"use client";

import { Suspense, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
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

function usePieceModel(type: PieceType) {
  const path = `/models/${type}.glb`;
  const result = useGLTF(path);
  const gltf = "scene" in result ? result : { scene: result } as const;
  return (gltf.scene as THREE.Group) ?? null;
}

function ModelPiece({
  type,
  color,
  fileIndex,
  rankIndex,
}: PieceProps) {
  const scene = usePieceModel(type);
  const materials = usePieceMaterials();
  const [x, , z] = squareToWorld(fileIndex, rankIndex);

  useEffect(() => {
    if (!scene) {
      return;
    }

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;

      if (color === "white") {
        child.material = materials.white;
      } else {
        child.material = materials.black;
      }
    });
  }, [scene, color, materials]);

  if (!scene) {
    return null;
  }

  return (
    <primitive
      object={scene.clone()}
      position={[x, BOARD_SURFACE_Y + PIECE_Y_OFFSET, z]}
      scale={[PIECE_SCALE, PIECE_SCALE, PIECE_SCALE]}
      rotation={[0, color === "black" ? Math.PI : 0, 0]}
    />
  );
}

function FallbackPiece({
  type,
  color,
  fileIndex,
  rankIndex,
}: PieceProps) {
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
      <ModelPiece {...props} />
    </Suspense>
  );
}