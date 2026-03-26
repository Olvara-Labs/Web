import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { NavContext } from '../App';

const Navbar: React.FC = () => {
  const { activePath, navigate } = useContext(NavContext);

  const navLinks = [
    { id: '/', label: 'Home' },
    { id: '/products', label: 'Products' },
    { id: '/about', label: 'About' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path, e.clientX, e.clientY);
  };

  return (
    <div
      className="fixed top-8 inset-x-0 mx-auto w-[92%] md:w-[80%] lg:w-[65%] z-50 flex flex-col items-center gap-4"
      style={{ animation: 'slideDown 0.8s ease-out 0.2s both' }}
    >

      {/* Main Bar */}
      <nav className="w-full glass rounded-2xl md:rounded-full px-4 md:px-8 py-2 md:py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 md:gap-0">

        {/* Mobile Row 1: Logo + CTA */}
        <div className="flex items-center justify-between md:contents">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="font-bold uppercase flex flex-col justify-center leading-none z-10 md:flex-[1] transition-opacity duration-200 hover:opacity-80"
          >
            <span className="text-sm md:text-lg tracking-widest text-[#3B823E]">Olvara</span>
            <span className="text-[9px] md:text-xs tracking-[0.2em] text-[#1a231b] opacity-80 mt-[-2px]">Labs</span>
          </a>

          {/* CTA — mobile only */}
          <button className="md:hidden bg-[#3B823E] text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#2C5E2E] hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-[0_8px_16px_rgba(59,130,62,0.3)] cursor-pointer">
            Join Us
          </button>
        </div>

        {/* Nav Links (mobile Row 2 / desktop center) */}
        <div className="flex relative text-[10px] md:text-sm font-bold tracking-widest uppercase justify-center items-center gap-0 md:flex-[2]">
          {navLinks.map((link) => {
            const isActive = activePath === link.id;
            return (
              <a
                key={link.id}
                href={link.id}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-3 py-1.5 md:px-6 md:py-2 rounded-full transition-colors duration-300 z-10 ${
                  isActive ? 'text-white' : 'text-[#3B823E] hover:text-[#1a231b]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#3B823E] rounded-full shadow-[0_4px_12px_rgba(59,130,62,0.4)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* CTA — desktop only */}
        <div className="hidden md:flex flex-[1] justify-end items-center z-10">
          <button className="bg-[#3B823E] text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#2C5E2E] hover:scale-105 hover:shadow-[0_12px_24px_rgba(59,130,62,0.4)] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_16px_rgba(59,130,62,0.3)] cursor-pointer">
            Join Us
          </button>
        </div>
      </nav>

      {/* Sub Pill — shimmer effect */}
      <div
        className="glass rounded-full px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs font-bold tracking-widest uppercase inline-block"
        style={{
          background: 'linear-gradient(90deg, rgba(119,132,114,0.8) 0%, rgba(59,130,62,0.9) 50%, rgba(119,132,114,0.8) 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 3s linear infinite',
        }}
      >
        Coming Soon
      </div>
    </div>
  );
};

export default Navbar;
