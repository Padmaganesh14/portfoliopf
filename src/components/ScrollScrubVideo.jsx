import { useEffect, useRef, useState } from 'react';

/**
 * ScrollScrubVideo
 *
 * High-performance, jitter-free scroll-controlled video background.
 * - Single requestAnimationFrame animation loop
 * - requestAnimationFrame throttled passive scroll listener
 * - Zero React state updates on scroll (pure ref-driven calculations)
 * - Threshold check (Math.abs(difference) > 0.003) to prevent micro-seeking stutter
 * - Preloaded with instant seek on mount (frame 0)
 * - Safe metadata & duration guards (never NaN or Infinity)
 * - Respects prefers-reduced-motion
 */
export default function ScrollScrubVideo({
  opacity = 0.50,
  smoothing = 0.08,
}) {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const scrollRafRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const SMOOTHING = smoothing;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict no-autoplay requirement: video is controlled purely by scroll
    video.pause();
    video.currentTime = 0;

    // Respect reduced-motion accessibility preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const updateTargetTime = () => {
      if (
        !video ||
        !video.duration ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) {
        return;
      }

      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        targetTimeRef.current = 0;
        return;
      }

      // Convert page scroll progress (0 to 1)
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // Map progress to video duration
      targetTimeRef.current = progress * video.duration;
    };

    // RAF-throttled scroll handler to prevent excessive calculation during fast scrolls
    const handleScroll = () => {
      if (!scrollRafRef.current) {
        scrollRafRef.current = requestAnimationFrame(() => {
          updateTargetTime();
          scrollRafRef.current = null;
        });
      }
    };

    const handleMetadata = () => {
      setIsLoaded(true);
      if (video.duration && Number.isFinite(video.duration)) {
        updateTargetTime();
      }
    };

    // Single requestAnimationFrame loop for smooth linear interpolation
    const updateVideo = () => {
      if (
        video &&
        video.readyState >= 2 &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const difference = target - current;

        // Only seek when difference is meaningful to prevent micro-seeking lag
        if (Math.abs(difference) > 0.003) {
          const nextTime = current + difference * SMOOTHING;
          video.currentTime = Math.min(Math.max(nextTime, 0), video.duration);
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateVideo);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('canplay', handleMetadata);
    video.addEventListener('loadeddata', handleMetadata);

    if (video.readyState >= 2) {
      handleMetadata();
    }

    animationFrameRef.current = requestAnimationFrame(updateVideo);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (video) {
        video.removeEventListener('loadedmetadata', handleMetadata);
        video.removeEventListener('canplay', handleMetadata);
        video.removeEventListener('loadeddata', handleMetadata);
      }

      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [SMOOTHING]);

  return (
    <div
      aria-hidden="true"
      className="scroll-video-container fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none bg-[#02040a]"
    >
      {/* ─── SCROLL-CONTROLLED BACKGROUND VIDEO ─── */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="w-full h-full object-cover object-center pointer-events-none transition-opacity duration-400 ease-out"
        style={{
          opacity: isLoaded ? opacity : 0,
        }}
      >
        <source src="/videos/codingvideo.mp4" type="video/mp4" />
      </video>

      {/* ─── LAYER 1: CINEMATIC DARK READABILITY OVERLAYS ─── */}
      <div
        className="video-dark-overlay absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(2, 4, 10, 0.90) 0%,
              rgba(2, 4, 10, 0.70) 40%,
              rgba(2, 4, 10, 0.65) 70%,
              rgba(2, 4, 10, 0.82) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.45) 0%,
              rgba(0, 0, 0, 0.65) 100%
            )
          `,
        }}
      />

      {/* ─── LAYER 2: PURPLE / BLUE GLOW OVERLAYS ─── */}
      <div
        className="video-glow-overlay absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 75% 45%,
              rgba(80, 90, 255, 0.10),
              transparent 40%
            ),
            radial-gradient(
              circle at 20% 70%,
              rgba(150, 60, 255, 0.08),
              transparent 40%
            )
          `,
        }}
      />
    </div>
  );
}
