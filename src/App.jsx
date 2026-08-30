import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import IntroScreen from './components/IntroScreen';
import DeveloperBackground from './components/DeveloperBackground';
import BackgroundVideo from './components/BackgroundVideo';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    // Always start at top (HOME) exactly ONCE on initial load
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (window.location.hash && window.location.hash !== '#home') {
        window.history.replaceState(null, '', '#home');
      }
    }
  }, []);

  return (
    <div className="bg-transparent text-[#F5F7FA] min-h-screen selection:bg-purple-500/30 selection:text-white relative">
      {/* Reliable Hardware-Accelerated Background Video */}
      <BackgroundVideo />

      {/* Coder-Focused Ambient Background */}
      <DeveloperBackground />

      {/* Cinematic Developer Intro Overlay */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Content (Always rendered, revealed seamlessly) */}
      <div className="relative z-10">
        {/* Top Navbar */}
        <Navbar onReplayIntro={() => setShowIntro(true)} />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Achievements />
          <Certificates />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
