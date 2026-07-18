import { motion, useReducedMotion } from 'framer-motion';
import TiltCard from '../ui/TiltCard';
import { 
  Monitor, Server, Cpu, Database, Cloud, Settings, 
  Code2, Terminal, CheckSquare, Send, FileText
} from 'lucide-react';

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['Angular', 'Vue.js', 'Nuxt.js', 'Ionic Angular', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'PrimeNG'],
  },
  {
    category: 'Backend',
    skills: ['NestJS', 'Node.js', 'ASP.NET', 'REST APIs', 'Prisma ORM', 'TypeORM'],
  },
  {
    category: 'Programming',
    skills: ['TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL'],
  },
  {
    category: 'Cloud',
    skills: ['AWS S3', 'Azure Blob Storage'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitLab', 'Docker', 'Postman', 'Swagger', 'DBeaver', 'Jira'],
  },
];

const getCategoryIcon = (category: string) => {
  const className = "w-5 h-5 text-accent-lime shrink-0";
  switch (category.toLowerCase()) {
    case 'frontend':
      return <Monitor className={className} />;
    case 'backend':
      return <Server className={className} />;
    case 'programming':
      return <Cpu className={className} />;
    case 'databases':
      return <Database className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'tools':
      return <Settings className={className} />;
    default:
      return <Settings className={className} />;
  }
};

