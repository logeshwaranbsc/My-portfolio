import React, { useState, useEffect } from 'react';
import Magnetic from '../ui/Magnetic';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            id: item.href.substring(1),
            top: rect.top + window.scrollY - 180,
            bottom: rect.bottom + window.scrollY - 180,
          };
        }
        return null;
      }).filter(Boolean);

      const scrollPos = window.scrollY;
      const current = sections.find(
        (sec) => sec && scrollPos >= sec.top && scrollPos < sec.bottom
      );

      if (current) {
        setActiveSection(current.id);
      } else if (scrollPos < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = href === '#home' ? 0 : (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-bgDark/80 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="text-xl font-display font-bold tracking-tight text-white hover:opacity-85 transition-opacity"
        >
          Logeshwaran<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Magnetic key={item.label} range={40} strength={0.25}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'text-accent-lime font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-lime rounded-full" />
                )}
              </a>
            </Magnetic>
          ))}
        </nav>

        {/* Mobile Nav Button */}
        <button
          className="block md:hidden text-white hover:text-accent-lime transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-bgDark/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 border-b border-white/5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`text-2xl font-medium transition-colors ${
                activeSection === item.href.substring(1) ? 'text-accent-lime font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
