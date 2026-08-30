import { useEffect, useRef, useState } from 'react';

/**
 * ScrollScrubVideo
 *
 * Ultra-smooth, stutter-free scroll-controlled background video.
 * - Hardware-synchronized decoder seeking (waits for 'seeked' event before next seek)
 * - Safe fallback timeout to prevent any decoder lockup
 * - Fast linear interpolation (diff * 0.22) for responsive scrubbing
 * - Lightweight readability overlays (~30%) for bright, vibrant visuals
 * - Fixed background (z-0, pointer-events-none)
 */
export default function ScrollScrubVideo() {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const seekSafetyTimeoutRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict no-autoplay: playback is driven entirely by scroll position
    video.pause();
    video.currentTime = 0;

    // Calculate target video timestamp based on overall page scroll
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0 || !video.duration || !Number.isFinite(video.duration)) {
        return;
      }

      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      targetTimeRef.current = progress * video.duration;
    };

    // Hardware-synchronized seeking loop:
    // Only seeks when the previous seek has completed to eliminate lag/stutter
    const updateVideo = () => {
      const vid = videoRef.current;

      if (
        vid &&
        !vid.seeking &&
        !isSeekingRef.current &&
        vid.readyState >= 2 &&
        Number.isFinite(vid.duration) &&
        vid.duration > 0
      ) {
        const target = targetTimeRef.current;
        const current = vid.currentTime;
        const difference = target - current;

        // Threshold of 0.02s (~half a frame) prevents redundant micro-seeking
        if (Math.abs(difference) > 0.02) {
          isSeekingRef.current = true;
          const nextTime = Math.min(Math.max(current + difference * 0.22, 0), vid.duration);
          vid.currentTime = nextTime;

          // Decoder safety watchdog: resets seeking lock if browser misses 'seeked' event
          if (seekSafetyTimeoutRef.current) clearTimeout(seekSafetyTimeoutRef.current);
          seekSafetyTimeoutRef.current = setTimeout(() => {
            isSeekingRef.current = false;
          }, 45);
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateVideo);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (seekSafetyTimeoutRef.current) {
        clearTimeout(seekSafetyTimeoutRef.current);
      }
    };

    const handleMetadata = () => {
      setIsLoaded(true);
      if (video.duration && Number.isFinite(video.duration)) {
        targetTimeRef.current = 0;
        video.currentTime = 0;
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

    animationFrameRef.current = requestAnimationFrame(updateVideo);

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

      if (seekSafetyTimeoutRef.current) {
        clearTimeout(seekSafetyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none bg-[#03060d]"
    >
      {/* ─── FULL-SCREEN CODING VIDEO ─── */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          opacity: isLoaded ? 0.88 : 0,
        }}
      >
        <source src="/videos/codingvideo.mp4" type="video/mp4" />
      </video>

      {/* ─── LIGHTWEIGHT READABILITY OVERLAYS (Bright & Vibrant ~30%) ─── */}
      <div className="absolute inset-0 bg-[#050816]/30 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/20 via-transparent to-[#050816]/35 pointer-events-none" />
    </div>
  );
}
