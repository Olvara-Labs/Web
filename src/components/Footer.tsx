import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-shell relative z-10 pb-8">
      <div className="panel flex flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-7">
        <div className="flex items-center gap-3">
          <img
            src="/brand-mark.png"
            alt="Olvara Labs"
            className="h-10 w-10 rounded-full border border-white/70 bg-white/80 object-cover"
          />
          <div className="leading-none">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--color-primary)]">Olvara</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.26em] text-[color:var(--color-text-muted)]">Labs</p>
          </div>
        </div>

        <p className="text-sm leading-6 text-[color:var(--color-text-muted)]">
          © 2024 – {currentYear} Olvara Labs. Compact public surface, deliberate disclosure.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/company/olvaralabs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            aria-label="Olvara Labs LinkedIn"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 text-[color:var(--color-primary)]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
