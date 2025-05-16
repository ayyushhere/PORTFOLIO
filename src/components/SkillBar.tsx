
import React, { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ 
  name, 
  percentage, 
  color = '#8B5CF6' 
}) => {
  const [width, setWidth] = useState(0);
  const pixelSize = 8; // Size of each pixel in the bar

  // Calculate how many pixel blocks to show based on percentage
  const totalBlocks = 20;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);

  useEffect(() => {
    // Animate the skill bar when it mounts
    setTimeout(() => {
      setWidth(percentage);
    }, 100);
  }, [percentage]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-pixel text-xs text-retro-white">{name}</span>
        <span className="font-pixel text-xs text-retro-lightgray">{percentage}%</span>
      </div>
      
      <div className="h-6 w-full bg-retro-black pixel-corners pixel-border-inset overflow-hidden">
        <div className="flex h-full">
          {Array.from({ length: totalBlocks }).map((_, index) => (
            <div
              key={index}
              className={`h-full transition-opacity duration-300 ${
                index < filledBlocks 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              style={{ 
                width: `${100 / totalBlocks}%`,
                backgroundColor: color,
                transition: `opacity 0.3s ease-in-out ${index * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
