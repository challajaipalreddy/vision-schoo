import React, { useState, useRef, useEffect } from 'react';

export default function VideoIntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force unmuted audio state
    video.muted = false;

    // Attempt unmuted play immediately
    const startAudioVideo = () => {
      video.play().catch((err) => {
        console.log("Browser policy blocked direct audio autoplay, listening for mouse/touch movement:", err);
        // Start playing video
        video.muted = true;
        video.play();

        // Immediately unmute & play audio on ANY mouse move, touch, key, or scroll
        const enableAudio = () => {
          if (video) {
            video.muted = false;
            video.play();
          }
          window.removeEventListener('pointermove', enableAudio);
          window.removeEventListener('pointerdown', enableAudio);
          window.removeEventListener('touchstart', enableAudio);
          window.removeEventListener('scroll', enableAudio);
          window.removeEventListener('keydown', enableAudio);
        };

        window.addEventListener('pointermove', enableAudio, { once: true });
        window.addEventListener('pointerdown', enableAudio, { once: true });
        window.addEventListener('touchstart', enableAudio, { once: true });
        window.addEventListener('scroll', enableAudio, { once: true });
        window.addEventListener('keydown', enableAudio, { once: true });
      });
    };

    startAudioVideo();
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
