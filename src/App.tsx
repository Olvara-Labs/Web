import React, { useState, useEffect, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';

// eslint-disable-next-line react-refresh/only-export-components
export const NavContext = createContext({
  activePath: '#home',
  navigate: (path: string, x: number, y: number) => {
    void path;
    void x;
    void y;
  }
});

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [clickOrigin, setClickOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleHashChange = () => {
      // If manual browser nav, snap directly.
      setCurrentPath(window.location.hash || '#home');
      setNextPath(null);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string, x: number, y: number) => {
    if (path === currentPath || path === nextPath) return;
    setClickOrigin({ x, y });
    setNextPath(path);
    window.history.pushState(null, '', path);
  };

  const activePath = nextPath || currentPath;

  const getPageComponent = (path: string) => {
    switch(path) {
      case '#products': return <Products />;
      case '#about': return <About />;
      case '#home':
      default: return <Home />;
    }
  };

  return (
    <NavContext.Provider value={{ activePath, navigate }}>
      {/* 
        This global wrapper spans the viewport. Note: index.css body retains the background,
        but the transitioning layer also duplicates it to cleanly cover old pages.
      */}
      <div className="relative min-h-screen text-[#1a231b] overflow-x-hidden selection:bg-[#3B823E] selection:text-[var(--color-background)]">
        
        {/* Navbar sits on top layer */}
        <div className="relative z-50">
          <Navbar />
        </div>
        
        {/* Base Layer: Currently active page */}
        <div className="absolute inset-0 z-0">
          {getPageComponent(currentPath)}
        </div>

        {/* Transition Layer: Next page animating in over the top */}
        <AnimatePresence>
          {nextPath && (
            <>
              {/* Expanding Green Ring (the "border" effect) */}
              <motion.div
                className="fixed z-20 pointer-events-none rounded-full"
                style={{
                  border: '2px solid #3B823E',
                  boxShadow: '0 0 30px rgba(59, 130, 62, 0.4), inset 0 0 15px rgba(59, 130, 62, 0.2)',
                  x: '-50%', // Centers the div on the coordinate
                  y: '-50%'
                }}
                initial={{ 
                  left: clickOrigin.x,
                  top: clickOrigin.y,
                  width: 0, 
                  height: 0 
                }}
                animate={{ 
                  width: 5000, 
                  height: 5000 
                }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              />

              <motion.div
                key={nextPath}
                className="absolute inset-0 z-10 w-full min-h-screen"
                // Duplicate the global gradient here to visually block the base layer
                style={{ background: 'radial-gradient(circle at center, #e8f2cc 0%, #cce080 100%)', backgroundAttachment: 'fixed' }}
                initial={{ 
                  clipPath: `circle(0px at ${clickOrigin.x}px ${clickOrigin.y}px)` 
                }}
                animate={{ 
                  clipPath: `circle(2500px at ${clickOrigin.x}px ${clickOrigin.y}px)` 
                }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} 
                onAnimationComplete={() => {
                  setCurrentPath(nextPath);
                  setNextPath(null);
                }}
              >
                {getPageComponent(nextPath)}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </NavContext.Provider>
  );
};

export default App;
