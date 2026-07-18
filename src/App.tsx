import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import WhatIDo from './components/sections/WhatIDo';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Spotlight from './components/ui/Spotlight';
import Preloader from './components/ui/Preloader';
import GamifiedCursor from './components/ui/GamifiedCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-bgDarker text-white font-sans selection:bg-accent/30 selection:text-white antialiased min-h-screen">
      <GamifiedCursor />
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <Spotlight radius={500} glowColor="rgba(139, 92, 246, 0.08)" className="w-full h-full min-h-screen">
          <Header />
          <main>
            <Hero />
            <About />
            <WhatIDo />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </Spotlight>
      )}
    </div>
  );
}
