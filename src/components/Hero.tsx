import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { NavContext } from '../app-shell';

const Hero: React.FC = () => {
  const { navigate } = useContext(NavContext);

  return (
    <main className="page-shell relative flex min-h-screen flex-col items-center justify-center pt-24 text-center">
      <div className="hero-brand-glow" aria-hidden="true" />
      <div className="hero-visual-wrap" aria-hidden="true">
        <img
          src="/brand-mark.png"
          alt=""
          className="hero-visual"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-5xl flex-col items-center"
      >
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.05em] text-[color:var(--color-text)] md:text-7xl lg:text-[5.4rem]">
          Stick around, we&apos;re building something secure.
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[color:var(--color-text-muted)] md:text-xl">
          A next-generation cybersecurity platform for the modern enterprise.
        </p>

        <button
          type="button"
          onClick={() => navigate('/products')}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-primary)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_32px_rgba(16,82,51,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--color-primary-dark)]"
        >
          Explore Our Tools
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </main>
  );
};

export default Hero;
