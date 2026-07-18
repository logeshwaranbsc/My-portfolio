import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from '../ui/TiltCard';
import { X, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  technologies: string[];
  description: string;
  features: string[];
}

const projects: Project[] = [
  {
    title: 'Doctor Payroll Management System',
    technologies: ['Angular', 'PrimeNG', 'TypeScript', 'REST APIs'],
    description: 'Designed and enhanced a payroll management system for hospitals that automates salary calculations, incentives, deductions, and doctor payouts.',
    features: ['Salary Calculation', 'Incentive Management', 'Payroll Dashboard', 'Reports', 'REST API Integration'],
  },
  {
    title: 'AI Clinical Data Management Platform',
    technologies: ['Vue.js', 'Nuxt.js', 'Node.js', 'Prisma ORM', 'PostgreSQL'],
    description: 'Developed an AI-powered healthcare platform for clinical datasets, medical image annotation, QC, and clinical evaluation.',
    features: ['DICOM Image Upload', 'Medical Image Annotation', 'Quality Control Workflow', 'Clinical Evaluation', 'AI Dataset Management'],
  },
  {
    title: 'Enterprise Dashboard',
    technologies: ['Vue.js', 'Nuxt.js', 'D3.js', 'Chart.js'],
    description: 'Built interactive dashboards that provide real-time business insights with advanced charts and reporting.',
    features: ['Analytics Dashboard', 'Interactive Charts', 'Performance Reports', 'Business Insights'],
  },
];

export default function Projects() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      }
    };
    if (selectedIdx !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIdx]);

  return (
    <section id="projects" className="py-24 bg-bgDarker border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block text-xs font-semibold text-accent-lime uppercase tracking-wider">
            05 / Projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Featured Projects
          </h2>
          <p className="text-white/60 text-sm">
            A showcase of client solutions, AI tooling, and business dashboards. Click a card to expand.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              layoutId={`project-container-${index}`}
              onClick={() => setSelectedIdx(index)}
              className="cursor-pointer"
            >
              <TiltCard className="h-full flex flex-col justify-between p-6 border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-colors relative">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-semibold text-accent uppercase tracking-wider bg-accent/5 px-2.5 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <motion.h3
                    layoutId={`project-title-${index}`}
                    className="text-lg font-display font-bold text-white group-hover:text-accent transition-colors duration-300"
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 text-xs font-semibold text-accent-lime flex items-center gap-1">
                  Learn More <ExternalLink size={12} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Expanded Modal */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIdx(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                layoutId={`project-container-${selectedIdx}`}
                className="w-full max-w-2xl bg-bgDark border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2 pr-8">
                    {projects[selectedIdx].technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-semibold text-accent uppercase tracking-wider bg-accent/5 px-2.5 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.h3
                    layoutId={`project-title-${selectedIdx}`}
                    className="text-2xl md:text-3xl font-display font-extrabold text-white"
                  >
                    {projects[selectedIdx].title}
                  </motion.h3>

                  <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans">
                    {projects[selectedIdx].description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-lime">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/60">
                      {projects[selectedIdx].features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
