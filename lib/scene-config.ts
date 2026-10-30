import type { Vector3Tuple } from "three";

/** Shared palette so the 3D scene and the DOM overlay stay in sync. */
export const SCENE_COLORS = {
  background: "#0a0b0f",
  fog: "#0a0b0f",
  floor: "#101217",
  accent: "#d8b26a",
  warmKey: "#ffe3b8",
  coolFill: "#9fc4ff",
} as const;

/**
 * White sits on +Z and Black on -Z, matching the board's rank orientation.
 */
export const CAMERA_PRESETS = {
  white: {
    position: [0, 5.4, 8] satisfies Vector3Tuple,
    target: [0, 0.28, 0] satisfies Vector3Tuple,
  },
  black: {
    position: [0, 5.4, -8] satisfies Vector3Tuple,
    target: [0, 0.28, 0] satisfies Vector3Tuple,
  },
} as const;

export const CAMERA_CONFIG = {
  position: CAMERA_PRESETS.white.position,
  fov: 36,
  near: 0.1,
  far: 80,
} as const;

export const ORBIT_CONFIG = {
  target: CAMERA_PRESETS.white.target,
  minDistance: 5.5,
  maxDistance: 16,
  /** Keep the camera between a high angle and a low table-level view. */
  minPolarAngle: Math.PI / 7,
  maxPolarAngle: Math.PI / 2.35,
  enablePan: false,
  enableDamping: true,
  dampingFactor: 0.075,
  rotateSpeed: 0.65,
  zoomSpeed: 0.7,
  autoRotateSpeed: 0.45,
} as const;

export const SHADOW_MAP_SIZE = 2048;
