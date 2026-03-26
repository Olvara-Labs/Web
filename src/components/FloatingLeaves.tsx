import React from 'react';

const FloatingLeaves: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">

      {/* Left Botanical Element
          The image has its leaf content on the RIGHT portion of a wide canvas.
          We anchor to left:0 and shift the whole canvas left by ~55% so the
          leaf is half-visible on the left screen edge. No scaleX flip needed. */}
      <div
        className="absolute left-0 top-[55vh] md:top-[5vh]"
        style={{
          width: 'min(130vw, 920px)',
          transform: 'translateX(-65%)',
        }}
      >
        <img
          src="/nano-banana-leaf-transparet.png"
          alt="Botanical leaf left"
          className="w-full h-auto object-contain mix-blend-multiply"
          style={{ transform: 'rotate(15deg)' }}
        />
      </div>

      {/* Right Botanical Element
          Stem is on the right side of the image naturally.
          Anchor to right:0, push 40% of width off the right edge. */}
      <div
        className="absolute right-0 top-[68vh] md:top-[35vh]"
        style={{
          width: 'min(120vw, 850px)',
          transform: 'translateX(40%)',
        }}
      >
        <img
          src="/user-right-leaf.png"
          alt="Botanical leaf right"
          className="w-full h-auto object-contain mix-blend-multiply"
          style={{ transform: 'rotate(-12deg)' }}
        />
      </div>
    </div>
  );
};

export default FloatingLeaves;
