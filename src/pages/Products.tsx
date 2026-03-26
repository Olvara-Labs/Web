import React from 'react';
import Footer from '../components/Footer';

// --- Data ---
const PRODUCT_CARDS = [
  {
    title: 'TrackShred',
    status: 'In Development',
    desc: 'The next generation of file deletion and data leak prevention, ensuring your digital footprint is erased with platinum precision.',
    accentFrom: '#3B823E',
    accentTo: '#7DCD85',
  },
  {
    title: 'Moss Keys',
    status: 'In Development',
    desc: 'A natural, next-generation password manager that feels alive, combining biometric beauty with impenetrable security.',
    accentFrom: '#2C5E2E',
    accentTo: '#80AB82',
  },
  {
    title: 'Mantis',
    status: 'Coming Soon',
    desc: 'A surgical-grade vulnerability scanner designed for the modern enterprise, exposing threats before they manifest.',
    accentFrom: '#1a231b',
    accentTo: '#3B823E',
  },
] as const;

// --- Product Card Subcomponent ---
interface ProductCardProps {
  title: string;
  status: string;
  desc: string;
  accentFrom: string;
  accentTo: string;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, status, desc, accentFrom, accentTo, index }) => (
  <div
    className="glass p-8 md:p-10 rounded-3xl border border-white/60 backdrop-blur-3xl bg-[#f8fbee]/70 flex flex-col h-full 
      transition-all duration-500 ease-out
      hover:-translate-y-3 hover:shadow-[0_32px_64px_rgba(59,130,62,0.2)] hover:border-[#3B823E]/30
      relative overflow-hidden"
    style={{
      opacity: 0,
      animation: `fadeInUp 0.8s ease-out ${0.15 + index * 0.15}s forwards`,
    }}
  >
    {/* Gradient top accent bar */}
    <div
      className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
      style={{ background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }}
    />

    <div className="flex-1">
      <h3 className="text-2xl font-bold text-[#1a231b] mb-3 tracking-tight">{title}</h3>
      <p className="text-[#2c3e2e] leading-relaxed mb-8">{desc}</p>
    </div>
    <div className="inline-flex items-center justify-center px-4 py-2 mt-auto rounded-full bg-[#3B823E]/10 border border-[#3B823E]/20 text-[#3B823E] font-semibold text-sm w-max backdrop-blur-md">
      <span
        className="w-2 h-2 rounded-full bg-[#3B823E] mr-2"
        style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
      />
      {status}
    </div>
  </div>
);

// --- Products Page ---
const Products: React.FC = () => {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center pt-48 lg:pt-56 pb-24 px-4 bg-transparent">
      <div
        className="text-center max-w-3xl mb-16"
        style={{ opacity: 0, animation: 'fadeInUp 0.8s ease-out 0s forwards' }}
      >
        <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#3B823E]/70 mb-4 block">
          ✦ Product Lineup
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-[#1a231b] mb-6 drop-shadow-sm">
          Our Products
        </h2>
        <p className="text-[#2c3e2e] text-lg md:text-xl font-medium">
          The platinum standard of cybersecurity is currently in development. Check back later for early access to our exclusive tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
        {PRODUCT_CARDS.map((card, idx) => (
          <ProductCard
            key={idx}
            index={idx}
            title={card.title}
            status={card.status}
            desc={card.desc}
            accentFrom={card.accentFrom}
            accentTo={card.accentTo}
          />
        ))}
      </div>

      <div className="w-full mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default Products;
