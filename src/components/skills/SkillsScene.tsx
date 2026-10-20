"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function Rig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += 0.004;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      y * 0.2,
      0.04,
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      x * 0.35,
      0.04,
    );
  });

const PARTICLE_COUNT = 160;
const PARTICLE_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Deterministic pseudo-random distribution
    const seed1 = Math.sin(i * 12.9898) * 43758.5453;
    const seed2 = Math.sin(i * 78.233) * 43758.5453;
    const rand1 = seed1 - Math.floor(seed1);
    const rand2 = seed2 - Math.floor(seed2);

    const r = 1.6 + rand1 * 0.8;
    const t = rand2 * Math.PI * 2;
    const p = Math.acos(2 * rand1 - 1);
    arr[i * 3] = r * Math.sin(p) * Math.cos(t);
    arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
    arr[i * 3 + 2] = r * Math.cos(p);
  }
  return arr;
})();

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#f2efe8"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[PARTICLE_POSITIONS, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e8875a" size={0.025} sizeAttenuation />
      </points>
    </group>
  );
}

export default function SkillsScene() {
  const [ok, setOk] = useState(true);

  if (!ok) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        if (!gl.getContext()) setOk(false);
      }}
    >
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[2.4, 1.6, 3]} intensity={18} color="#e8875a" />
      <Rig />
    </Canvas>
  );
}
