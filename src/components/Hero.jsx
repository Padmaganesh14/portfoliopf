import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { profileData } from '../data';
import { ChevronRight, Download, Github, Linkedin, ArrowDown } from 'lucide-react';

// ─── Typing Text ──────────────────────────────────────────────────────────────
const roles = [
  'Full Stack Developer',
  'React Enthusiast',
  'ML Explorer',
  'Problem Solver',
  'Open Source Contributor',
];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="typing-text">
      {displayed}
      <span className="typing-cursor">|</span>
    </span>
  );
}

// ─── Canvas Particle System ───────────────────────────────────────────────────
function ParticleCanvas({ mouseRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // willReadFrequently false + alpha true for compositing perf
    const ctx = canvas.getContext('2d', { alpha: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Smaller pool — sweet-spot between density and frame rate
    const COUNT = 35;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.0 + 0.5,      // core radius
      opacity: Math.random() * 0.6 + 0.15,
      isPrimary: Math.random() > 0.5,
    }));

    let animId;
    const animate = () => {
      // Clear instead of fade for better performance
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current?.x ?? -9999;
      const my = mouseRef.current?.y ?? -9999;
      const REPEL_R = 130;

      particles.forEach((p) => {
        // Mouse repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_R && dist > 0) {
          const force = ((REPEL_R - dist) / REPEL_R) * 2.5;
          p.vx += (dx / dist) * force * 0.065;
          p.vy += (dy / dist) * force * 0.065;
        }

        // Gentle random drift
        p.vx += (Math.random() - 0.5) * 0.035;
        p.vy += (Math.random() - 0.5) * 0.035;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.8) { p.vx = (p.vx / spd) * 1.8; p.vy = (p.vy / spd) * 1.8; }

        // Smooth damping
        p.vx *= 0.972;
        p.vy *= 0.972;

        p.x += p.vx;
        p.y += p.vy;

        // Soft wrap
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // GPU-friendly glow: layered alpha circles (no shadowBlur)
        const r   = p.r;
        const op  = p.opacity;
        const rgb = p.isPrimary ? '99,102,241' : '236,72,153';

        // Outer halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${op * 0.08})`;
        ctx.fill();

        // Mid glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${op * 0.22})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${op})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        // Force GPU-composited layer
        transform: 'translateZ(0)', willChange: 'transform',
      }}
    />
  );
}

// ─── Floating Geometric Shapes ────────────────────────────────────────────────
const SHAPES = [
  { circle: true,  size: 64, x: '7%',  y: '18%', c: 'primary',   d: 0,   dur: 8.5  },
  { circle: false, size: 42, x: '91%', y: '14%', c: 'secondary', d: 1.5, dur: 7.2  },
  { circle: true,  size: 22, x: '86%', y: '72%', c: 'primary',   d: 0.7, dur: 9.4  },
  { circle: false, size: 32, x: '4%',  y: '76%', c: 'secondary', d: 2.1, dur: 6.8  },
];

