// HomepageWireframe.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function InteractiveBlock({ position, color, text, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={color} />
      <Html center>
        <div
          className={`font-bold ${
            color === "skyblue" ? "text-white" : "text-black"
          }`}
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
}

export default function HomepageWireframe({ onEnterMall }) {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <InteractiveBlock
          position={[-6, 0, 0]}
          color="skyblue"
          text="Scrubs & Uniforms"
          onClick={() => navigate("/shop")}
        />

        <InteractiveBlock
          position={[0, 0, 0]}
          color="gold"
          text="Manufacturing"
          onClick={() => navigate("/manufacturing")}
        />

        <InteractiveBlock
          position={[6, 0, 0]}
          color="lightgreen"
          text="Home Décor"
          onClick={() => navigate("/home-decor")}
        />

        <InteractiveBlock
          position={[-3, 0, -8]}
          color="pink"
          text="Corporate Gifts"
          onClick={() => navigate("/corporate-gifts")}
        />

        <InteractiveBlock
          position={[3, 0, -8]}
          color="white"
          text="About Us"
          onClick={() => navigate("/about")}
        />

        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          maxDistance={20}
          minDistance={5}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
