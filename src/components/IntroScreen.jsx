import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Check, ArrowRight } from 'lucide-react';

const NAME_STRING = "PADMA GANESH P";

const BOOT_STEPS = [
  { text: "Connecting...", doneText: "Identity verified", delay: 1850 },
  { text: "Loading projects...", doneText: "5 projects loaded (GrievancePilot, Verifixa)", delay: 2100 },
  { text: "Loading achievements...", doneText: "GDG Hackathon Finalist & honors verified", delay: 2350 },
  { text: "Starting developer experience...", doneText: "Portfolio ready", delay: 2550 },
];

export default function IntroScreen({ onComplete }) {
  const [typedCommand, setTypedCommand] = useState('');
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [nameLocked, setNameLocked] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [activeBootIndex, setActiveBootIndex] = useState(0);

  // Keyboard skip listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  // Reduced motion check
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
    }
  }, [onComplete]);

  // 1. Type "whoami" command (0.2s - 0.7s)
  useEffect(() => {
    const target = "whoami";
    let index = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < target.length) {
          setTypedCommand(target.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 65);
    }, 250);

    return () => clearTimeout(startTimeout);
  }, []);

  // 2. Animate name letter-by-letter (0.85s - 1.65s)
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < NAME_STRING.length) {
          setRevealedLetters((prev) => prev + 1);
          count++;
        } else {
          clearInterval(interval);
          setNameLocked(true);
        }
      }, 50);
    }, 850);

    return () => clearTimeout(startTimeout);
  }, []);

  // 3. Show Role & Focus (1.65s)
  useEffect(() => {
    const roleTimeout = setTimeout(() => {
      setShowRole(true);
    }, 1650);
    return () => clearTimeout(roleTimeout);
  }, []);

  // 4. Boot Step Sequence (1.85s - 2.6s)
  useEffect(() => {
    const timeouts = BOOT_STEPS.map((step, idx) => {
      return setTimeout(() => {
        setActiveBootIndex(idx + 1);
      }, step.delay);
    });

    const finishTimeout = setTimeout(() => {
      onComplete();
    }, 2850);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.03,
        filter: "blur(4px)",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
      }}
      onClick={onComplete}
      className="fixed inset-0 z-[100] bg-[#070A0F] flex flex-col items-center justify-center p-5 select-none overflow-hidden cursor-pointer"
    >
      {/* Subtle Slow Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-900/[0.08] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-sky-900/[0.06] rounded-full blur-[130px] pointer-events-none" />

      {/* Terminal Window Card Frame */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-[#0D1117]/95 rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden backdrop-blur-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS Terminal Window Header */}
        <div className="px-4 py-3 bg-[#111827] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1aab29]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Terminal size={12} className="text-slate-500" />
            <span>ganesh@portfolio — zsh — boot</span>
          </div>
          <div className="w-12 text-right">
            <span className="text-[10px] font-mono text-slate-500">v2.6</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 font-mono space-y-6">
          
          {/* Prompt 1: whoami */}
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <span className="text-[#4ADE80] font-bold">ganesh@portfolio</span>
              <span className="text-slate-500">~ %</span>
              <span className="text-white font-medium">{typedCommand}</span>
              {typedCommand.length < 6 && (
                <span className="w-2 h-4 bg-[#8B5CF6] inline-block animate-pulse ml-0.5" />
              )}
            </div>

            {/* Letter-by-Letter Name Reveal */}
            <div className="mt-4 pt-2">
              <div 
                className={`font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#F5F7FA] tracking-tight uppercase transition-all duration-500 flex flex-wrap items-center justify-start gap-x-3 ${
                  nameLocked ? "drop-shadow-[0_0_25px_rgba(139,92,246,0.35)]" : ""
                }`}
              >
                {/* Word 1: PADMA */}
                <span className="inline-flex whitespace-nowrap">
                  {NAME_STRING.slice(0, 5).split('').map((char, i) => (
                    <span
                      key={i}
                      className={`inline-block transition-all duration-200 ${
                        i < revealedLetters 
                          ? "opacity-100 translate-y-0 filter-none" 
                          : "opacity-0 translate-y-3 blur-sm"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </span>

                {/* Word 2: GANESH */}
                <span className="inline-flex whitespace-nowrap">
                  {NAME_STRING.slice(6, 12).split('').map((char, i) => {
                    const globalIdx = 6 + i;
                    return (
                      <span
                        key={globalIdx}
                        className={`inline-block transition-all duration-200 ${
                          globalIdx < revealedLetters 
                            ? "opacity-100 translate-y-0 filter-none" 
                            : "opacity-0 translate-y-3 blur-sm"
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>

                {/* Word 3: P */}
                <span className="inline-flex whitespace-nowrap text-[#8B5CF6]">
                  {NAME_STRING.slice(13, 14).split('').map((char, i) => {
                    const globalIdx = 13 + i;
                    return (
                      <span
                        key={globalIdx}
                        className={`inline-block transition-all duration-200 ${
                          globalIdx < revealedLetters 
                            ? "opacity-100 translate-y-0 filter-none" 
                            : "opacity-0 translate-y-3 blur-sm"
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Prompt 2: echo $ROLE */}
          <AnimatePresence>
            {showRole && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2 border-t border-white/[0.06]"
              >
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span className="text-[#4ADE80] font-bold">ganesh@portfolio</span>
                  <span className="text-slate-500">~ %</span>
                  <span className="text-slate-300">echo $ROLE &amp;&amp; echo $FOCUS</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#8B5CF6] uppercase tracking-wider pl-2 border-l border-[#8B5CF6]/40">
                  Full Stack Developer <span className="text-slate-500">•</span> Cloud &amp; AWS <span className="text-slate-500">•</span> AI &amp; Automation
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Boot Steps Progress */}
          <AnimatePresence>
            {activeBootIndex > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5 pt-2 text-[11px] sm:text-xs"
              >
                {BOOT_STEPS.map((step, idx) => {
                  if (idx >= activeBootIndex) return null;
                  const isLatest = idx === activeBootIndex - 1 && activeBootIndex < BOOT_STEPS.length;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      {isLatest ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                          <span className="text-slate-400">{step.text}</span>
                        </>
                      ) : (
                        <>
                          <Check size={12} className="text-[#4ADE80]" />
                          <span className="text-slate-300">{step.doneText}</span>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Bottom bar with status indicator and skip tip */}
        <div className="px-4 py-2 bg-[#111827] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            <span>Booting developer environment</span>
          </div>
          <button
            onClick={onComplete}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Press Space or Click to skip</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </motion.div>

    </motion.div>
  );
}
