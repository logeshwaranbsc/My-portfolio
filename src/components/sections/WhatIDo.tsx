import TiltCard from '../ui/TiltCard';
import { Monitor, Server, Database, Cloud } from 'lucide-react';

const services = [
  {
    icon: <Monitor className="w-8 h-8 text-accent" />,
    title: 'Frontend Development',
    subtitle: 'Angular, Vue.js, Nuxt.js, Ionic Angular, TypeScript, PrimeNG, Tailwind CSS, Bootstrap',
    description: 'Building responsive, reusable, and high-performance user interfaces with modern reactive paradigms.',
  },
  {
    icon: <Server className="w-8 h-8 text-accent" />,
    title: 'Backend Development',
    subtitle: 'NestJS, Node.js, ASP.NET, REST APIs, Prisma ORM, TypeORM',
    description: 'Creating secure, scalable, and maintainable backend services, RESTful APIs, and custom middleware workflows.',
  },
  {
    icon: <Database className="w-8 h-8 text-accent" />,
    title: 'Database Design',
    subtitle: 'PostgreSQL, MySQL',
    description: 'Designing optimized relational schemas, writing efficient complex queries, and tuning database systems for maximum performance.',
  },
  {
    icon: <Cloud className="w-8 h-8 text-accent" />,
    title: 'Cloud & DevOps',
    subtitle: 'AWS S3, Azure Blob Storage, Docker, Git, GitLab',
    description: 'Managing secure cloud assets storage, containerizing backend workloads, and streamlining Git/GitLab version control pipelines.',
  },
];

export default function WhatIDo() {
  return (
    <section id="services" className="py-24 bg-bgDarker border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block text-xs font-semibold text-accent-lime uppercase tracking-wider">
            02 / Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            What I Do
          </h2>
          <p className="text-white/60 text-sm">
            Leveraging a modern full-stack tech stack to build robust architectures, clean interfaces, and data solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, idx) => (
            <TiltCard
              key={idx}
              className="flex flex-col justify-between h-full p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
            >
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg w-fit">{svc.icon}</div>
                <h3 className="text-xl font-display font-bold text-white">{svc.title}</h3>
                <p className="text-xs font-semibold text-accent-lime tracking-wide">{svc.subtitle}</p>
                <p className="text-sm text-white/60 leading-relaxed font-sans">{svc.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
