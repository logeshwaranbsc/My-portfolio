import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    role: 'Full-Stack Software Engineer',
    company: 'Finstein Advisory LLP',
    period: 'July 2024 — June 2026',
    description: 'Developed enterprise web applications and clinical healthcare platforms, focusing on high-performance interfaces, backend API engineering, and optimized data workflows.',
    bullets: [
      'Developed enterprise web apps using Angular and Vue.js',
      'Built reusable frontend components for large-scale applications',
      'Developed REST APIs using NestJS and Node.js',
      'Created responsive dashboards with Chart.js and D3.js',
      'Integrated SAP-based enterprise workflows',
      'Built AI-powered clinical data management features',
      'Developed medical image upload and annotation modules',
      'Optimized PostgreSQL and MySQL databases',
      'Integrated AWS S3 and Azure Blob Storage',
      'Fixed VAPT security vulnerabilities',
      'Collaborated with QA, AI, Backend, and Product teams',
    ],
  },
  {
    role: 'Manual Testing Intern',
    company: 'Finstein Advisory LLP',
    period: 'May 2024 — June 2024',
    description: 'Assisted the quality assurance team in testing features, writing test cases, and identifying bugs in production-bound modules.',
    bullets: [
      'Executed detailed test plans and logged software defects',
      'Collaborated with developers to verify patch deployments',
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [height, setHeight] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !pathRef.current || height === 0) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 35%',
      end: 'bottom 65%',
      scrub: 0.5,
      animation: gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
      }),
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, [height, shouldReduceMotion]);

  return (
    <section id="experience" className="py-24 bg-bgDark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block text-xs font-semibold text-accent-lime uppercase tracking-wider">
            04 / Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Professional Journey
          </h2>
          <p className="text-white/60 text-sm">
            A chronological timeline of my roles, responsibilities, and achievements.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto pl-10 md:pl-12 py-4" ref={containerRef}>
          {/* Animated SVG Line */}
          <div className="absolute left-[17px] top-0 bottom-0 w-[2px]">
            {/* Background static line */}
            <div className="absolute inset-0 bg-white/5" />
            
            {/* SVG drawing path */}
            <svg className="absolute top-0 left-0 w-full h-full" fill="none">
              <path
                ref={pathRef}
                d={`M 1 0 L 1 ${height}`}
                stroke="#8B5CF6"
                strokeWidth="2"
                style={shouldReduceMotion ? { strokeDashoffset: 0 } : undefined}
              />
            </svg>
          </div>

          <div className="space-y-12">
            {experienceData.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute left-[-37px] md:left-[-39px] top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-bgDark group-hover:bg-accent-lime group-hover:border-accent-lime transition-colors duration-300 z-10" />

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {item.role}
                    </h3>
                    <span className="text-xs font-semibold text-accent-lime px-2 py-1 rounded bg-accent-lime/5 border border-accent-lime/10">
                      {item.period}
                    </span>
                  </div>
                  
                  <p className="text-sm font-semibold text-white/50">{item.company}</p>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">{item.description}</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-white/60 flex items-start gap-2 leading-relaxed">
                        <span className="text-accent mt-1.5 shrink-0 select-none">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
