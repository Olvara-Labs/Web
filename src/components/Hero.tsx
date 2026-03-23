import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ambient glow - extremely subtle in light mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-8 px-4 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} /* Apple-like precise ease */
          className="flex flex-col items-center gap-6"
        >
          <h1 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-[#1a231b] max-w-5xl tracking-tight">
            Stick around, we're building<br/>
            something <span className="neon-glitter">epic.</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-[#4a554a] text-lg md:text-xl font-medium max-w-2xl mt-4"
          >
            A next-generation cybersecurity platform designed for the modern enterprise.
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
};

export default Hero;
