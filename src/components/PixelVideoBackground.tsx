
import React, { useEffect, useState } from 'react';

interface PixelVideoBackgroundProps {
  videoSrc: string;
}

const PixelVideoBackground: React.FC<PixelVideoBackgroundProps> = ({ videoSrc }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        setIsLoaded(true);
      });
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => {
          setIsLoaded(true);
        });
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video Background */}
      <video 
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay 
        muted 
        loop 
        playsInline
        style={{ 
          imageRendering: 'pixelated',
          filter: 'brightness(0.4) contrast(1.1)',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Pixel overlay pattern */}
      <div className="absolute inset-0 pixel-bg-pattern opacity-40"></div>
      
      {/* Color overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-pink-500/20 to-cyan-500/30 opacity-60"></div>
    </div>
  );
};

export default PixelVideoBackground;
