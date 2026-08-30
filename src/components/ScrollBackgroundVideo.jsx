import { useEffect, useRef, useState } from 'react';

/**
 * ScrollBackgroundVideo
 *
 * Cinematic, continuous playing background video with intelligent scroll synchronization.
 * - Native smooth playback at 30/60fps (no frame freezing or decoder lockups)
 * - Intelligent scroll-position synchronization without continuous destructive seeking
 * - Plays smoothly in the background; adjusts timeline on significant scroll transitions
 * - Vibrant, high-visibility developer aesthetic with lightweight ~20-25% overlays
 * - Fixed background (z-0, pointer-events-none, zero interaction interference)
 */
export default function ScrollBackgroundVideo() {
  const videoRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video playback immediately
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy or user interaction pending
      });
    }

    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        targetProgressRef.current = 0;
      } else {
        targetProgressRef.current = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      }

      lastScrollTimeRef.current = performance.now();
    };

    // Smooth RAF loop:
    // Balances continuous native playback with subtle scroll section alignment
    const animate = () => {
      const vid = videoRef.current;

      if (
        vid &&
        vid.readyState >= 2 &&
        Number.isFinite(vid.duration) &&
        vid.duration > 0
      ) {
        // Calculate progress difference
        const diff = targetProgressRef.current - currentProgressRef.current;
        currentProgressRef.current += diff * 0.08;

        const isUserScrolling = performance.now() - lastScrollTimeRef.current < 250;
        const targetTime = currentProgressRef.current * vid.duration;
        const timeDiff = targetTime - vid.currentTime;

        // When user scrolls significantly or navigates to a new section,
        // synchronize the video timeline without overwhelming the decoder
        if (isUserScrolling && Math.abs(timeDiff) > 0.5 && !isSeekingRef.current) {
          isSeekingRef.current = true;
          vid.currentTime = Math.min(Math.max(targetTime, 0), vid.duration);
        } else if (!isUserScrolling && vid.paused) {
          // Keep continuous smooth playback when user stops scrolling
          vid.play().catch(() => {});
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    const handleMetadata = () => {
      setIsLoaded(true);
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('canplay', handleMetadata);
    video.addEventListener('loadeddata', handleMetadata);

    if (video.readyState >= 2) {
      handleMetadata();
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (video) {
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('loadedmetadata', handleMetadata);
        video.removeEventListener('canplay', handleMetadata);
        video.removeEventListener('loadeddata', handleMetadata);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none bg-[#03060d]"
    >
      {/* ─── FULL-SCREEN CODING VIDEO (Continuous Smooth Playback) ─── */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          opacity: isLoaded ? 0.90 : 0,
        }}
      >
        <source src="/videos/codingvideo.mp4" type="video/mp4" />
      </video>

      {/* ─── LIGHTWEIGHT READABILITY OVERLAYS (Bright & Vibrant ~20%) ─── */}
      <div className="absolute inset-0 bg-[#050816]/20 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/10 via-transparent to-[#050816]/25 pointer-events-none" />
    </div>
  );
}
