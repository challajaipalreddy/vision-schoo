import React, { useState, useRef, useEffect } from 'react';

export default function VideoIntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play video with audio enabled
    video.muted = false;
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for strict browser audio autoplay policies:
        // Start muted if blocked, then unmute on first user interaction (touch/click/scroll)
        video.muted = true;
        video.play();

        const enableAudioOnInteraction = () => {
          if (video) {
            video.muted = false;
          }
          window.removeEventListener('click', enableAudioOnInteraction);
          window.removeEventListener('touchstart', enableAudioOnInteraction);
          window.removeEventListener('keydown', enableAudioOnInteraction);
        };

        window.addEventListener('click', enableAudioOnInteraction, { once: true });
        window.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
        window.addEventListener('keydown', enableAudioOnInteraction, { once: true });
      });
    }
  }, []);

  const handleVideoEnded = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center overflow-hidden font-sans select-none">
      {/* Pure Fullscreen Video with Sound & Zero Overlays/Bars */}
      <video
        ref={videoRef}
        src="/school_intro.mp4"
        autoPlay
        playsInline
        onEnded={handleVideoEnded}
        className="w-full h-full object-contain max-h-screen"
      />
    </div>
  );
}
