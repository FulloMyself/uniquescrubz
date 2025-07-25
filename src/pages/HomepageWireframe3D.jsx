// src/pages/HomepageWireframe3D.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion-3d";
import MallModel from "./MallModel";
import SpinningModel from "../components/SpinningModel";
import Footer from "../components/Footer";

// ✅ Interactive Shop Blocks
function InteractiveBlock({ position, color, text, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.group
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: position[1], opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      position={[position[0], 0, position[2]]}
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
            className="font-bold text-black"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            {text}
          </div>
        </Html>
      </mesh>
    </motion.group>
  );
}

export default function HomepageWireframe3D() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <Canvas
        className="absolute inset-0"
        shadows
        camera={{ position: [0, 5, 15], fov: 50 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[5, 10, 5]} intensity={0.8} />
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

        {/* Mall Model */}
        <MallModel />

        {/* Interactive Blocks */}
        <MallModel>
          <InteractiveBlock
            position={[-6, 0, 0]}
            color="skyblue"
            text="Shop"
            onClick={() => navigate("/shop")}
          />
          <SpinningModel center={[-6, 0, 0]} color="skyblue" />

          <InteractiveBlock
            position={[0, 0, 0]}
            color="gold"
            text="Gallery"
            onClick={() => navigate("/manufacturing")}
          />
          <SpinningModel center={[0, 0, 0]} color="gold" />

          <InteractiveBlock
            position={[6, 0, 0]}
            color="purple"
            text="Events"
            onClick={() => navigate("/events")}
          />
          <SpinningModel center={[6, 0, 0]} color="purple" />

          <InteractiveBlock
            position={[-3, 0, -8]}
            color="pink"
            text="Gifts"
            onClick={() => navigate("/corporate-gifts")}
          />
          <SpinningModel center={[-3, 0, -8]} color="pink" />

          <InteractiveBlock
            position={[3, 0, -8]}
            color="green"
            text="About Us"
            onClick={() => navigate("/about")}
          />
          <SpinningModel center={[3, 0, -8]} color="green" />
        </MallModel>

        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          maxDistance={20}
          minDistance={5}
          enablePan={false}
        />
      </Canvas>

      {/* Transparent Overlay Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-black/70">
        <Footer />
      </div>
    </div>
  );
}
