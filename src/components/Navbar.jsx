import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText, Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { profileData } from '../data';

export const NAV_LINKS = [
  { name: 'HOME', href: '#home', id: 'home' },
  { name: 'ABOUT', href: '#about', id: 'about' },
  { name: 'PROJECTS', href: '#projects', id: 'projects' },
  { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
  { name: 'SKILLS', href: '#skills', id: 'skills' },
  { name: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
  { name: 'CERTIFICATES', href: '#certificates', id: 'certificates' },
  { name: 'CONTACT', href: '#contact', id: 'contact' },
];

export default function Navbar({ onReplayIntro }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const activeSectionRef = useRef('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const navLinks = NAV_LINKS;
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Lock scroll spy during programmatic smooth scrolling
      if (isManualScrollingRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Top of page -> HOME
      if (scrollY < 120) {
        if (activeSectionRef.current !== 'home') {
          activeSectionRef.current = 'home';
          setActiveSection('home');
          if (window.location.hash !== '#home' && window.location.hash !== '') {
            window.history.replaceState(null, '', '#home');
          }
        }
        return;
      }

      // 2. Bottom of page -> CONTACT
      if (scrollY + viewportHeight >= docHeight - 80) {
        if (activeSectionRef.current !== 'contact') {
          activeSectionRef.current = 'contact';
          setActiveSection('contact');
          if (window.location.hash !== '#contact') {
            window.history.replaceState(null, '', '#contact');
          }
        }
        return;
      }

      // 3. Focal point check (~35% viewport offset)
      const focalPoint = scrollY + viewportHeight * 0.35;
      let matched = null;

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (focalPoint >= top && focalPoint < top + height) {
            matched = link.id;
            break;
          }
        }
      }

      // Fallback: maximum visible section in viewport
      if (!matched) {
        let maxVisibleHeight = -1;
        for (const link of NAV_LINKS) {
          const el = document.getElementById(link.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              matched = link.id;
            }
          }
        }
      }

      if (matched && matched !== activeSectionRef.current) {
        activeSectionRef.current = matched;
        setActiveSection(matched);
        if (window.location.hash !== `#${matched}`) {
          window.history.replaceState(null, '', `#${matched}`);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle browser back/forward buttons
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const match = NAV_LINKS.find((l) => l.id === hash);
      if (match) {
        activeSectionRef.current = match.id;
        setActiveSection(match.id);
        const el = document.getElementById(match.id);
        if (el) {
          const navHeight = 75;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({
            top: match.id === 'home' ? 0 : offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []); // Run ONCE on mount

  const handleNavClick = (e, link) => {
    e.preventDefault();
    activeSectionRef.current = link.id;
    setActiveSection(link.id);
    setIsOpen(false);

    // Update browser URL immediately
    window.history.pushState(null, '', link.href);

    // Lock scroll spy during smooth scroll transition
    isManualScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 850);

    const el = document.getElementById(link.id);
    if (el) {
      const navHeight = 75;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: link.id === 'home' ? 0 : offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#39FF88] z-[80] origin-left shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-2.5 sm:py-3 bg-[#050505]/92 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-3.5 sm:py-4 bg-[#050505]/70 backdrop-blur-md border-b border-white/[0.04]'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] flex justify-between items-center">
          
          {/* Left: Brand Identity */}
          <button
            onClick={() => {
              if (onReplayIntro) onReplayIntro();
              activeSectionRef.current = 'home';
              setActiveSection('home');
              window.history.pushState(null, '', '#home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 text-left cursor-pointer select-none shrink-0"
            title="Replay intro / Back to top"
          >
            <span className="font-mono text-xs text-[#39FF88] font-bold bg-[#39FF88]/10 border border-[#39FF88]/20 px-2 py-0.5 rounded flex items-center gap-1 group-hover:border-[#39FF88]/40 transition-all">
              <Terminal size={11} className="text-[#39FF88]" />
              <span>PG</span>
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold font-display tracking-tight text-sm sm:text-base">
                Padma Ganesh
              </span>
              <span className="text-[#8B5CF6] font-mono text-xs hidden sm:inline-block">.</span>
            </div>
          </button>

          {/* Center: Direct Desktop Navigation Bar (Always visible on Desktop >= 1024px) */}
          <ul className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-300 block select-none ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-slate-400 hover:text-white hover:-translate-y-[1px]'
                    }`}
                  >
                    {/* Active Section Background Glow Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/45 shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: Actions (GitHub, LinkedIn, Resume) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="GitHub Profile"
            >
              <Github size={16} />
            </a>
            
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1] transition-all"
            >
              <FileText size={12} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile/Tablet Hamburger Button (Only on screens < 1024px) */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Animated Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden bg-[#050505]/98 backdrop-blur-2xl border-b border-white/[0.08]"
            >
              <ul className="flex flex-col px-6 py-4 gap-1.5 font-mono text-xs">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                            : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="text-[#8B5CF6] text-xs">●</span>}
                      </a>
                    </li>
                  );
                })}
                
                {/* Mobile Bottom Links */}
                <li className="pt-3 border-t border-white/[0.08] mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06]"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06]"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-black font-bold"
                  >
                    <FileText size={13} />
                    <span>Resume PDF</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
