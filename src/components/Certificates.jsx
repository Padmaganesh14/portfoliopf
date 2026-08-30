import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data';
import { ExternalLink, X, Eye, Terminal } from 'lucide-react';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(certificates.map((c) => c.category))];

  const filteredCerts = selectedCategory === 'All'
    ? certificates
    : certificates.filter((c) => c.category === selectedCategory);

  return (
    <section id="certificates" className="py-28 md:py-36 relative overflow-hidden bg-transparent min-h-screen flex flex-col justify-center scroll-mt-20">
      <div className="container mx-auto px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="section-tag">
            <Terminal size={13} />
            <span>ls -la certificates/</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display uppercase">
            Certifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Verified credentials in artificial intelligence, cloud computing, database systems, and full-stack software development.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
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

                <h3 className="text-sm sm:text-base font-bold text-white font-display line-clamp-2 mb-1 group-hover:text-purple-200 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {cert.issuer}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="group-hover:text-white flex items-center gap-1 transition-colors">
                  <Eye size={12} />
                  <span>Preview certificate</span>
                </span>

                {cert.verifyLink && (
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Modal Viewer */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl max-w-3xl w-full p-6 relative shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs font-mono text-[#8B5CF6]">
                      {selectedCert.issuer} • {selectedCert.year || selectedCert.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="max-h-[65vh] overflow-y-auto rounded-xl bg-[#050505] border border-white/[0.06] p-2 flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[60vh] w-auto object-contain rounded-lg"
                    onError={(e) => {
                      if (selectedCert.fallbackImage) e.target.src = selectedCert.fallbackImage;
                    }}
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex justify-end gap-3 font-mono">
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs bg-white text-black hover:bg-slate-200 border-transparent font-bold"
                  >
                    <ExternalLink size={14} />
                    <span>Open Full Certificate</span>
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
