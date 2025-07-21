// MallModel.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function MallModel({ children }) {
  const signRef = useRef();
  const lightRef = useRef();

  // 🔁 Animate the mall banner rotation & light pulse
  useFrame((state, delta) => {
    if (signRef.current) {
      signRef.current.rotation.y += delta * 0.3;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group>
      {/* Floor */}
      <mesh receiveShadow position={[0, -1.5, 0]}>
        <boxGeometry args={[30, 1, 30]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Walls */}
      <group>
        <mesh position={[0, 4, -15]}>
          <boxGeometry args={[30, 10, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-15, 4, 0]}>
          <boxGeometry args={[1, 10, 30]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[15, 4, 0]}>
          <boxGeometry args={[1, 10, 30]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 9, 0]}>
          <boxGeometry args={[30, 1, 30]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* Rotating Banner Sign */}
      <mesh ref={signRef} position={[0, 8.5, -14.5]}>
        <boxGeometry args={[10, 1, 0.2]} />
        <meshStandardMaterial color="gold" />
      </mesh>

      {/* Columns */}
      <group>
        {[
          [-13, 0, -13],
          [13, 0, -13],
          [-13, 0, 13],
          [13, 0, 13],
        ].map((pos, i) => (
          <mesh key={`col-${i}`} position={[pos[0], 1, pos[2]]}>
            <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        ))}
      </group>

      {/* Planters */}
      <group>
        {[
          [-10, -1.2, 8],
          [10, -1.2, 8],
        ].map((pos, i) => (
          <mesh key={`plant-${i}`} position={pos}>
            <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
            <meshStandardMaterial color="forestgreen" />
          </mesh>
        ))}
      </group>

      {/* Benches */}
      <group>
        {[-8, 8].map((x, i) => (
          <mesh key={`bench-${i}`} position={[x, -1.2, -5]}>
            <boxGeometry args={[3, 0.3, 1]} />
            <meshStandardMaterial color="#664422" />
          </mesh>
        ))}
      </group>

      {/* Ceiling Light */}
      <pointLight
        ref={lightRef}
        position={[0, 8.8, 0]}
        intensity={1}
        color="white"
        castShadow
      />

      {/* Children elements (interactive blocks, people, etc.) */}
      <group>{children}</group>
    </group>
  );
}
