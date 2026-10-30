import * as THREE from "three";

function mulberry32(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type MarbleOptions = {
  base: string;
  vein: string;
  highlight: string;
  seed?: number;
  size?: number;
};

/**
 * Draws a procedural marble slab on a canvas.
 * Runs client-side only, so there is no texture asset to download.
 */
export function createMarbleTexture({
  base,
  vein,
  highlight,
  seed = 1,
  size = 1024,
}: MarbleOptions): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const random = mulberry32(seed);

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // Broad cloudy mineral patches.
  for (let i = 0; i < 26; i += 1) {
    const x = random() * size;
    const y = random() * size;
    const radius = size * (0.08 + random() * 0.3);
    const tint = random() > 0.45 ? highlight : "#000000";
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

    gradient.addColorStop(0, hexToRgba(tint, 0.025 + random() * 0.05));
    gradient.addColorStop(1, hexToRgba(tint, 0));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  // Long wandering veins.
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < 20; i += 1) {
    strokeVein(ctx, random, size, vein, 0.05 + random() * 0.16, 1 + random() * 3);
  }

  // Fine hairline fractures.
  for (let i = 0; i < 46; i += 1) {
    strokeVein(ctx, random, size, vein, 0.03 + random() * 0.07, 0.6);
  }

  // Mineral grain.
  for (let i = 0; i < 4200; i += 1) {
    const light = random() > 0.5;
    ctx.fillStyle = hexToRgba(light ? highlight : "#000000", random() * 0.09);
    ctx.fillRect(random() * size, random() * size, 1.2, 1.2);
  }

  // Soft diagonal sheen across the slab.
  const sheen = ctx.createLinearGradient(0, 0, size, size);
  sheen.addColorStop(0, hexToRgba(highlight, 0.05));
  sheen.addColorStop(0.55, hexToRgba(highlight, 0));
  sheen.addColorStop(1, hexToRgba("#000000", 0.07));
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;

  return texture;
}

function strokeVein(
  ctx: CanvasRenderingContext2D,
  random: () => number,
  size: number,
  color: string,
  alpha: number,
  width: number,
) {
  let x = random() * size;
  let y = random() * size;
  let angle = random() * Math.PI * 2;
  const segments = 7 + Math.floor(random() * 8);

  ctx.beginPath();
  ctx.moveTo(x, y);

  for (let i = 0; i < segments; i += 1) {
    angle += (random() - 0.5) * 1.1;
    const length = size * (0.05 + random() * 0.13);
    const nextX = x + Math.cos(angle) * length;
    const nextY = y + Math.sin(angle) * length;
    const controlX = x + Math.cos(angle - 0.45) * length * 0.5;
    const controlY = y + Math.sin(angle - 0.45) * length * 0.5;

    ctx.quadraticCurveTo(controlX, controlY, nextX, nextY);
    x = nextX;
    y = nextY;
  }

  ctx.save();
  ctx.shadowColor = hexToRgba(color, alpha * 0.8);
  ctx.shadowBlur = width * 2.5;
  ctx.strokeStyle = hexToRgba(color, alpha);
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

type RoughnessOptions = {
  seed?: number;
  size?: number;
  base?: number;
  variation?: number;
};

/** Subtle grayscale variation so the polished stone does not look uniform. */
export function createRoughnessTexture({
  seed = 1,
  size = 512,
  base = 120,
  variation = 55,
}: RoughnessOptions = {}): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const random = mulberry32(seed);

  ctx.fillStyle = `rgb(${base}, ${base}, ${base})`;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 120; i += 1) {
    const x = random() * size;
    const y = random() * size;
    const radius = size * (0.02 + random() * 0.12);
    const tone = Math.round(base + (random() - 0.5) * variation * 1.6);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

    gradient.addColorStop(0, `rgba(${tone}, ${tone}, ${tone}, 0.35)`);
    gradient.addColorStop(1, `rgba(${tone}, ${tone}, ${tone}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const image = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const noise = (random() - 0.5) * variation;
    image.data[i] += noise;
    image.data[i + 1] += noise;
    image.data[i + 2] += noise;
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return texture;
}
