import { useEffect, useRef, useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';

// Import custom styles
import '@/styles/rotating-cube.css';

interface RotatingCubeProps {
  size?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  faces?: {
    front: React.ReactNode;
    back: React.ReactNode;
    left: React.ReactNode;
    right: React.ReactNode;
    top: React.ReactNode;
    bottom: React.ReactNode;
  };
}

// Create memoized cube faces to prevent unnecessary re-renders
const CubeFace = memo(({ children, faceClass }: { children: React.ReactNode, faceClass: string }) => (
  <div className={`cube-face pixel-border-thin ${faceClass}`}>
    {children}
  </div>
));

CubeFace.displayName = 'CubeFace';

const RotatingCube: React.FC<RotatingCubeProps> = ({
  size = 200,
  autoRotate = true,
  autoRotateSpeed = 0.15, // Reduced for smoother rotation
  faces = {
    front: null,
    back: null,
    left: null,
    right: null,
    top: null,
    bottom: null,
  },
}) => {
  // Use refs for values that don't need to trigger re-renders
  const rotationRef = useRef({ x: -20, y: 45 });
  const [displayRotation, setDisplayRotation] = useState({ x: -20, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const startRotationRef = useRef({ x: 0, y: 0 });
  const cubeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  // Auto rotation with time-based animation for consistent speed
  useEffect(() => {
    if (autoRotate && !isDragging) {
      const animate = (timestamp: number) => {
        if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
        
        const delta = timestamp - lastFrameTimeRef.current;
        lastFrameTimeRef.current = timestamp;
        
        // Time-based animation for consistent speed regardless of frame rate
        const rotationAmount = (autoRotateSpeed * delta) / 16.67; // Normalized to 60fps
        
        rotationRef.current = {
          x: rotationRef.current.x,
          y: rotationRef.current.y + rotationAmount
        };
        
        // Only update state at a throttled rate to avoid excessive re-renders
        setDisplayRotation(rotationRef.current);
        
        frameRef.current = requestAnimationFrame(animate);
      };

      frameRef.current = requestAnimationFrame(animate);

      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }
  }, [autoRotate, isDragging, autoRotateSpeed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!autoRotate) return;
    
    setIsDragging(true);
    startPositionRef.current = { x: e.clientX, y: e.clientY };
    startRotationRef.current = { ...rotationRef.current };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !autoRotate) return;

    const deltaX = e.clientX - startPositionRef.current.x;
    const deltaY = e.clientY - startPositionRef.current.y;

    rotationRef.current = {
      x: startRotationRef.current.x - deltaY * 0.5, // Reversed for natural feel
      y: startRotationRef.current.y + deltaX * 0.5,
    };
    
    // Update display rotation for rendering
    setDisplayRotation(rotationRef.current);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!autoRotate || e.touches.length !== 1) return;
    
    setIsDragging(true);
    startPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    startRotationRef.current = { ...rotationRef.current };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !autoRotate || e.touches.length !== 1) return;
    e.preventDefault(); // Prevent scrolling while dragging

    const deltaX = e.touches[0].clientX - startPositionRef.current.x;
    const deltaY = e.touches[0].clientY - startPositionRef.current.y;

    rotationRef.current = {
      x: startRotationRef.current.x - deltaY * 0.5,
      y: startRotationRef.current.y + deltaX * 0.5,
    };
    
    setDisplayRotation(rotationRef.current);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchcancel', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchcancel', handleMouseUp);
    };
  }, []);

  // Default face content with pixel art style - memoized to prevent re-renders
  const defaultFaces = useMemo(() => ({
    front: faces.front || (
      <div className="flex items-center justify-center w-full h-full bg-indigo-900/80 text-white font-pixel">
        <span className="text-2xl">FRONT</span>
      </div>
    ),
    back: faces.back || (
      <div className="flex items-center justify-center w-full h-full bg-pink-900/80 text-white font-pixel">
        <span className="text-2xl">BACK</span>
      </div>
    ),
    left: faces.left || (
      <div className="flex items-center justify-center w-full h-full bg-purple-900/80 text-white font-pixel">
        <span className="text-2xl">LEFT</span>
      </div>
    ),
    right: faces.right || (
      <div className="flex items-center justify-center w-full h-full bg-blue-900/80 text-white font-pixel">
        <span className="text-2xl">RIGHT</span>
      </div>
    ),
    top: faces.top || (
      <div className="flex items-center justify-center w-full h-full bg-cyan-900/80 text-white font-pixel">
        <span className="text-2xl">TOP</span>
      </div>
    ),
    bottom: faces.bottom || (
      <div className="flex items-center justify-center w-full h-full bg-teal-900/80 text-white font-pixel">
        <span className="text-2xl">BOTTOM</span>
      </div>
    ),
  }), [faces]);

  // Set CSS variable for cube size
  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.style.setProperty('--cube-size-half', `${size / 2}px`);
    }
  }, [size]);

  return (
    <div 
      className="cube-perspective w-full flex items-center justify-center py-10"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div 
          ref={cubeRef}
          className={`relative cube-container cursor-grab active:cursor-grabbing ${isDragging ? 'cube-no-transition' : 'cube-smooth-transition'}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotateX(${displayRotation.x}deg) rotateY(${displayRotation.y}deg)`
          }}
        >
          {/* Use memoized CubeFace components for better performance */}
          <CubeFace faceClass="face-transform-front">
            {defaultFaces.front}
          </CubeFace>

          <CubeFace faceClass="face-transform-back">
            {defaultFaces.back}
          </CubeFace>

          <CubeFace faceClass="face-transform-left">
            {defaultFaces.left}
          </CubeFace>

          <CubeFace faceClass="face-transform-right">
            {defaultFaces.right}
          </CubeFace>

          <CubeFace faceClass="face-transform-top">
            {defaultFaces.top}
          </CubeFace>

          <CubeFace faceClass="face-transform-bottom">
            {defaultFaces.bottom}
          </CubeFace>
        </div>
      </motion.div>
      
      {/* Instructions */}
      <div className="absolute bottom-2 text-xs text-gray-400 font-pixel">
        {autoRotate && <span>DRAG TO ROTATE</span>}
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(RotatingCube);
