
import React, { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PixelVideoBackgroundProps {
  videoSrc: string;
}

const PixelVideoBackground: React.FC<PixelVideoBackgroundProps> = ({ videoSrc }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleLoad = () => setIsLoaded(true);
      videoElement.addEventListener('loadeddata', handleLoad);
      
      // Preload video for better performance
      videoElement.preload = 'auto';
      
      // Reduce quality on mobile for better performance
      if (isMobile) {
        videoElement.style.filter = 'brightness(0.4) contrast(1.1) blur(1px)';
      }

      return () => videoElement.removeEventListener('loadeddata', handleLoad);
    }
  }, [isMobile]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video Background */}
      <video 
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay 
        muted 
        loop 
        playsInline
        style={{ 
          imageRendering: 'pixelated',
          filter: 'brightness(0.4) contrast(1.1)',
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
        poster="/placeholder.svg"
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
