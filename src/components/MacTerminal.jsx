import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Terminal as TerminalIcon } from 'lucide-react';

const terminalScript = [
  {
    command: 'cat career-goal.txt',
    output: [
      { text: 'TARGET ROLES:', color: 'text-sky-300 font-bold' },
      { text: '  → Cloud Computing Intern', color: 'text-slate-200 text-xs' },
      { text: '  → AWS Cloud Architecture Intern', color: 'text-slate-200 text-xs' },
      { text: '  → Full Stack & Cloud Intern', color: 'text-slate-200 text-xs' },
      { text: 'STATUS:', color: 'text-[#4ADE80] font-bold mt-1' },
      { text: '  ● Actively seeking Cloud & AWS Internship Opportunities', color: 'text-[#4ADE80] font-semibold text-xs' }
    ]
  },
  {
    command: 'projects --featured',
    output: [
      { text: '★ GrievancePilot (GDG Finalist 2026)', color: 'text-amber-300 font-bold' },
      { text: '  AI-Powered Grievance Redressal & Automated Routing', color: 'text-slate-300 text-xs' },
      { text: '★ Verifixa (Saveetha Top 60 Finalist)', color: 'text-sky-300 font-bold' },
      { text: '  AI-Powered Digital KYC & Biometric Identity Verification', color: 'text-slate-300 text-xs' }
    ]
  },
  {
    command: 'cat stack.txt',
    output: [
      { text: 'AWS • Cloud Infra • React.js • Node.js • Python • MongoDB • Docker • n8n', color: 'text-[#8B5CF6] font-medium' }
    ]
  },
  {
    command: 'git log --oneline -n 2',
    output: [
      { text: '✓ 8Queens Software — Cloud Computing (AWS) Intern', color: 'text-sky-300' },
      { text: '✓ Finalist — GDG Hackathon 2026 (GrievancePilot)', color: 'text-emerald-400' }
    ]
  }
];

export default function MacTerminal() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const terminalBodyRef = useRef(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setCompletedSteps(terminalScript);
      setIsFinished(true);
    }
  }, []);

  // Sequential typing effect
  useEffect(() => {
    if (prefersReducedMotion || isFinished) return;

    if (currentStepIndex >= terminalScript.length) {
      setIsFinished(true);
      return;
    }

    const currentItem = terminalScript[currentStepIndex];
    const fullCommand = currentItem.command;

    if (typedText.length < fullCommand.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullCommand.slice(0, typedText.length + 1));
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timeout);
    } else {
      const pauseTimeout = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentItem]);
        setTypedText('');
        setCurrentStepIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(pauseTimeout);
    }
  }, [typedText, currentStepIndex, isFinished, prefersReducedMotion]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [completedSteps, typedText]);

  const handleRestart = () => {
    setCompletedSteps([]);
    setCurrentStepIndex(0);
    setTypedText('');
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mac-terminal shadow-2xl relative rounded-xl border border-white/[0.08] bg-[#0D1117]/95 backdrop-blur-md overflow-hidden group hover:border-purple-500/30 hover:shadow-[0_25px_60px_-15px_rgba(139,92,246,0.18)] transition-all duration-300">
      {/* macOS Terminal Window Header */}
      <div className="mac-terminal-header justify-between select-none bg-[#111827] border-b border-white/[0.07] px-4 py-2.5 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-medium">
          <TerminalIcon size={12} className="text-slate-500" />
          <span>padma-ganesh — zsh — 80x24</span>
        </div>

        <button
          onClick={handleRestart}
          title="Replay Terminal Animation"
          className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded hover:bg-white/[0.06]"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Terminal Content Body */}
      <div
        ref={terminalBodyRef}
        className="p-5 md:p-6 font-mono text-xs sm:text-[13px] leading-relaxed max-h-[360px] sm:max-h-[400px] overflow-y-auto bg-[#070A0F]/95 text-[#F5F7FA]"
      >
        {/* Completed Steps */}
        {completedSteps.map((step, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-[#4ADE80] font-bold">ganesh@portfolio</span>
              <span className="text-slate-500">~ %</span>
              <span className="text-white font-medium">{step.command}</span>
            </div>
            <div className="mt-1 pl-2 border-l border-white/[0.08] space-y-0.5">
              {step.output.map((line, outIdx) => (
                <div key={outIdx} className={line.color}>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Current Active Command Typing */}
        {!isFinished && currentStepIndex < terminalScript.length && (
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[#4ADE80] font-bold">ganesh@portfolio</span>
            <span className="text-slate-500">~ %</span>
            <span className="text-white font-medium">{typedText}</span>
            <span className="inline-block w-2 h-4 bg-[#8B5CF6] animate-pulse ml-0.5" />
          </div>
        )}

        {/* Finished State Idle Prompt */}
        {isFinished && (
          <div className="flex items-center gap-2 text-slate-300 mt-2">
            <span className="text-[#4ADE80] font-bold">ganesh@portfolio</span>
            <span className="text-slate-500">~ %</span>
            <span className="inline-block w-2 h-4 bg-[#4ADE80] animate-pulse ml-0.5" />
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="px-4 py-1.5 bg-[#111827] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            zsh
          </span>
          <span>UTF-8</span>
        </div>
        <span className="text-slate-400">Padma Ganesh P</span>
      </div>
    </div>
  );
}
