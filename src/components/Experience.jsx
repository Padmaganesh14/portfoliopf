import { motion } from 'framer-motion';
import { profileData, experiences } from '../data';
import { Briefcase, Calendar, MapPin, Terminal, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const experienceList = experiences || profileData.experience || [];

  return (
    <section id="experience" className="py-28 md:py-32 relative overflow-hidden bg-transparent scroll-mt-20">
      <div className="container mx-auto px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="section-tag">
            <Terminal size={13} />
            <span>cat experience.md</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Work &amp; Fellowship Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Practical industry internships and intense engineering hackathons where I delivered real-world solutions.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/[0.1] ml-4 md:ml-6 space-y-12">
          {experienceList.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#070A0F] border-2 border-[#8B5CF6] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              </div>

              {/* Experience Card */}
              <div className="dev-card p-6 sm:p-7 bg-[#0D1117]/90 border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-mono text-[#8B5CF6] font-semibold mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description Bullets */}
                <div className="space-y-2 mb-5">
                  {(Array.isArray(exp.description)
                    ? exp.description
                    : typeof exp.description === 'string'
                    ? [exp.description]
                    : []
                  ).map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                  {(Array.isArray(exp.skills) ? exp.skills : []).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300 text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
