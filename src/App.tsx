import React, { lazy, startTransition, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { NavContext, normalizePath, TRANSITION_DURATION, TRANSITION_EASE } from './app-shell';
import type { AppPath } from './app-shell';

const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));

const ROUTES: Record<AppPath, React.ReactNode> = {
  '/': <Home />,
  '/products': <Products />,
  '/about': <About />,
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<AppPath>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      startTransition(() => {
        setCurrentPath(normalizePath(window.location.pathname));
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (normalizePath(window.location.pathname) !== currentPath) {
      window.history.replaceState(null, '', currentPath);
    }

    window.scrollTo(0, 0);
  }, [currentPath]);

  const navigate = (path: AppPath) => {
    if (path === currentPath) return;

    window.history.pushState(null, '', path);
    startTransition(() => setCurrentPath(path));
  };

  return (
    <NavContext.Provider value={{ activePath: currentPath, navigate }}>
      <div className="relative min-h-screen overflow-x-hidden text-[color:var(--color-text)] selection:bg-[color:var(--color-primary)] selection:text-white">
        <div className="site-backdrop" aria-hidden="true">
          <div className="site-backdrop__grid" />
          <div className="site-backdrop__glow site-backdrop__glow--one" />
          <div className="site-backdrop__glow site-backdrop__glow--two" />
        </div>

        <div className="relative z-30">
          <Navbar />
        </div>

        <motion.div
          key={currentPath}
          className="relative z-10 min-h-screen"
          initial={{ opacity: 0.985 }}
          animate={{ opacity: 1 }}
          transition={{ duration: TRANSITION_DURATION * 0.55, ease: TRANSITION_EASE }}
        >
          <Suspense fallback={<div className="min-h-screen" />}>
            {ROUTES[currentPath]}
          </Suspense>
        </motion.div>
      </div>
    </NavContext.Provider>
  );
};

export default App;
