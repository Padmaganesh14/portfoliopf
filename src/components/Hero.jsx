import { motion } from 'framer-motion';
import { profileData } from '../data';
import { ArrowRight, FileText, Github, Linkedin, Terminal } from 'lucide-react';
import MacTerminal from './MacTerminal';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-transparent scroll-mt-20"
    >
      <div className="container mx-auto px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1400px] relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Minimal Developer Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            {/* Terminal Command Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono mb-6">
              <span className="text-[#39FF88] font-bold">ganesh@portfolio</span>
              <span className="text-slate-500">~ %</span>
              <span className="text-slate-200">whoami</span>
            </div>

            {/* Name — Hero Element */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F5] mb-3 uppercase font-display leading-tight">
              Padma Ganesh P
            </h1>

            {/* Subtitle */}
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#8B5CF6] mb-5 font-mono tracking-wide">
              FULL STACK DEVELOPER <span className="text-slate-600">•</span> AI &amp; AUTOMATION <span className="text-slate-600">•</span> CLOUD
            </h2>

            {/* Short Introduction */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-sans">
              Building practical full-stack applications with AI, automation and modern web technologies.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto font-mono">
              <a
                href="#projects"
                className="btn-primary w-full sm:w-auto text-xs sm:text-sm bg-white text-black hover:bg-slate-200 border-transparent font-bold transition-all shadow-sm"
              >
                <span>VIEW PROJECTS</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto text-xs sm:text-sm border-white/[0.12] hover:border-white/[0.25] text-slate-200"
              >
                <FileText size={14} />
                <span>RESUME</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08] w-full text-slate-400 text-xs font-mono">
              <span className="text-slate-500">Links:</span>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="text-slate-500 hidden sm:inline">Chennai, India</span>
            </div>
          </motion.div>

          {/* Right Column: Floating macOS Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[580px]">
              <MacTerminal />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
