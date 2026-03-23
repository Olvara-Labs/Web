import React, { useState, useEffect, createContext, lazy, Suspense, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));

// --- Shared Constants ---
export const TRANSITION_DURATION = 1.0;
export const TRANSITION_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
export const COLORS = {
  primary: '#3B823E',
  primaryDark: '#2C5E2E',
  text: '#1a231b',
  textMuted: '#2c3e2e',
  gradientStart: '#e8f2cc',
  gradientEnd: '#cce080',
} as const;

// --- Navigation Context ---
interface NavContextType {
  activePath: string;
  navigate: (path: string, x: number, y: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const NavContext = createContext<NavContextType>({
  activePath: '#home',
  navigate: () => {},
});

// --- App ---
const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickOrigin, setClickOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((path: string, x: number, y: number) => {
    if (path === currentPath) return;
    setClickOrigin({ x, y });
    setCurrentPath(path);
    setIsTransitioning(true);
    window.history.pushState(null, '', path);
  }, [currentPath]);

  const navContextValue = useMemo(() => ({
    activePath: currentPath,
    navigate,
  }), [currentPath, navigate]);

  const pageContent = useMemo(() => {
    switch (currentPath) {
      case '#products': return <Products />;
      case '#about': return <About />;
      case '#home':
      default: return <Home />;
    }
  }, [currentPath]);

  return (
    <NavContext.Provider value={navContextValue}>
      <div className="relative min-h-screen text-[#1a231b] overflow-x-hidden selection:bg-[#3B823E] selection:text-[var(--color-background)]">
        
        {/* Navbar sits on top layer */}
        <div className="relative z-50">
          <Navbar />
        </div>
        
        {/* Expanding Green Ring */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed z-20 pointer-events-none rounded-full"
              style={{
                border: `2px solid ${COLORS.primary}`,
                boxShadow: `0 0 30px rgba(59, 130, 62, 0.4), inset 0 0 15px rgba(59, 130, 62, 0.2)`,
                x: '-50%',
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
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: TRANSITION_DURATION, ease: TRANSITION_EASE }}
            />
          )}
        </AnimatePresence>
        
        {/* Page Transition Layer */}
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentPath}
            className="absolute inset-0 w-full min-h-screen"
            style={{ 
              background: `radial-gradient(circle at center, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`, 
              backgroundAttachment: 'fixed' 
            }}
            initial={{ 
              zIndex: 10,
              clipPath: `circle(0px at ${clickOrigin.x}px ${clickOrigin.y}px)` 
            }}
            animate={{ 
              zIndex: 10,
              clipPath: `circle(2500px at ${clickOrigin.x}px ${clickOrigin.y}px)` 
            }}
            exit={{ 
              zIndex: 0,
              clipPath: `circle(2500px at ${clickOrigin.x}px ${clickOrigin.y}px)`
            }}
            transition={{ duration: TRANSITION_DURATION, ease: TRANSITION_EASE }} 
            onAnimationComplete={() => {
              setIsTransitioning(false);
            }}
          >
            <Suspense fallback={null}>
              {pageContent}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
    </NavContext.Provider>
  );
};

export default App;
