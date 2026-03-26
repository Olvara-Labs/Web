import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { NavContext } from '../App';

const Hero: React.FC = () => {
  const { navigate } = useContext(NavContext);

  const handleCTA = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/products', e.clientX, e.clientY);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ambient glows — dual-layer for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B823E]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-8 px-4 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-[#1a231b] max-w-5xl tracking-tight">
            Stick around, we're building<br/>
            something <span className="neon-glitter">epic.</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#4a554a] text-lg md:text-xl font-medium max-w-2xl mt-2 tracking-wide"
          >
            A next-generation cybersecurity platform designed for the modern enterprise.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleCTA}
            className="mt-4 bg-[#3B823E] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase 
              hover:bg-[#2C5E2E] hover:scale-105 hover:shadow-[0_12px_32px_rgba(59,130,62,0.4)] 
              active:scale-[0.98] transition-all duration-300 cursor-pointer
              shadow-[0_8px_20px_rgba(59,130,62,0.3)]"
          >
            Explore Our Tools
          </motion.button>
        </motion.div>
      </div>

    </main>
  );
};

export default Hero;
