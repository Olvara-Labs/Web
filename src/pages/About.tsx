import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center, Environment, Float } from '@react-three/drei';

const About: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-transparent">
      {/* 3D Canvas Background Section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#a1e6b3" />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 0.5, 0]}>
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
                  <meshStandardMaterial 
                    color="#3B823E" 
                    metalness={0.7} 
                    roughness={0.2} 
                    envMapIntensity={2.0}
                  />
                </Text3D>
              </Center>

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
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* Content Layer (z-10) */}
      <div className="relative z-10 w-full flex flex-col items-center pt-32 lg:pt-40 pb-[100vh] px-4">
        
        {/* Timeline Data */}
        <div className="w-full max-w-4xl flex flex-col relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/50 before:to-transparent mb-24 z-10">
          
          {[
            { year: '2024', title: 'Foundation', desc: 'Establishing the core architectural paradigms of Olvara Labs.' },
            { year: '2025', title: 'Expansion', desc: 'Scaling our cybersecurity protocols globally across enterprise networks.' },
            { year: '2026', title: 'Platinum Standard', desc: 'Pioneering resilient, high-fidelity security frameworks.' }
          ].map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#e8f2cc] glass shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow md:mx-auto z-10">
                <div className="w-3 h-3 bg-[#3B823E] rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-[#f8fbee]/90 backdrop-blur-3xl text-left">
                <span className="font-bold text-[#3B823E] tracking-widest text-sm uppercase">{item.year}</span>
                <h3 className="font-extrabold text-[#1a231b] text-xl mt-1 mb-2">{item.title}</h3>
                <p className="text-[#2c3e2e] leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Glassmorphic Card (Slides like Cardboard) */}
        <div className="w-full max-w-4xl glass p-12 md:p-16 rounded-[40px] text-center shadow-[0_30px_80px_rgba(59,130,62,0.15)] border border-white/60 backdrop-blur-3xl bg-[#f8fbee]/80 z-10 mb-24">
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
        
        {/* The bottom of the content container has 100vh of padding (pb-[100vh]). 
            When scrolling down through this empty space, the persistent 
            background 3D logo is fully revealed underneath the card! */}
      </div>
    </div>
  );
};

export default About;
