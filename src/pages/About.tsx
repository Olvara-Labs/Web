import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center, Environment, Float } from '@react-three/drei';

const About: React.FC = () => {
  return (
    <div className="relative w-full min-h-[200vh] bg-transparent overflow-hidden">
      {/* 3D Canvas Background Section */}
      {/* 
        This div is fixed top-0, meaning it will stay locked to the screen.
        As the user scrolls down the 200vh page, the content card below
        will slide up OVER this canvas, creating a cardboard-like sliding reveal.
      */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
          <ambientLight intensity={0.5} />
          {/* Spotlights for dramatic platinum reflection */}
          <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#a1e6b3" />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 0.5, 0]}>
              {/* Olvara - Green Material */}
              <Center position={[0, 1.4, 0]}>
                <Text3D
                  font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
                  size={2.2}
                  height={0.4}
                  curveSegments={24}
                  bevelEnabled
                  bevelThickness={0.15}
                  bevelSize={0.08}
                  bevelOffset={0}
                  bevelSegments={8}
                >
                  Olvara
                  {/* Metallic Green Material */}
                  <meshStandardMaterial 
                    color="#3B823E" 
                    metalness={0.7} 
                    roughness={0.2} 
                    envMapIntensity={2.0}
                  />
                </Text3D>
              </Center>

              {/* Labs - Platinum Material */}
              <Center position={[0, -1.4, 0]}>
                <Text3D
                  font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
                  size={2.2}
                  height={0.4}
                  curveSegments={24}
                  bevelEnabled
                  bevelThickness={0.15}
                  bevelSize={0.08}
                  bevelOffset={0}
                  bevelSegments={8}
                >
                  Labs
                  {/* Platinum Material */}
                  <meshStandardMaterial 
                    color="#f0f0f0" 
                    metalness={1.0} 
                    roughness={0.15} 
                    envMapIntensity={2.5}
                  />
                </Text3D>
              </Center>
            </group>
          </Float>
          
          {/* High resolution environment mapping for metallic reflections */}
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* Content that the user scrolls down to read */}
      <div className="relative z-10 w-full pt-[100vh] pb-32 px-4 flex flex-col items-center">
        {/* Glassmorphic "cardboard" card that slides over the fixed text */}
        <div className="max-w-4xl glass p-12 md:p-16 rounded-[40px] text-center shadow-[0_30px_80px_rgba(59,130,62,0.15)] border border-white/60 backdrop-blur-3xl bg-white/40">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#1a231b] mb-8">
            The Platinum Standard
          </h2>
          <p className="text-lg md:text-xl text-[#2c3e2e] leading-relaxed mb-6 font-medium">
            We are engineering resilient foundations in the cybersecurity landscape. Our solutions are designed to be as enduring and unyielding as the metal that inspired them.
          </p>
          <p className="text-lg md:text-xl text-[#2c3e2e] leading-relaxed font-medium">
            (Text content reserved for future expansion)
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
