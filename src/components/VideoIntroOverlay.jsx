import React, { useState, useRef, useEffect } from 'react';

export default function VideoIntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Guaranteed 100% video autoplay start across all browsers
    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Attempt immediate un-mute for sound
        try {
          video.muted = false;
        } catch {
          // If browser requires user interaction for audio, unmute on any movement/touch/click
        }

        const enableAudio = () => {
          if (video) {
            video.muted = false;
          }
          window.removeEventListener('mousemove', enableAudio);
          window.removeEventListener('pointermove', enableAudio);
          window.removeEventListener('touchstart', enableAudio);
          window.removeEventListener('click', enableAudio);
          window.removeEventListener('scroll', enableAudio);
        };

        window.addEventListener('mousemove', enableAudio, { once: true });
        window.addEventListener('pointermove', enableAudio, { once: true });
        window.addEventListener('touchstart', enableAudio, { once: true });
        window.addEventListener('click', enableAudio, { once: true });
        window.addEventListener('scroll', enableAudio, { once: true });
      }).catch((err) => {
        console.log("Autoplay fallback:", err);
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
    <div className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center overflow-hidden font-sans select-none pointer-events-none">
      <video
        ref={videoRef}
        src="/school_intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="w-full h-full object-contain max-h-screen"
      />
    </div>
  );
}
