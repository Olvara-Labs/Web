import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { NavContext } from '../App';

const Navbar: React.FC = () => {
  const { activePath, navigate } = useContext(NavContext);

  const navLinks = [
    { id: '#home', label: 'Home' },
    { id: '#products', label: 'Products' },
    { id: '#about', label: 'About' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path, e.clientX, e.clientY);
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[65%] z-50 flex flex-col items-center gap-4">
      {/* Main Bar */}
      <nav className="w-full glass rounded-full px-6 md:px-8 py-2 md:py-3 flex items-center justify-between">
        
        {/* Left - Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="font-bold uppercase flex-[0.5] md:flex-1 flex flex-col justify-center leading-none z-10">
          <span className="text-base md:text-lg tracking-widest text-[#3B823E]">Olvara</span>
          <span className="text-[10px] md:text-xs tracking-[0.2em] text-[#1a231b] opacity-80 mt-[-2px]">Labs</span>
        </a>
        
        {/* Center - Links with Animated Pill */}
        <div className="flex relative text-xs md:text-sm font-bold tracking-widest uppercase flex-[2] justify-center items-center bg-white/20 p-1.5 rounded-full border border-white/30 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activePath === link.id;
            return (
              <a
                key={link.id}
                href={link.id}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-4 py-2 md:px-6 md:py-2 rounded-full transition-colors duration-300 z-10 ${
                  isActive ? 'text-white' : 'text-[#3B823E] hover:text-[#1a231b]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#3B823E] rounded-full shadow-[0_4px_12px_rgba(59,130,62,0.4)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>
        
        {/* Right - Button */}
        <div className="flex-[0.5] md:flex-1 flex justify-end items-center z-10">
          <button className="bg-[#3B823E] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#2C5E2E] transition-colors shadow-[0_8px_16px_rgba(59,130,62,0.3)]">
            Join Us
          </button>
        </div>
      </nav>

      {/* Sub Pill */}
      <div className="glass rounded-full px-6 py-2 text-xs font-bold tracking-widest uppercase text-[var(--color-olvara-5)] inline-block">
        Coming Soon
      </div>
    </div>
  );
};

export default Navbar;
