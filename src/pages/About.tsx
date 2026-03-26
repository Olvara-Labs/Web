import React from 'react';
import Footer from '../components/Footer';

// --- Data ---
const TIMELINE_ITEMS = [
  { year: '2024', title: 'Foundation', desc: 'Establishing the core architectural paradigms of Olvara Labs.' },
  { year: '2025', title: 'Expansion', desc: 'Scaling our cybersecurity protocols globally across enterprise networks.' },
  { year: '2026', title: 'Platinum Standard', desc: 'Pioneering resilient, high-fidelity security frameworks.' },
] as const;



// --- Timeline Item Subcomponent ---
interface TimelineItemProps {
  year: string;
  title: string;
  desc: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, desc, index }) => (
  <div
    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8"
    style={{
      opacity: 0,
      animation: `fadeInUp 0.7s ease-out ${0.1 + index * 0.2}s forwards`,
    }}
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#e8f2cc] glass shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow md:mx-auto z-10">
      <div
        className="w-3 h-3 bg-[#3B823E] rounded-full"
        style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
      />
    </div>
    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-[#f8fbee]/90 backdrop-blur-3xl text-left transition-all duration-300 hover:shadow-[0_16px_40px_rgba(59,130,62,0.12)] hover:-translate-y-1">
      <span className="font-bold text-[#3B823E] tracking-widest text-sm uppercase">{year}</span>
      <h3 className="font-extrabold text-[#1a231b] text-xl mt-1 mb-2">{title}</h3>
      <p className="text-[#2c3e2e] leading-snug">{desc}</p>
    </div>
  </div>
);

// --- About Page ---
const About: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-transparent">
      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center pt-48 lg:pt-56 px-4">
        
        {/* Section Label */}
        <div
          className="text-center mb-12"
          style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0s forwards' }}
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#3B823E]/70 mb-3 block">
            ✦ Our Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-[#1a231b] drop-shadow-sm">
            About Olvara Labs
          </h2>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-4xl flex flex-col relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/50 before:to-transparent mb-24 z-10">
          {TIMELINE_ITEMS.map((item, idx) => (
            <TimelineItem key={idx} year={item.year} title={item.title} desc={item.desc} index={idx} />
          ))}
        </div>

        {/* Glassmorphic Card */}
        <div
          className="w-full max-w-4xl glass p-12 md:p-16 rounded-[40px] text-center shadow-[0_30px_80px_rgba(59,130,62,0.15)] border border-white/60 backdrop-blur-3xl bg-[#f8fbee]/80 z-10 mb-24 transition-all duration-500 hover:shadow-[0_40px_100px_rgba(59,130,62,0.2)]"
          style={{ opacity: 0, animation: 'fadeInUp 0.8s ease-out 0.6s forwards' }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] mb-8 bg-gradient-to-r from-[#1a231b] via-[#3B823E] to-[#1a231b] bg-clip-text text-transparent">
            The Platinum Standard
          </h2>
          <p className="text-lg md:text-xl text-[#2c3e2e] leading-relaxed font-medium">
            We are engineering resilient foundations in the cybersecurity landscape. Our solutions are designed to be as enduring and unyielding as the metal that inspired them.
          </p>
        </div>
        
      </div>

      <Footer />
    </div>
  );
};

export default About;
