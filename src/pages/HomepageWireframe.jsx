// HomepageWireframe.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion-3d";
import MallModel from "./MallModel";
import SpinningModel from "../components/SpinningModel";

function InteractiveBlock({ position, color, text, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.group
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: position[1], opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      position={[position[0], 0, position[2]]} // ⬅️ horizontal positioning stays fixed
    >
      <mesh
        castShadow
        receiveShadow
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
              color === "skyblue" ? "text-black" : "text-black"
            }`}
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            {text}
          </div>
        </Html>
      </mesh>
    </motion.group>
  );
}

export default function HomepageWireframe({ onEnterMall }) {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 50 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={0.8}
        />
        <spotLight
          position={[0, 12, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Floating Title */}
        <Html position={[0, 6.5, -10]} center>
          <div className="text-center text-3xl md:text-5xl text-gold font-extrabold animate-pulse bg-black/80 p-4 rounded-xl">
            WELCOME TO UNIQUE SCRUBZ MALL
          </div>
        </Html>

        {/* Mall Environment with Interactive Blocks */}
<MallModel>
  <InteractiveBlock
    position={[-6, 0, 0]}
    color="skyblue"
    text="Scrubs & Uniforms"
    onClick={() => navigate("/shop")}
  />
  <SpinningModel center={[-6, 0, 0]} color="skyblue" />

  <InteractiveBlock
    position={[0, 0, 0]}
    color="gold"
    text="Manufacturing"
    onClick={() => navigate("/manufacturing")}
  />
  <SpinningModel center={[0, 0, 0]} color="gold" />

  <InteractiveBlock
    position={[6, 0, 0]}
    color="lightgreen"
    text="Home Décor"
    onClick={() => navigate("/home-decor")}
  />
  <SpinningModel center={[6, 0, 0]} color="lightgreen" />

  <InteractiveBlock
    position={[-3, 0, -8]}
    color="pink"
    text="Corporate Gifts"
    onClick={() => navigate("/corporate-gifts")}
  />
  <SpinningModel center={[-3, 0, -8]} color="pink" />

  <InteractiveBlock
    position={[3, 0, -8]}
    color="white"
    text="About Us"
    onClick={() => navigate("/about")}
  />
  <SpinningModel center={[3, 0, -8]} color="white" />
</MallModel>

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