const getSkillIcon = (skill: string) => {
  const size = 14;
  
  switch (skill.toLowerCase()) {
    case 'typescript':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-sm">
          <rect width="100" height="100" fill="#3178C6"/>
          <text x="50" y="75" fill="white" fontSize="42" fontFamily="Inter, Arial" fontWeight="bold" textAnchor="middle">TS</text>
        </svg>
      );
    case 'javascript':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-sm">
          <rect width="100" height="100" fill="#F7DF1E"/>
          <text x="50" y="75" fill="black" fontSize="42" fontFamily="Inter, Arial" fontWeight="bold" textAnchor="middle">JS</text>
        </svg>
      );
    case 'angular':
      return (
        <svg width={size} height={size} viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M125 30L218.7 63.3L204.6 182.2L125 220L45.4 182.2L31.3 63.3L125 30Z" fill="#DD0031"/>
          <path d="M125 30V220L204.6 182.2L218.7 63.3L125 30Z" fill="#C3002F"/>
          <path d="M125 58.7L69.6 166.3H96.1L107.6 137.9H142.4L153.9 166.3H180.4L125 58.7ZM125 94.7L136.9 123.6H113.1L125 94.7Z" fill="white"/>
        </svg>
      );
    case 'vue.js':
      return (
        <svg width={size} height={size} viewBox="0 0 256 221" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M128 220.8L0 0H52.2L128 131.2L203.8 0H256L128 220.8Z" fill="#41B883"/>
          <path d="M128 220.8L40.7 0H92.9L128 60.8L163.1 0H215.3L128 220.8Z" fill="#35495E"/>
        </svg>
      );
    case 'nuxt.js':
      return (
        <svg width={size} height={size} viewBox="0 0 256 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M76.4 179.9H0L60.5 74.9L90.7 127.3L76.4 179.9Z" fill="#00C58E"/>
          <path d="M179.6 179.9H57.4L117.9 74.9L148.1 127.3L133.8 179.9H179.6Z" fill="#00C58E"/>
          <path d="M179.6 179.9L133.8 179.9L179.6 99.8L225.4 179.9H179.6Z" fill="#108775"/>
          <path d="M127.8 0L255.6 220.6H177.8L127.8 133.8L77.8 220.6H0L127.8 0Z" fill="#00C58E"/>
        </svg>
      );
    case 'nestjs':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M128 0L248.8 69.8V209.2L128 256L7.2 209.2V69.8L128 0Z" fill="#E0234E"/>
          <path d="M128 27.2L225.5 83.6V196.4L128 228.8L30.5 196.4V83.6L128 27.2Z" fill="white"/>
          <path d="M128 44.8L209.6 92v91.2L128 211.2 46.4 183.2v-91.2L128 44.8z" fill="#E0234E"/>
        </svg>
      );
    case 'docker':
      return (
        <svg width={size} height={size} viewBox="0 0 256 211" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 100.9c-1.1-.3-5.2-.6-11-.6-6.4 0-14.7 1-22.3 4.2-3.1-6.1-9.5-10.4-16.9-10.4-3.4 0-6.6.9-9.3 2.5-3.3-8.8-11.7-15.1-21.7-15.1-4.7 0-9 1.4-12.7 3.9V43.8H128V12.5H96.8v31.3H65.5v31.3H34.3v31.3H3.1v31.3H252.9c3.1 0 3.1 0 3.1-3.1v-6.3z" fill="#2496ED"/>
        </svg>
      );
    case 'postgresql':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M252.8 119.5c.2-2.1.2-4.3.2-6.5C253 50.6 197 0 128 0S3 50.6 3 113c0 2.2 0 4.4.2 6.5.6-2 .9-4 1.5-6C10 93 25.1 76 43 65.5V128h170V65.5c17.9 10.5 33 27.5 38.3 47.9.6 2 .9 4 1.5 6.1z" fill="#336791"/>
          <path d="M128 256c69 0 125-50.6 125-113V128H3v15c0 62.4 56 113 125 113z" fill="#336791"/>
        </svg>
      );
    case 'mysql':
      return <Database size={size} className="text-[#00758F]" />;
    case 'git':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M251.2 121.2L134.8 4.8c-6.4-6.4-16.8-6.4-23.2 0L92 24.4l35.6 35.6c8 5.6 13.2 14.8 13.2 25.2 0 16.8-13.6 30.4-30.4 30.4-10.4 0-19.6-5.2-25.2-13.2L49.6 138c8 5.6 13.2 14.8 13.2 25.2 0 16.8-13.6 30.4-30.4 30.4S2 180 2 163.2c0-10.4 5.2-19.6 13.2-25.2l35.6-35.6c-.4-1.6-.8-3.2-.8-4.8 0-10.4 5.2-19.6 13.2-25.2L28.4 36.8 4.8 60.4c-6.4 6.4-6.4 16.8 0 23.2l116.4 116.4c6.4 6.4 16.8 6.4 23.2 0l106.8-106.8c6.4-6.4 6.4-16.8 0-22z" fill="#F05032"/>
        </svg>
      );
    case 'gitlab':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M251.2 133.5l-16-49.2-27.2-83.6c-1.6-4.8-8-4.8-9.6 0l-27.2 83.6H84.8L57.6 1.1c-1.6-4.8-8-4.8-9.6 0L20.8 84.7 4.8 133.5c-2.4 7.2.4 15.2 6.4 19.6L128 251.2l116.8-98.1c6-4.4 8.8-12.4 6.4-19.6z" fill="#FC6D26"/>
        </svg>
      );
    case 'html5':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.3 227.1L17.2 30h221.6l-17.1 197L128 253.5l-93.7-26.4z" fill="#E34F26"/>
          <path d="M128 47.9v185.3l74.9-21.1 13.8-158.4H128z" fill="#F06529"/>
          <path d="M128 116.8H88.4l-2.7-30.8H128V58.8H58.4l8.2 92.4H128v-34.4z" fill="#EBEBEB"/>
          <path d="M128 178.6l-29.3-7.9-1.9-21.1H76.2l3.7 41.7 48.1 13.3v-26zM128 116.8v34.4h39.1l-3.7 41.1-35.4 9.5v26l48.1-13.3 9.7-109.3H128zM128 86h65.8l-5.7 64.6H128v-30.8h30.8l2.2-24.8H128V86z" fill="white"/>
        </svg>
      );
    case 'css3':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.3 227.1L17.2 30h221.6l-17.1 197L128 253.5l-93.7-26.4z" fill="#1572B6"/>
          <path d="M128 47.9v185.3l74.9-21.1 13.8-158.4H128z" fill="#33A9DC"/>
          <path d="M128 116.8H88.4l-2.7-30.8H128V58.8H58.4l8.2 92.4H128v-34.4z" fill="#EBEBEB"/>
          <path d="M128 178.6l-29.3-7.9-1.9-21.1H76.2l3.7 41.7 48.1 13.3v-26zM128 116.8v34.4h39.1l-3.7 41.1-35.4 9.5v26l48.1-13.3 9.7-109.3H128zM128 86h65.8l-5.7 64.6H128v-30.8h30.8l2.2-24.8H128V86z" fill="white"/>
        </svg>
      );
    case 'tailwind css':
      return (
        <svg width={size} height={size} viewBox="0 0 256 154" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M128 0C74.7 0 42.7 26.7 32 80c16-21.3 34.7-29.3 56-24 12.1 3 20.8 11.9 30.4 21.7 15.6 15.9 33.7 34.4 75.6 34.4 53.3 0 85.3-26.7 96-80-16 21.3-34.7 29.3-56 24-12.1-3-20.8-11.9-30.4-21.7C178 18.5 159.9 0 128 0z" fill="#38BDF8"/>
        </svg>
      );
    case 'aws s3':
      return <Cloud size={size} className="text-[#FF9900]" />;
    case 'azure blob storage':
      return <Cloud size={size} className="text-[#0089D6]" />;
    case 'sql':
      return <Database size={size} className="text-white/60" />;
    case 'rest apis':
      return <Terminal size={size} className="text-white/60" />;
    case 'prisma orm':
      return <Code2 size={size} className="text-[#123A50]" />;
    case 'typeorm':
      return <Code2 size={size} className="text-[#E23237]" />;
    case 'jira':
      return <CheckSquare size={size} className="text-[#0052CC]" />;
    case 'dbeaver':
      return <Database size={size} className="text-[#966432]" />;
    case 'postman':
      return <Send size={size} className="text-[#FF6C37]" />;
    case 'swagger':
      return <FileText size={size} className="text-[#85EA2D]" />;
    default:
      if (skill.includes('API') || skill.includes('REST')) return <Terminal size={size} className="text-white/50" />;
      if (skill.includes('SQL') || skill.includes('Database')) return <Database size={size} className="text-white/50" />;
      if (skill.includes('Testing') || skill.includes('Jira')) return <CheckSquare size={size} className="text-white/50" />;
      return <Code2 size={size} className="text-white/50" />;
  }
};

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 240,
        damping: 18,
      },
    },
  };

  return (
    <section id="skills" className="py-24 bg-bgDark border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block text-xs font-semibold text-accent-lime uppercase tracking-wider">
            03 / Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            My Technical Arsenal
          </h2>
          <p className="text-white/60 text-sm">
            A comprehensive overview of languages, frameworks, databases, and DevOps tools I use daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, type: 'spring', stiffness: 100 }}
            >
              <TiltCard className="h-full flex flex-col p-6 border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-colors relative">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
                  {getCategoryIcon(group.category)}
                  <h3 className="text-lg font-display font-bold text-white">
                    {group.category}
                  </h3>
                </div>
                
                <motion.div
                  className="flex flex-wrap gap-2.5"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {group.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      variants={shouldReduceMotion ? {} : itemVariants}
                      whileHover={{ scale: 1.05, y: -2, zIndex: 10 }}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold text-white/80 hover:text-accent-lime hover:border-accent-lime/30 hover:bg-accent-lime/5 cursor-default transition-all duration-300 shadow-sm hover:shadow-accent-lime/10 flex items-center gap-2 group/tag"
                    >
                      <motion.span 
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="shrink-0 flex items-center justify-center"
                      >
                        {getSkillIcon(skill)}
                      </motion.span>
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
