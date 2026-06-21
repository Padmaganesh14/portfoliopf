import { motion, AnimatePresence } from 'framer-motion'
import { profileData } from '../data'
import { X, Download, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const categoryColors = {
  'Data Analytics': 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
  'Database Management': 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
  'Hackathon Participation': 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
  'Programming': 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
  'Web Development': 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400'
}

function CertificateModal({ cert, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-primary/30 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-slate-900 to-slate-900/95 border-b border-primary/20 p-6 flex justify-between items-start gap-4 backdrop-blur-sm">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-primary text-sm font-medium">{cert.issuer}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-400 text-sm">Year</p>
                <p className="text-white font-semibold">{cert.year}</p>
              </div>
              {cert.category && (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-white font-semibold">{cert.category}</p>
                </div>
              )}
              {cert.score && (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-400 text-sm">Score</p>
                  <p className="text-white font-semibold">{cert.score}</p>
                </div>
              )}
            </div>

            {/* Certificate Image */}
            {cert.image && (
              <div className="mb-6 rounded-xl overflow-hidden border border-primary/20">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%239CA3AF" text-anchor="middle" dy=".3em"%3ECertificate Preview%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
            )}

            {/* Description */}
            {cert.description && (
              <p className="text-gray-300 leading-relaxed mb-6">
                {cert.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              {cert.file && (
                <>
                  <motion.a
                    href={cert.file}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 min-w-[150px] bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    <ExternalLink size={18} />
                    View PDF
                  </motion.a>
                  <motion.a
                    href={cert.file}
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <Download size={18} />
                    Download
                  </motion.a>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function CertificateCard({ cert, onOpenModal }) {
  const colorClass = categoryColors[cert.category] || 'from-primary/20 to-primary/5 border-primary/30 text-primary'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={() => onOpenModal(cert)}
      className="group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-950/50 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 h-full">
        {/* Certificate Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231e293b" width="400" height="300"/%3E%3Ctext x="50%25" y="40%25" font-size="18" fill="%239CA3AF" text-anchor="middle" dy=".3em"%3E📜 Certificate%3C/text%3E%3Ctext x="50%25" y="55%25" font-size="14" fill="%236B7280" text-anchor="middle" dy=".3em"%3EClick to View%3C/text%3E%3C/svg%3E'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-4xl">📜</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {cert.title}
          </h4>

          <p className="text-gray-400 text-sm font-medium mb-3">
            {cert.issuer}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between mb-4 text-xs">
            <span className="text-gray-400">{cert.year}</span>
            {cert.score && <span className="text-green-400 font-semibold">{cert.score}</span>}
          </div>

          {/* Category Badge */}
          {cert.category && (
            <div className={`inline-block text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 bg-gradient-to-br ${colorClass} border rounded-full`}>
              {cert.category}
            </div>
          )}

          {/* View Button */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <motion.button
              whileHover={{ x: 4 }}
              className="text-primary font-semibold text-sm flex items-center gap-2 group/btn"
            >
              View Certificate
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  const { hackathons, certificates } = profileData
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-bold mb-3">
            Recognition
          </p>
          <h2 className="section-title">Achievements & Certifications</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Professional credentials and accomplishments earned through dedication and excellence
          </p>
        </motion.div>

        {/* Hackathon Achievements */}
        <div className="mb-28">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <span className="text-3xl">🏆</span> Hackathon Achievements
          </motion.h3>

          <div className="grid gap-6 md:grid-cols-2">
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                      {hackathon.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{hackathon.event}</p>
                  </div>
                  <span className="text-3xl">🚀</span>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Achievement</p>
                    <p className="text-primary font-semibold">{hackathon.achievement}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Project</p>
                    <p className="text-gray-300">{hackathon.project}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {hackathon.description}
                </p>

                <div className="inline-block text-xs font-bold px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-full">
                  {hackathon.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <span className="text-3xl">📜</span> Professional Certifications
          </motion.h3>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => (
              <CertificateCard
                key={index}
                cert={cert}
                onOpenModal={setSelectedCert}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        cert={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  )
}
