// src/pages/HomepageWireframe.jsx
import React from "react";
import { useEffect, useState } from "react";
import HomepageWireframe3D from "./HomepageWireframe3D"; 
import HomepageWireframe2D from "./HomepageWireframe2D";

export default function HomepageWireframe() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full">
      {isMobile ? <HomepageWireframe2D /> : <HomepageWireframe3D />}
    </div>
  );
}
