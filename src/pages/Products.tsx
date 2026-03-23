import React from 'react';

const Products: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] pt-32 px-4 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-[#1a231b] mb-6">
        Products
      </h1>
      <p className="text-lg md:text-xl text-[#2c3e2e] max-w-2xl text-center font-medium leading-relaxed">
        Our enterprise suite of next-generation cybersecurity tools is currently under development. Stick around for the reveal.
      </p>
    </div>
  );
};

export default Products;
