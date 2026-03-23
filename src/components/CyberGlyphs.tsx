import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Generate random positions for the glyphs
const generateGlyphs = (count: number) => {
  const glyphStyles = ["1010101", "# # #", "</>", "01", "{ }"];
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    text: glyphStyles[Math.floor(Math.random() * glyphStyles.length)],
    x: Math.random() * 100, // percentage
    y: Math.random() * 100,
    duration: 5 + Math.random() * 6,
    delay: Math.random() * 3,
    size: 16 + Math.random() * 16,
  }));
};

const CyberGlyphs: React.FC = () => {
  const [glyphs, setGlyphs] = useState<any[]>([]);

  useEffect(() => {
    // Generate them only on the client to avoid hydration mismatch
    setGlyphs(generateGlyphs(15));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {glyphs.map((g) => (
        <motion.div
          key={g.id}
          className="absolute font-mono text-[var(--color-olvara-5)] mix-blend-multiply"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            fontSize: `${g.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: g.duration,
            repeat: Infinity,
            delay: g.delay,
            ease: "easeInOut",
          }}
        >
          {g.text}
        </motion.div>
      ))}
    </div>
  );
};

export default CyberGlyphs;
