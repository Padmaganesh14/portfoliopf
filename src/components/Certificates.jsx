import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data';
import { ExternalLink, X, Eye, Terminal, FileText, ArrowUpRight } from 'lucide-react';

// Authentic macOS Desktop Folder Icon Component
function MacFolderIcon({ color = 'emerald', isHovered = false }) {
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
  };

  const theme = colorThemes[color] || colorThemes.emerald;

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

export default function Certificates() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isFolderHovered, setIsFolderHovered] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Handle escape key navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        if (selectedCert) {
          setSelectedCert(null);
        } else if (isExplorerOpen) {
          setIsExplorerOpen(false);
        }
      }
    },
    [selectedCert, isExplorerOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const categories = ['All', ...new Set(certificates.map((c) => c.category))];

  const filteredCerts =
    selectedCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  return (
    <section
      id="certificates"
      className="py-28 md:py-36 relative overflow-hidden bg-transparent min-h-screen flex flex-col justify-center items-center scroll-mt-20"
    >
      <div className="container mx-auto px-6 sm:px-10 max-w-[1200px] relative z-10">
        
        {/* ─── SECTION TITLE (Matching My Projects Header Aesthetic) ─── */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
            MY CERTIFICATES
          </h2>
        </div>

        {/* ─── SINGLE FOLDER CARD (Matching Project Folder Visual Style) ─── */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            onMouseEnter={() => setIsFolderHovered(true)}
            onMouseLeave={() => setIsFolderHovered(false)}
            onClick={() => setIsExplorerOpen(true)}
            className="group cursor-pointer flex flex-col items-center text-center select-none w-full max-w-[260px]"
          >
            {/* macOS Desktop Folder Object */}
            <motion.div
              animate={{ y: isFolderHovered ? -8 : 0, scale: isFolderHovered ? 1.04 : 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-4 relative"
            >
              <MacFolderIcon color="emerald" isHovered={isFolderHovered} />

              {/* Dynamic Badge Pill with Live Certificate Count */}
              <span className="absolute -top-2 -right-3 px-2.5 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-mono font-black shadow-lg">
                ★ {certificates.length} Credentials
              </span>
            </motion.div>

            {/* Folder Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white font-display tracking-tight group-hover:text-emerald-300 transition-colors mb-1">
              Certificates
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-snug max-w-[210px]">
              All my verified certifications &amp; credentials
            </p>
          </motion.div>
        </div>

        {/* ─── MAC-STYLE CERTIFICATE COLLECTION EXPLORER MODAL ─── */}
        <AnimatePresence>
          {isExplorerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExplorerOpen(false)}
              className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden"
              >
                {/* macOS Window Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0E0E0E]/90 shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsExplorerOpen(false)}
                      className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity cursor-pointer"
                      title="Close"
                    />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    <span className="ml-2 font-mono text-xs text-slate-400">
                      ~/credentials/certificates
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {certificates.length} Credentials
                    </span>
                    <button
                      onClick={() => setIsExplorerOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                      title="Close Window"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Explorer Scrollable Body */}
                <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                  {/* Explorer Header */}
                  <div className="text-left">
                    <div className="section-tag mb-2">
                      <Terminal size={13} />
                      <span>ls -la certificates/</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display uppercase">
                      CERTIFICATES
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
                      Verified credentials in artificial intelligence, cloud computing, database systems, and full-stack software development.
                    </p>
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2 pt-1 pb-2">
                    {categories.map((cat) => {
                      const count =
                        cat === 'All'
                          ? certificates.length
                          : certificates.filter((c) => c.category === cat).length;

                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                            selectedCategory === cat
                              ? 'bg-white text-black font-bold shadow-sm'
                              : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                          }`}
                        >
                          <span>{cat}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                              selectedCategory === cat
                                ? 'bg-black/15 text-black font-extrabold'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Certificates Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCerts.map((cert, index) => (
                      <motion.div
                        key={cert.title + index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        onClick={() => setSelectedCert(cert)}
                        className="rounded-2xl p-5 bg-[#0D0D0D]/90 border border-white/[0.07] hover:border-white/[0.25] transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
                      >
                        <div>
                          {/* Thumbnail Preview Area */}
                          <div className="w-full h-44 rounded-xl bg-[#050505] border border-white/[0.06] mb-4 overflow-hidden relative flex items-center justify-center p-2">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                              onError={(e) => {
                                if (cert.fallbackImage) e.target.src = cert.fallbackImage;
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="p-2 rounded-full bg-white text-black shadow-lg">
                                <Eye size={15} />
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-[#8B5CF6] border border-purple-500/20">
                              {cert.category}
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                              {cert.year || cert.date}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-white font-display line-clamp-2 mb-1 group-hover:text-purple-200 transition-colors text-left">
                            {cert.title}
                          </h4>
                          <p className="text-xs font-mono text-slate-400 text-left">
                            {cert.issuer}
                          </p>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="group-hover:text-white flex items-center gap-1 transition-colors">
                            <Eye size={12} />
                            <span>Preview certificate</span>
                          </span>

                          <div className="flex items-center gap-2">
                            {cert.file && (
                              <a
                                href={cert.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-white flex items-center gap-1 transition-colors p-1 rounded hover:bg-white/[0.06]"
                                title="Open PDF Document"
                              >
                                <FileText size={13} className="text-slate-400 hover:text-white" />
                              </a>
                            )}
                            {cert.verifyLink && (
                              <a
                                href={cert.verifyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-white flex items-center gap-1 transition-colors p-1 rounded hover:bg-white/[0.06]"
                                title="Verify Online"
                              >
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── CERTIFICATE HIGH-RES ZOOM MODAL ─── */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl max-w-3xl w-full p-6 relative shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                  <div className="text-left pr-4">
                    <h3 className="text-lg font-bold text-white font-display">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs font-mono text-[#8B5CF6]">
                      {selectedCert.issuer} • {selectedCert.year || selectedCert.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0"
                    title="Close Preview"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Certificate Preview Image */}
                <div className="max-h-[65vh] overflow-y-auto rounded-xl bg-[#050505] border border-white/[0.06] p-2 flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[60vh] w-auto object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      if (selectedCert.fallbackImage) e.target.src = selectedCert.fallbackImage;
                    }}
                  />
                </div>

                {/* Certificate Description if available */}
                {selectedCert.description && (
                  <p className="text-xs text-slate-400 font-sans text-left mt-3 leading-relaxed">
                    {selectedCert.description}
                  </p>
                )}

                {/* Modal Action Buttons */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3 font-mono">
                  {selectedCert.file && (
                    <a
                      href={selectedCert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                    >
                      <FileText size={13} />
                      <span>PDF Document</span>
                    </a>
                  )}

                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs bg-white text-black hover:bg-slate-200 border-transparent font-bold"
                  >
                    <ExternalLink size={14} />
                    <span>Open Full Image</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
