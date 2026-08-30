import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Trophy, Award, ExternalLink, Terminal, ArrowUpRight } from 'lucide-react';

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 md:py-36 relative overflow-hidden bg-transparent min-h-screen flex flex-col justify-center scroll-mt-20">
      <div className="container mx-auto px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="section-tag">
            <Terminal size={13} />
            <span>git log --oneline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display uppercase">
            Honors &amp; Milestones
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Competitive national hackathons, project exhibitions, and engineering recognitions.
          </p>
        </div>

        {/* ─── NUMBERED EDITORIAL ACHIEVEMENT ROWS ─── */}
        <div className="space-y-4">
          {profileData.achievements.map((item, index) => {
            const isGdg = item.badge?.includes("GDG");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`rounded-2xl p-6 sm:p-7 border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isGdg
                    ? 'bg-gradient-to-r from-[#0D0D0D] via-[#14121a] to-[#0D0D0D] border-purple-500/30'
                    : 'bg-[#0D0D0D]/80 border-white/[0.07] hover:border-white/[0.18]'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  {/* Numbering */}
                  <span className="font-mono text-xl sm:text-2xl font-bold text-slate-600">
                    0{index + 1}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                        isGdg 
                          ? 'bg-purple-500/15 text-[#8B5CF6] border border-purple-500/30'
                          : 'bg-white/[0.05] text-slate-300 border border-white/[0.08]'
                      }`}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[#8B5CF6] mt-0.5">
                      {item.issuer} {item.project && `• Project: ${item.project}`}
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {isGdg ? (
                  <div className="shrink-0 pt-2 md:pt-0">
                    <a
                      href="/GDG.jpeg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs bg-white text-black hover:bg-slate-200 border-transparent font-bold"
                    >
                      <span>Certificate</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                ) : item.image ? (
                  <div className="shrink-0 pt-2 md:pt-0">
                    <a
                      href={item.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                    >
                      <span>Evidence</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
