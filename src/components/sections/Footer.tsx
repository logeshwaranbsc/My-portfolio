import Magnetic from '../ui/Magnetic';
import { Mail, ArrowUp } from 'lucide-react';
import Linkedin from '../ui/LinkedinIcon';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 bg-bgDarker border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Info */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-semibold text-white">Logeshwaran Selvam</p>
          <p className="text-xs text-white/40 italic">
            "Building Modern Web Applications with Passion."
          </p>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-6 text-white/40">
          <Magnetic>
            <a
              href="mailto:logeshwarans159@gmail.com"
              className="hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://linkedin.com/in/logeshwaran-selvam"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </Magnetic>
        </div>

        {/* Right: Scroll to top */}
        <div className="flex items-center">
          <Magnetic>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-accent-lime/40 hover:text-accent-lime flex items-center justify-center text-white/60 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-medium tracking-wide">
        <p>© {new Date().getFullYear()} Logeshwaran Selvam. All rights reserved.</p>
        <p>Built with React, TS, Tailwind, GSAP & Framer Motion.</p>
      </div>
    </footer>
  );
}