function FloatingShapes({ bgX, bgY }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ x: bgX, y: bgY, zIndex: 2 }}
    >
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            borderRadius: s.circle ? '50%' : '8px',
            rotate: s.circle ? 0 : 45,
            border: `1.5px solid ${s.c === 'primary' ? 'rgba(99,102,241,0.38)' : 'rgba(236,72,153,0.38)'}`,
            background: s.c === 'primary'
              ? 'rgba(99,102,241,0.06)'
              : 'rgba(236,72,153,0.06)',
            boxShadow: s.c === 'primary'
              ? '0 0 24px rgba(99,102,241,0.22), inset 0 0 18px rgba(99,102,241,0.06)'
              : '0 0 24px rgba(236,72,153,0.22), inset 0 0 18px rgba(236,72,153,0.06)',
          }}
          animate={{
            y: -(14 + s.size * 0.15),
            rotate: s.circle ? 0 : 90,
            scale: 1.07,
          }}
          transition={{
            duration: s.dur,
            delay: s.d,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── Light Streaks ────────────────────────────────────────────────────────────
function LightStreaks() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="light-streak"
          style={{
            top: `${12 + i * 16}%`,
            animationDelay: `${i * 2.1}s`,
            animationDuration: `${9 + i * 2.2}s`,
            opacity: 0.1 + i * 0.025,
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const tickingRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // High damping, low stiffness = butter-smooth, no oscillation
  const springX = useSpring(mouseX, { stiffness: 20, damping: 35, restDelta: 0.001 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 35, restDelta: 0.001 });

  // Narrower range so movement is subtle and never jarring
  const textX = useTransform(springX, [-600, 600], [-14, 14]);
  const textY = useTransform(springY, [-400, 400], [-10, 10]);
  const bgX  = useTransform(springX, [-600, 600], [10, -10]);
  const bgY  = useTransform(springY, [-400, 400], [7,  -7]);

  const handleMouseMove = (e) => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated multi-stop background */}
      <div className="hero-bg-gradient" />

      {/* Futuristic grid overlay */}
      <div className="hero-grid" />

      {/* Ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.35, 1], rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="blob blob-1"
        style={{ zIndex: 1 }}
      />
      <motion.div
        animate={{ scale: [1, 1.45, 1], rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="blob blob-2"
        style={{ zIndex: 1 }}
      />
      <motion.div
        animate={{ scale: 1.25, y: 50 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: [0.45, 0, 0.55, 1] }}
        className="blob blob-3"
        style={{ zIndex: 1 }}
      />

      {/* Canvas particle field */}
      <ParticleCanvas mouseRef={mouseRef} />

      {/* Light streaks */}
      {/* <LightStreaks /> */}

      {/* Floating geometric shapes — slow parallax layer */}
      <FloatingShapes bgX={bgX} bgY={bgY} />

      {/* ── Hero content — faster parallax layer ── */}
      <motion.div
        style={{ x: textX, y: textY, position: 'relative', zIndex: 10, width: '100%' }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-10 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            {/* Name — floats in zero-gravity + neon glow */}
            <motion.div
              animate={{ y: -18 }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: [0.45, 0, 0.55, 1],
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 45 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="neon-name-wrapper"
              >
                <h1 className="hero-name">
                  {profileData.name.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? 'hero-name-gradient' : 'hero-name-white'}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
              </motion.div>
            </motion.div>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl font-display font-medium text-muted mb-6 h-10 flex items-center justify-center gap-2"
            >
              <span className="text-white/50">I'm a</span>
              <TypingText />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Building efficient, real-world technical solutions with a focus on{' '}
              <span className="text-primary font-semibold">impact</span> and{' '}
              <span className="text-secondary font-semibold">innovation</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <a href="#projects" className="btn btn-primary flex items-center gap-2 group text-base px-8 py-4">
                View My Work
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
<<<<<<< HEAD
            href="/resume.pdf"
           download="Padma_Ganesh_Resume.pdf"
           className="btn btn-outline flex items-center gap-2 group hover:border-primary text-base px-8 py-4"
>
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                Download Resume
              </a>
=======
  href="/resume.pdf"
  download="Padma_Ganesh_Resume.pdf"
  className="btn btn-outline flex items-center gap-2 group hover:border-primary text-base px-8 py-4"
>
  <Download
    size={18}
    className="group-hover:-translate-y-0.5 transition-transform duration-300"
  />
  Download Resume
</a>
>>>>>>> ab0eb73 (Added certificates)
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center justify-center gap-6"
            >
              <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <Github size={22} />
              </a>
              <div className="w-px h-6 bg-white/10" />
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <Linkedin size={22} />
              </a>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: 40, left: '50%', translateX: '-50%', zIndex: 10 }}
        className="flex flex-col items-center gap-2 text-muted -translate-x-1/2"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
