import React from 'react';
import Footer from '../components/Footer';
import { ABOUT_PILLARS } from '../site-content';

const About: React.FC = () => {
  return (
    <div className="relative">
      <section className="page-shell pt-36 md:pt-44">
        <div
          className="mx-auto max-w-3xl text-center"
          style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0s forwards' }}
        >
          <span className="eyebrow mx-auto">About</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[color:var(--color-text)] md:text-6xl">
            About Olvara Labs
          </h1>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Building modern cybersecurity tools with a cleaner and more deliberate public presence.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-6 py-14 md:grid-cols-3">
        {ABOUT_PILLARS.map((pillar, index) => (
          <article
            key={pillar.title}
            className="panel px-6 py-6"
            style={{ opacity: 0, animation: `fadeInUp 0.65s ease-out ${0.1 + index * 0.12}s forwards` }}
          >
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--color-text)]">{pillar.title}</h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{pillar.description}</p>
          </article>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default About;
