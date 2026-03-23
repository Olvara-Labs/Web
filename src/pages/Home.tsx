import React from 'react';
import Hero from '../components/Hero';
import FloatingLeaves from '../components/FloatingLeaves';

const Home: React.FC = () => {
  return (
    <>
      <FloatingLeaves />
      <Hero />
    </>
  );
};

export default Home;
