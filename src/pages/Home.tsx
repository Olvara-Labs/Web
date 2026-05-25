import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
