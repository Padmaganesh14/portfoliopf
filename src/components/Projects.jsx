import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data';
import { Github, ExternalLink, Star, Award, CheckCircle2, ArrowUpRight, X, Terminal } from 'lucide-react';

// Authentic macOS Desktop Folder Icon Component
function MacFolderIcon({ color = 'purple', isHovered = false }) {
  const colorThemes = {
    purple: {
      back: '#4C1D95',
      body: '#6D28D9',
      front: '#7C3AED',
      accent: '#A78BFA',
      tab: '#5B21B6',
      border: 'rgba(167, 139, 250, 0.4)',
    },
    emerald: {
      back: '#064E3B',
      body: '#047857',
      front: '#059669',
      accent: '#34D399',
      tab: '#065F46',
      border: 'rgba(52, 211, 153, 0.4)',
    },
    sky: {
      back: '#0C4A6E',
      body: '#0369A1',
      front: '#0284C7',
      accent: '#38BDF8',
      tab: '#075985',
      border: 'rgba(56, 189, 248, 0.4)',
    },
    amber: {
      back: '#78350F',
      body: '#B45309',
      front: '#D97706',
      accent: '#FBBF24',
      tab: '#92400E',
      border: 'rgba(251, 191, 36, 0.4)',
    },
    slate: {
      back: '#1E293B',
      body: '#334155',
      front: '#475569',
      accent: '#94A3B8',
      tab: '#1E293B',
      border: 'rgba(148, 163, 184, 0.4)',
    },
  };

  const theme = colorThemes[color] || colorThemes.purple;

  return (
    <div className="relative w-28 h-24 sm:w-32 sm:h-28 flex items-center justify-center select-none transition-transform duration-300">
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
      >
        {/* Folder Back with Top Tab */}
        <path
          d="M6 24C6 19.5817 9.58172 16 14 16H42C45.3137 16 48.3496 17.6534 50.1246 20.4077L53.8754 26.2246C54.7629 27.6017 56.2808 28.4286 57.9378 28.4286H106C110.418 28.4286 114 32.0103 114 36.4286V82C114 86.4183 110.418 90 106 90H14C9.58172 90 6 86.4183 6 82V24Z"
          fill={theme.back}
        />

        {/* Paper Sheet Preview inside when hovered */}
        <motion.rect
          x="18"
          y="20"
          width="84"
          height="50"
          rx="4"
          fill="#FFFFFF"
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ y: isHovered ? -8 : 0, opacity: isHovered ? 1 : 0.85 }}
          transition={{ duration: 0.25 }}
        />
        <motion.line
          x1="26"
          y1="28"
          x2="55"
          y2="28"
          stroke="#94A3B8"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ y: isHovered ? -8 : 0 }}
        />
        <motion.line
          x1="26"
          y1="36"
          x2="75"
          y2="36"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ y: isHovered ? -8 : 0 }}
        />

        {/* Folder Front Flap */}
        <motion.path
          d="M6 38C6 34.6863 8.68629 32 12 32H108C111.314 32 114 34.6863 114 38V82C114 86.4183 110.418 90 106 90H14C9.58172 90 6 86.4183 6 82V38Z"
          fill={theme.front}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: isHovered ? 0.92 : 1 }}
          style={{ originY: '90px' }}
          transition={{ duration: 0.25 }}
        />

        {/* Subtle Top Highlight Lip */}
        <path
          d="M6 38C6 34.6863 8.68629 32 12 32H108C111.314 32 114 34.6863 114 38V41H6V38Z"
          fill="rgba(255, 255, 255, 0.15)"
        />

        {/* Folder Label Symbol / Accent */}
        <circle cx="60" cy="62" r="5" fill="rgba(255, 255, 255, 0.25)" />
      </svg>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Folder color themes matching the reference aesthetic
  const folderColors = ['purple', 'emerald', 'sky', 'emerald', 'amber'];

  return (
    <section id="projects" className="py-28 md:py-36 relative overflow-hidden bg-transparent min-h-screen flex flex-col justify-center items-center scroll-mt-20">
      <div className="container mx-auto px-6 sm:px-10 max-w-[1200px] relative z-10">
        
        {/* ─── SECTION TITLE (Matching Reference Aesthetic) ─── */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
            MY PROJECTS
          </h2>
        </div>

        {/* ─── FOLDER GRID (Desktop Style) ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 sm:gap-x-12 sm:gap-y-16 max-w-4xl mx-auto justify-items-center">
          {profileData.projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const folderColor = folderColors[index % folderColors.length];

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col items-center text-center select-none w-full max-w-[240px]"
              >
                {/* macOS Desktop Folder Object */}
                <motion.div
                  animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.04 : 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mb-4 relative"
                >
                  <MacFolderIcon color={folderColor} isHovered={isHovered} />

                  {/* Badge Pill on Featured Folders */}
                  {project.featured && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-mono font-black shadow-lg">
                      ★ GDG
                    </span>
                  )}
                  {project.badge && !project.featured && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-mono font-bold shadow-lg">
                      Top 60
                    </span>
                  )}
                </motion.div>

                {/* Project Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white font-display tracking-tight group-hover:text-purple-300 transition-colors mb-1">
                  {project.title}
                </h3>

                {/* 1-Line Description (Clean & Minimal like reference) */}
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-snug line-clamp-2 max-w-[200px]">
                  {project.subtitle || project.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ─── MAC-STYLE MODAL INSPECTOR ─── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden"
              >
                {/* macOS Window Top Bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    <span className="ml-2 font-mono text-xs text-slate-400">
                      ~/projects/{selectedProject.id || 'project'}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Project Details */}
                <div className="space-y-4 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedProject.featured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
                        ★ Finalist — GDG Hackathon 2026
                      </span>
                    )}
                    {selectedProject.badge && !selectedProject.featured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-[#8B5CF6] border border-purple-500/30 text-xs font-mono font-semibold">
                        {selectedProject.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {selectedProject.title}
                  </h3>

                  <p className="text-sm font-mono text-[#8B5CF6]">
                    {selectedProject.subtitle}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>

                  {/* Highlights */}
                  {selectedProject.highlights && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Key Features &amp; Architecture:
                      </div>
                      {selectedProject.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 size={14} className="text-[#39FF88] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Tech Stack:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-end gap-3 font-mono">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                    >
                      <Github size={14} />
                      <span>GitHub Repo</span>
                    </a>
                  )}

                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs bg-white text-black hover:bg-slate-200 font-bold border-transparent"
                    >
                      <span>Open Live Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}