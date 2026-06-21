import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Github, Linkedin, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { profileData } from '../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Active section tracker
    const sections = ['about', 'projects', 'skills', 'achievements', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-darker/70 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative text-2xl font-display font-black tracking-tight cursor-pointer"
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PG</span>
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/8 rounded-lg border border-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/8 transition-all duration-300"
            >
              <Github size={19} />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/8 transition-all duration-300"
            >
              <Linkedin size={19} />
            </a>
            <a
              href="/resume.pdf"
              download="Padma_Ganesh_Resume.pdf"
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_4px_20px_#6366f155] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/8 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden bg-darker/95 backdrop-blur-xl border-b border-white/8"
        >
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-white/8 mt-2">
              <a
                href="/resume.pdf"
                download="Padma_Ganesh_Resume.pdf"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-base font-semibold text-primary hover:text-white transition-colors"
              >
                <Download size={16} />
                Download Resume
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    </>
  );
}
