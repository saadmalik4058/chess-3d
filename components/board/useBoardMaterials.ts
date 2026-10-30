"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { createMarbleTexture, createRoughnessTexture } from "@/lib/textures";

/**
 * PBR material set for the board.
 * Marble maps are generated at runtime; brass relies on the environment map.
 */
export function useBoardMaterials() {
  const assets = useMemo(() => {
    const darkMap = createMarbleTexture({
      base: "#101116",
      vein: "#7d828d",
      highlight: "#c3c8d2",
      seed: 17,
    });
    const lightMap = createMarbleTexture({
      base: "#d7d0c2",
      vein: "#857c6c",
      highlight: "#f4eee2",
      seed: 41,
    });
    const darkRoughness = createRoughnessTexture({ seed: 5, base: 105 });
    const lightRoughness = createRoughnessTexture({ seed: 9, base: 135 });

    const dark = new THREE.MeshPhysicalMaterial({
      map: darkMap ?? undefined,
      roughnessMap: darkRoughness ?? undefined,
      color: darkMap ? "#ffffff" : "#15161b",
      roughness: 0.62,
      metalness: 0.04,
      clearcoat: 0.85,
      clearcoatRoughness: 0.14,
      envMapIntensity: 0.9,
    });

    const light = new THREE.MeshPhysicalMaterial({
      map: lightMap ?? undefined,
      roughnessMap: lightRoughness ?? undefined,
      color: lightMap ? "#ffffff" : "#d7d0c2",
      roughness: 0.7,
      metalness: 0.02,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.8,
    });

    const base = new THREE.MeshPhysicalMaterial({
      map: darkMap ?? undefined,
      roughnessMap: darkRoughness ?? undefined,
      color: darkMap ? "#9aa0ab" : "#2a2c33",
      roughness: 0.8,
      metalness: 0.05,
      clearcoat: 0.5,
      clearcoatRoughness: 0.24,
      envMapIntensity: 0.75,
    });

    const brass = new THREE.MeshStandardMaterial({
      color: "#c9a45f",
      metalness: 1,
      roughness: 0.24,
      envMapIntensity: 1.45,
    });

    const brassDark = new THREE.MeshStandardMaterial({
      color: "#8c6c38",
      metalness: 1,
      roughness: 0.42,
      envMapIntensity: 1.1,
    });

    const materials = { dark, light, base, brass, brassDark };
    const textures = [
      darkMap,
      lightMap,
      darkRoughness,
      lightRoughness,
    ].filter((texture): texture is THREE.CanvasTexture => texture !== null);

    return { materials, textures };
  }, []);

  useEffect(() => {
    return () => {
      assets.textures.forEach((texture) => texture.dispose());
      Object.values(assets.materials).forEach((material) => material.dispose());
    };
  }, [assets]);

  return assets.materials;
}
