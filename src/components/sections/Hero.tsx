import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { FileText, ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 800], [0, -100]);
  const yBg2 = useTransform(scrollY, [0, 800], [0, 50]);
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0]);

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-36 pb-20 flex items-center justify-center overflow-hidden bg-bgDarker select-none"
    >
      {/* Background blobs */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            style={{ y: yBg1, opacity: opacityBg }}
            className="absolute top-1/4 left-[5%] w-96 h-96 rounded-full bg-accent/5 filter blur-[100px]"
          />
          <motion.div
            style={{ y: yBg2, opacity: opacityBg }}
            className="absolute bottom-1/4 right-[5%] w-[450px] h-[450px] rounded-full bg-accent-lime/5 filter blur-[120px]"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Badges & Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-8 flex flex-col justify-center text-left"
        >
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold tracking-widest text-accent-lime uppercase mb-8">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent-lime" />
              <span>Full Stack Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Huge Typographic Name */}
          <h1 className="font-display font-black tracking-tighter uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[90px] leading-[0.9] flex flex-col">
            <span className="text-white">Logeshwaran</span>
            <span className="text-transparent stroke-white [-webkit-text-stroke:1.5px_rgba(255,255,255,0.7)]">Selvam</span>
          </h1>
        </motion.div>

        {/* Right Side: Editorial Paragraph, CTAs & Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="lg:col-span-4 flex flex-col justify-between h-full text-left lg:text-right space-y-12 lg:space-y-20 mt-8 lg:mt-0"
        >
          {/* Paragraph */}
          <div>
            <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed lg:text-right">
              I build scalable web apps, enterprise software, and healthcare solutions. From AI-powered clinical platforms to real-time dashboards — I develop software that solves real-world problems.
            </p>
          </div>

          {/* Call-to-actions */}
          <div className="flex flex-col items-start lg:items-end gap-6">
            <div className="flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  onClick={handleProjectsClick}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent-dark shadow-md transition-all duration-300 group text-xs uppercase tracking-wider"
                >
                  View Portfolio
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="/Logeshwaran_resume.pdf"
                  download="Logeshwaran_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 text-xs uppercase tracking-wider"
                >
                  <FileText size={14} />
                  Download CV
                </a>
              </Magnetic>
            </div>

            {/* Socials Connection */}
            <div className="flex items-center gap-4 text-white/50 text-[10px] font-bold uppercase tracking-wider">
              <span className="opacity-40">Connect</span>
              <span className="opacity-15">|</span>
              <a href="mailto:logeshwarans159@gmail.com" className="hover:text-accent transition-colors">
                Email
              </a>
              <a href="https://linkedin.com/in/logeshwaran-selvam" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-2 flex lg:justify-end text-[10px] font-extrabold text-white/20 uppercase tracking-widest cursor-pointer hover:text-white/60 transition-colors" onClick={handlePortfolioClick}>
            Scroll
          </div>
        </motion.div>

      </div>
    </section>
  );
}
