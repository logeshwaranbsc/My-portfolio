import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spotlight from '../ui/Spotlight';

const tabs = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'details', label: 'Details' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('experience');

  const tabContents = {
    experience: (
      <div className="space-y-4">
        <h4 className="text-xl font-display font-bold text-white">
          Full-Stack Software Engineer <span className="text-accent">@ Finstein Advisory LLP</span>
        </h4>
        <p className="text-sm text-accent-lime font-medium">July 2024 — June 2026</p>
        <p className="text-white/70 text-sm leading-relaxed">
          Worked on enterprise healthcare applications involving Angular, Vue.js, NestJS, ASP.NET, PostgreSQL, and AI-powered medical platforms. Spearheaded reusable frontends and scalable APIs, handled SAP workflows, image annotation modules, database optimization, and VAPT vulnerability patches.
        </p>
      </div>
    ),
    education: (
      <div className="space-y-4">
        <h4 className="text-xl font-display font-bold text-white">
          Bachelor of Computer Science with Cognitive Systems
        </h4>
        <p className="text-sm text-accent-lime font-medium">Sri Ramakrishna College of Arts and Science</p>
        <p className="text-white/70 text-sm leading-relaxed">
          Coimbatore, Tamil Nadu (2021 — 2024). Focused on software engineering, cognitive systems integration, database administration, and application development workflows.
        </p>
      </div>
    ),
    details: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <p className="text-white/40 uppercase tracking-wider text-xs">Email</p>
          <p className="text-white font-medium hover:text-accent transition-colors">
            <a href="mailto:logeshwarans159@gmail.com">logeshwarans159@gmail.com</a>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-white/40 uppercase tracking-wider text-xs">Phone</p>
          <p className="text-white font-medium hover:text-accent transition-colors">
            <a href="tel:+919342787758">+91 9342787758</a>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-white/40 uppercase tracking-wider text-xs">Location</p>
          <p className="text-white font-medium">Chennai, Tamil Nadu</p>
        </div>
        <div className="space-y-2">
          <p className="text-white/40 uppercase tracking-wider text-xs">LinkedIn</p>
          <p className="text-white font-medium hover:text-accent transition-colors">
            <a href="https://linkedin.com/in/logeshwaran-selvam" target="_blank" rel="noreferrer">
              logeshwaran-selvam
            </a>
          </p>
        </div>
      </div>
    ),
  };

  return (
    <section id="about" className="py-24 bg-bgDark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Bio */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-xs font-semibold text-accent-lime uppercase tracking-wider">
              01 / About Me
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Designing Scalable Tech with Passion
            </h2>
            <p className="text-white/70 font-sans leading-relaxed">
              I'm a passionate Full-Stack Software Engineer with experience in designing and developing modern web applications across healthcare and enterprise domains.
            </p>
            <p className="text-white/70 font-sans leading-relaxed">
              Over the past two years, I've built responsive frontend applications, scalable backend APIs, and data-driven dashboards while working with Angular, Vue.js, NestJS, ASP.NET, PostgreSQL, and MySQL.
            </p>
            <p className="text-white/70 font-sans leading-relaxed">
              I enjoy solving real-world problems, optimizing application performance, improving security, and writing clean, maintainable code. I thrive in Agile environments and love collaborating with cross-functional teams to deliver high-quality software.
            </p>
          </div>

          {/* Right Column: Tabbed Content Card with Spotlight */}
          <div className="lg:col-span-6 w-full">
            <Spotlight className="w-full rounded-2xl border border-white/5 bg-white/[0.01] p-8 shadow-2xl backdrop-blur-md">
              <div className="flex gap-4 border-b border-white/10 pb-4 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-accent-lime"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[180px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    {tabContents[activeTab as keyof typeof tabContents]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Spotlight>
          </div>
        </div>
      </div>
    </section>
  );
}
