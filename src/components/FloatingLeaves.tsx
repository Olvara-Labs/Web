import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FloatingLeaves: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 block">
      {/* Left Botanical Element */}
      <motion.div
        className="absolute top-[-5vh] left-[-30vw] md:left-[-15vw] w-[800px] md:w-[1200px] opacity-95 flex flex-col items-center z-10"
        style={{ y: y1 }}
      >
        <div className="relative w-full h-full flex flex-col items-center">
          <img 
            src="/nano-banana-leaf-transparet.png" 
            alt="Transparent Photorealistic Banana Leaf Left" 
            className="w-full h-auto object-contain mix-blend-multiply"
            style={{ transform: 'scaleX(-1) rotate(15deg)' }}
          />
        </div>
      </motion.div>

      {/* Right Botanical Element */}
      <motion.div
        className="absolute top-[30vh] md:top-[35vh] right-[-25vw] md:right-[-15vw] translate-x-[25%] w-[750px] md:w-[1000px] opacity-95 z-10"
        style={{ y: y2 }}
      >
        <div className="relative w-full h-full flex flex-col items-center">
          <img 
            src="/user-right-leaf.png" 
            alt="User Provided Leaf Right" 
            className="w-full h-auto object-contain mix-blend-multiply"
            style={{ transform: 'rotate(-12deg)' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingLeaves;
