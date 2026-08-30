import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId;
    const move = (e) => {
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX - 20);
        mouseY.set(e.clientY - 20);
        dotX.set(e.clientX - 4);
        dotY.set(e.clientY - 4);
      });
    };

    const handleMouseEnterLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-hover');
      }
    };
    const handleMouseLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', move);

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    addLinkListeners();
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, [mouseX, mouseY, dotX, dotY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
