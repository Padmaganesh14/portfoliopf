import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Code2, Layout, Database, Terminal, Zap } from 'lucide-react';

const categories = [
  {
    title: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
    icon: <Code2 size={22} />,
    color: 'primary',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Frameworks & Libraries',
    items: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    icon: <Layout size={22} />,
    color: 'secondary',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Data & Analytics',
    items: ['Tableau', 'Data Cleaning', 'Data Visualization'],
    icon: <Database size={22} />,
    color: 'primary',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Tools & More',
    items: ['Git', 'GitHub', 'LeetCode (100+ problems)', 'REST APIs'],
    icon: <Terminal size={22} />,
    color: 'secondary',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const skillLevels = {
  Python: 85,
  Java: 75,
  JavaScript: 90,
  HTML: 95,
  CSS: 90,
  React: 88,
  'Node.js': 80,
  'Express.js': 78,
  MongoDB: 72,
  Tableau: 70,
  Git: 88,
  GitHub: 85,
};

function SkillBar({ skill, delay }) {
  const level = skillLevels[skill] || 70;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
          {skill}
        </span>
        <span className="text-xs text-muted font-medium">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

function SkillPill({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="skill-pill group"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-secondary transition-colors shrink-0" />
      <span className="text-sm font-medium text-muted group-hover:text-white transition-colors">
        {skill}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const programmingSkills = profileData.skills.programming;

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-darker to-dark/40 pointer-events-none" />

      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-secondary font-bold mb-3">Expertise</p>
          <h2 className="section-title !mb-4">Technical Skills</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            A curated set of technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* Left: Skill bars for top languages */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass p-8 space-y-5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-display font-bold">Proficiency Levels</h3>
            </div>
            {programmingSkills.map((skill, i) => (
              <SkillBar key={skill} skill={skill} delay={i * 0.08} />
            ))}
            {['React', 'Node.js'].map((skill, i) => (
              <SkillBar key={skill} skill={skill} delay={(programmingSkills.length + i) * 0.08} />
            ))}
          </motion.div>

          {/* Right: Category pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="glass p-6 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-display font-bold">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <SkillPill key={i} skill={item} index={i} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '3+', label: 'Projects Built' },
            { value: '100+', label: 'LeetCode Solved' },
            { value: '8.76', label: 'CGPA Score' },
            { value: '5+', label: 'Technologies' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="glass p-6 text-center hover:border-primary/30 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
