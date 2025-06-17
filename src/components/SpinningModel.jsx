// SpinningModel.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SpinningModel({ center = [0, 0, 0], radius = 4, speed = 1, y = 2, color = "hotpink" }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = center[0] + Math.cos(t) * radius;
    ref.current.position.z = center[2] + Math.sin(t) * radius;
    ref.current.rotation.y = t;
  });

  return (
    <mesh ref={ref} position={[0, y, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
