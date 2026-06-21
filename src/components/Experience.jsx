import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Briefcase, Trophy, Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-secondary font-bold mb-3">My Journey</p>
          <h2 className="section-title !mb-4">Experience & Achievements</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Building real-world skills through internships, hackathons, and certifications.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />

            <div className="space-y-12">

              {/* Experience entries */}
              {profileData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-10 md:items-start"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-5 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-darker shadow-[0_0_16px_rgba(99,102,241,0.6)] z-10" />

                  {/* Left: Meta */}
                  <div className="hidden md:flex flex-col items-end pr-10 pt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                      <Briefcase size={11} />
                      {exp.type}
                    </span>
                  </div>

                  {/* Right: Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass p-7 hover:border-primary/30 transition-all duration-300 group md:pl-10"
                  >
                    {/* Mobile meta */}
                    <div className="flex items-center gap-2 text-xs text-muted mb-3 md:hidden">
                      <Calendar size={12} />
                      {exp.period}
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1.5">
                          <Briefcase size={12} />
                          {exp.type}
                        </div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-muted font-medium mt-0.5">{exp.company}</p>
                      </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{exp.description}</p>
                  </motion.div>
                </motion.div>
              ))}

              {/* Hackathon entries */}
              {profileData.hackathons.map((h, index) => (
                <motion.div
                  key={`h-${index}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-10 md:items-start"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-5 w-5 h-5 rounded-full bg-gradient-to-br from-secondary to-pink-600 border-2 border-darker shadow-[0_0_16px_rgba(236,72,153,0.6)] z-10" />

                  {/* Left: empty on desktop (right-aligned card) */}
                  <div className="hidden md:block" />

                  {/* Right: Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass p-7 hover:border-secondary/30 transition-all duration-300 group md:pl-10"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted mb-3 md:hidden">
                      <Calendar size={12} />
                      {h.year}
                    </div>

                    <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-1.5">
                      <Trophy size={12} />
                      Hackathon
                    </div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-secondary transition-colors duration-300 mb-0.5">
                      {h.name}
                    </h3>
                    <p className="text-muted font-medium mb-4">{h.event} · {h.year}</p>

                    {h.achievement && (
                      <p className="text-primary font-semibold mb-3">
                        {h.achievement}
                      </p>
                    )}

                    <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                      <p className="text-white font-semibold text-sm mb-1">🚀 {h.project}</p>
                      <p className="text-muted text-sm leading-relaxed">{h.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-display font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Certifications
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {profileData.certificates.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass p-6 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 text-lg">
                    🏅
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-muted text-sm mb-2">{cert.issuer}</p>
                  <span className="text-xs font-bold text-primary/70">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
