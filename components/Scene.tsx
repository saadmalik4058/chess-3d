"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

import {
  CAMERA_CONFIG,
  ORBIT_CONFIG,
  SCENE_COLORS,
} from "@/lib/scene-config";
import { useSceneStore } from "@/store/useSceneStore";

import { SceneOverlay } from "./SceneOverlay";
import { ScenePlaceholder } from "./ScenePlaceholder";
import { StudioEnvironment } from "./StudioEnvironment";
import { StudioFloor } from "./StudioFloor";
import { StudioLighting } from "./StudioLighting";

export function Scene() {
  const autoRotate = useSceneStore((state) => state.autoRotate);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#0a0b0f]">
      <Canvas
        shadows="soft"
        dpr={[1, 2]}
        camera={CAMERA_CONFIG}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.background = new THREE.Color(SCENE_COLORS.background);
          scene.fog = new THREE.Fog(SCENE_COLORS.fog, 22, 48);
        }}
      >
        <Suspense fallback={null}>
          <StudioEnvironment />
          <StudioLighting />

          <ScenePlaceholder />
          <StudioFloor />

          <OrbitControls
            makeDefault
            target={ORBIT_CONFIG.target}
            minDistance={ORBIT_CONFIG.minDistance}
            maxDistance={ORBIT_CONFIG.maxDistance}
            minPolarAngle={ORBIT_CONFIG.minPolarAngle}
            maxPolarAngle={ORBIT_CONFIG.maxPolarAngle}
            enablePan={ORBIT_CONFIG.enablePan}
            enableDamping={ORBIT_CONFIG.enableDamping}
            dampingFactor={ORBIT_CONFIG.dampingFactor}
            rotateSpeed={ORBIT_CONFIG.rotateSpeed}
            zoomSpeed={ORBIT_CONFIG.zoomSpeed}
            autoRotate={autoRotate}
            autoRotateSpeed={ORBIT_CONFIG.autoRotateSpeed}
          />

          <Preload all />
        </Suspense>
      </Canvas>

      <SceneOverlay />
    </div>
  );
}
