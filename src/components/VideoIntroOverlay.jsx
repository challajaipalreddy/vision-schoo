import React, { useState, useRef, useEffect } from 'react';

export default function VideoIntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Enable sound and play video automatically
    const startAudioVideo = async () => {
      if (videoRef.current) {
        videoRef.current.muted = false; // Enable audio / sound out loud
        try {
          await videoRef.current.play();
        } catch (err) {
          // If browser policy blocks unmuted autoplay before user click, fallback to muted then unmute
          console.log("Unmuted autoplay restricted, attempting playback:", err);
          videoRef.current.muted = true;
          await videoRef.current.play().catch(() => {});
        }
      }
    };

    startAudioVideo();

    // Global listener: First user tap/click on screen immediately unmutes and plays audio
    const handleGlobalInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleGlobalInteraction, { once: true });
    window.addEventListener('touchstart', handleGlobalInteraction, { once: true });

    // Safety timeout: Ensure site opens even on slow network connections
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 15000);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('click', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
    };
  }, []);

  const finishIntro = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  const handleScreenClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleScreenClick}
      className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center overflow-hidden cursor-pointer select-none transition-opacity duration-500"
    >
      {/* Clean Fullscreen Video without any bars, text, or overlay elements */}
      <video
        ref={videoRef}
        src="/school_intro.mp4"
        autoPlay
        playsInline
        preload="auto"
        onEnded={finishIntro}
        onError={finishIntro}
        className="w-full h-full object-contain max-h-screen"
      />
    </div>
  );
}
