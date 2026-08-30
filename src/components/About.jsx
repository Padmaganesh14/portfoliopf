import { motion } from 'framer-motion';
import { profileData } from '../data';
import { GraduationCap, Code, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { useState } from 'react';

const codeSnippet = `const developer = {
  name: "${profileData.name}",
  role: "Full Stack Developer",
  focus: ["Cloud Computing", "AWS", "AI", "Automation", "Web Development"],
  location: "${profileData.location}",
  education: {
    degree: "B.Tech Computer Science & Engineering",
    institution: "B.S. Abdur Rahman Crescent Institute of Science & Technology",
    cgpa: "8.76 (till 3rd sem)",
    period: "2024 - 2028"
  },
  careerGoal: "Cloud Computing / AWS Internships",
  status: "Actively seeking Cloud & AWS Internship Opportunities"
};`;

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="about" className="py-28 md:py-32 relative overflow-hidden bg-transparent scroll-mt-20">
      <div className="container mx-auto px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="section-tag">
            <Terminal size={13} />
            <span>cat about.json</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Passionate developer combining modern full-stack web technologies with AI automation to build practical, scalable software.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Code Representation Block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 dev-card overflow-hidden bg-[#0D1117]/90 border-white/[0.08]"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-white/[0.08]">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span>developer.ts</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="Copy Code"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-300 bg-[#070A0F]/95">
              <code>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">developer</span> = &#123;{'\n'}
                {'  '}<span className="text-sky-300">name</span>: <span className="text-emerald-300">"{profileData.name}"</span>,{'\n'}
                {'  '}<span className="text-sky-300">role</span>: <span className="text-emerald-300">"Full Stack Developer"</span>,{'\n'}
                {'  '}<span className="text-sky-300">focus</span>: [<span className="text-emerald-300">"Cloud Computing"</span>, <span className="text-emerald-300">"AWS"</span>, <span className="text-emerald-300">"AI"</span>, <span className="text-emerald-300">"Automation"</span>],{'\n'}
                {'  '}<span className="text-sky-300">location</span>: <span className="text-emerald-300">"{profileData.location}"</span>,{'\n'}
                {'  '}<span className="text-sky-300">education</span>: &#123;{'\n'}
                {'    '}<span className="text-sky-300">degree</span>: <span className="text-emerald-300">"B.Tech Computer Science &amp; Eng."</span>,{'\n'}
                {'    '}<span className="text-sky-300">institution</span>: <span className="text-emerald-300">"B.S. Abdur Rahman Crescent Inst."</span>,{'\n'}
                {'    '}<span className="text-sky-300">cgpa</span>: <span className="text-amber-300">"8.76 (till 3rd sem)"</span>,{'\n'}
                {'    '}<span className="text-sky-300">period</span>: <span className="text-emerald-300">"2024 - 2028"</span>{'\n'}
                {'  '}&#125;,{'\n'}
                {'  '}<span className="text-sky-300">careerGoal</span>: <span className="text-sky-300">"Cloud Computing / AWS Internships"</span>,{'\n'}
                {'  '}<span className="text-sky-300">status</span>: <span className="text-emerald-300">"Actively seeking Cloud &amp; AWS Internships"</span>{'\n'}
                &#125;;
              </code>
            </pre>
          </motion.div>

          {/* Right: Bio & Education Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Bio Card */}
            <div className="dev-card p-6 sm:p-7 bg-[#0D1117]/90 border-white/[0.08]">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                <Sparkles size={18} className="text-[#8B5CF6]" />
                <span>Background &amp; Philosophy</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                I am a Computer Science student with a strong foundation in full-stack web architecture, cloud deployment, and automated AI systems.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether creating intelligent workflow platforms like <strong className="text-white">GrievancePilot</strong> (GDG Hackathon 2026 Finalist) or biometric KYC verification engines like <strong className="text-white">Verifixa</strong> (Saveetha Top 60 Finalist), I focus on building robust, high-performance solutions designed for real-world impact.
              </p>
            </div>

            {/* Education Card */}
            <div className="dev-card p-6 sm:p-7 bg-[#0D1117]/90 border-white/[0.08]">
              <div className="flex items-center gap-2 text-[#8B5CF6] font-mono text-xs mb-3 font-semibold">
                <GraduationCap size={16} />
                <span>EDUCATION</span>
              </div>

              {profileData.education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h4 className="text-base font-bold text-white font-display">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-500/10 text-[#8B5CF6] border border-purple-500/20">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-2">
                    {edu.institution}, {edu.location}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#4ADE80]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                    <span>CGPA: {edu.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
