import { motion } from 'framer-motion';
import { skillCategories } from '../data';
import TechIcon from './TechIcons';
import { 
  Code2, Layout, Server, Database, Bot, BarChart3, Cloud, Wrench, 
  Terminal, Cpu 
} from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Layout: Layout,
  Server: Server,
  Database: Database,
  Bot: Bot,
  Cpu: Bot,
  BarChart3: BarChart3,
  Cloud: Cloud,
  Wrench: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36 relative overflow-hidden bg-transparent min-h-screen flex flex-col justify-center scroll-mt-20">
      <div className="container mx-auto px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="section-tag">
            <Terminal size={13} />
            <span>npm list --depth=0</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display uppercase">
            Tech Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            A developer toolbox of languages, frontend &amp; backend frameworks, database systems, AI tools, and cloud infrastructure.
          </p>
        </div>

        {/* 8-Category Developer Terminal Toolbox Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Cpu;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-xl p-5 bg-[#0D0D0D]/90 border border-white/[0.07] hover:border-white/[0.2] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Category Title */}
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.06]">
                    <span className="w-7 h-7 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300">
                      <IconComponent size={14} />
                    </span>
                    <h3 className="font-bold text-xs font-mono tracking-wider text-slate-200 uppercase">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills Badges with Recognizable Technology Logos */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300 text-xs font-mono hover:text-white hover:border-[#8B5CF6]/50 hover:bg-white/[0.06] transition-all"
                      >
                        <TechIcon name={skill} className="w-4 h-4 shrink-0" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
