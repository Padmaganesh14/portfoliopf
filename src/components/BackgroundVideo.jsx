import { useEffect, useRef, useState } from 'react';

/**
 * BackgroundVideo
 *
 * Smooth, reliable hardware-accelerated video background.
 * - Native continuous playback (autoPlay, muted, loop, playsInline)
 * - Safe play fallback on readyState/canplay
 * - Fixed background (z-0, pointer-events-none)
 * - Bright and visible (~25% overlay)
 */
function BackgroundVideo() {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const playVideo = async () => {
      try {
        setIsLoaded(true);
        await video.play();
      } catch (error) {
        console.log('Video autoplay waiting:', error);
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
      video.addEventListener('loadeddata', playVideo, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  return (
    <div className="video-background fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none bg-[#02040a]" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700 ease-out"
        style={{ opacity: isLoaded ? 0.90 : 1 }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        <source src="/videos/codingvideo.mp4" type="video/mp4" />
      </video>

      {/* Lightweight readability overlay (~25% to keep video vibrant) */}
      <div className="absolute inset-0 bg-[#02040a]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/15 via-transparent to-[#02040a]/30 pointer-events-none" />
    </div>
  );
}

export default BackgroundVideo;
