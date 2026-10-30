"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

export type PieceColor = "white" | "black";
export type PieceType =
  | "pawn"
  | "knight"
  | "bishop"
  | "rook"
  | "queen"
  | "king";

type PieceMaterials = {
  white: THREE.MeshPhysicalMaterial;
  black: THREE.MeshPhysicalMaterial;
  base: THREE.MeshStandardMaterial;
};

export function usePieceMaterials() {
  const materials = useMemo<PieceMaterials>(() => {
    const white = new THREE.MeshPhysicalMaterial({
      color: "#f3f1ea",
      roughness: 0.38,
      metalness: 0.08,
      reflectivity: 0.9,
      clearcoat: 0.5,
      clearcoatRoughness: 0.22,
      envMapIntensity: 0.95,
    });

    const black = new THREE.MeshPhysicalMaterial({
      color: "#15161b",
      roughness: 0.42,
      metalness: 0.18,
      reflectivity: 0.8,
      clearcoat: 0.6,
      clearcoatRoughness: 0.18,
      envMapIntensity: 0.85,
    });

    const base = new THREE.MeshStandardMaterial({
      color: "#c9a45f",
      metalness: 1,
      roughness: 0.26,
      envMapIntensity: 1.25,
    });

    return { white, black, base };
  }, []);

  useEffect(() => {
    return () => {
      materials.white.dispose();
      materials.black.dispose();
      materials.base.dispose();
    };
  }, [materials]);

  return materials;
}
