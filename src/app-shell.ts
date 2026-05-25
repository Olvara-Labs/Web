import { createContext } from 'react';

export const TRANSITION_DURATION = 0.48;
export const TRANSITION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const COLORS = {
  primary: '#1d7c49',
  primaryDark: '#105233',
  text: '#102418',
  textMuted: '#365243',
  gradientStart: '#f7faf5',
  gradientMiddle: '#e7f2e6',
  gradientEnd: '#d3ebd5',
  panel: 'rgba(255, 255, 255, 0.62)',
  panelStrong: 'rgba(255, 255, 255, 0.82)',
  border: 'rgba(16, 36, 24, 0.08)',
} as const;

export const NAV_LINKS = [
  { id: '/', label: 'Home' },
  { id: '/products', label: 'Products' },
  { id: '/about', label: 'About' },
] as const;

export type AppPath = (typeof NAV_LINKS)[number]['id'];

interface NavContextType {
  activePath: AppPath;
  navigate: (path: AppPath) => void;
}

const VALID_PATHS = new Set<AppPath>(NAV_LINKS.map((link) => link.id));

export function normalizePath(pathname: string): AppPath {
  if (!pathname || pathname === '/') return '/';

  const trimmed = pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  return VALID_PATHS.has(trimmed as AppPath) ? (trimmed as AppPath) : '/';
}

export const NavContext = createContext<NavContextType>({
  activePath: '/',
  navigate: () => {},
});
