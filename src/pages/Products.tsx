import React from 'react';

// --- Data ---
const PRODUCT_CARDS = [
  { title: 'Core Shield', status: 'In Development', desc: 'Next-generation framework defense.' },
  { title: 'Protocol Zero', status: 'Coming Soon', desc: 'Zero-trust architecture solutions.' },
  { title: 'Apex Analytics', status: 'Check Back Later', desc: 'AI-driven threat intelligence.' },
] as const;

// --- Product Card Subcomponent ---
interface ProductCardProps {
  title: string;
  status: string;
  desc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, status, desc }) => (
  <div className="glass p-8 md:p-10 rounded-3xl border border-white/60 shadow-[0_20px_50px_rgba(59,130,62,0.1)] backdrop-blur-3xl bg-[#f8fbee]/70 flex flex-col h-full transform transition-all hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(59,130,62,0.15)] duration-300">
    <div className="flex-1">
      <h3 className="text-2xl font-bold text-[#1a231b] mb-3">{title}</h3>
      <p className="text-[#2c3e2e] leading-relaxed mb-8">{desc}</p>
    </div>
    <div className="inline-flex items-center justify-center px-4 py-2 mt-auto rounded-full bg-[#3B823E]/10 border border-[#3B823E]/20 text-[#3B823E] font-semibold text-sm w-max backdrop-blur-md">
      <span className="w-2 h-2 rounded-full bg-[#3B823E] mr-2 animate-pulse" />
      {status}
    </div>
  </div>
);

// --- Products Page ---
const Products: React.FC = () => {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center pt-48 lg:pt-56 pb-24 px-4 bg-transparent animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-[#1a231b] mb-6 drop-shadow-sm">
          Our Products
        </h2>
        <p className="text-[#2c3e2e] text-lg md:text-xl font-medium">
          The platinum standard of cybersecurity is currently in development. Check back later for early access to our exclusive tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {PRODUCT_CARDS.map((card, idx) => (
          <ProductCard key={idx} title={card.title} status={card.status} desc={card.desc} />
        ))}
      </div>
    </div>
  );
};

export default Products;
