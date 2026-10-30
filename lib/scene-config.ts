import type { Vector3Tuple } from "three";

/** Shared palette so the 3D scene and the DOM overlay stay in sync. */
export const SCENE_COLORS = {
  background: "#0a0b0f",
  fog: "#0a0b0f",
  floor: "#101217",
  plinth: "#15171c",
  plinthTop: "#1b1e24",
  accent: "#d8b26a",
  warmKey: "#ffe3b8",
  coolFill: "#9fc4ff",
} as const;

export const CAMERA_CONFIG = {
  position: [8, 6.5, 10] satisfies Vector3Tuple,
  fov: 38,
  near: 0.1,
  far: 80,
} as const;

export const ORBIT_CONFIG = {
  target: [0, 0.35, 0] satisfies Vector3Tuple,
  minDistance: 6,
  maxDistance: 18,
  /** Keep the camera above the table at all times. */
  minPolarAngle: Math.PI / 6,
  maxPolarAngle: Math.PI / 2.15,
  enablePan: false,
  enableDamping: true,
  dampingFactor: 0.075,
  rotateSpeed: 0.65,
  zoomSpeed: 0.7,
  autoRotateSpeed: 0.45,
} as const;

export const SHADOW_MAP_SIZE = 2048;
