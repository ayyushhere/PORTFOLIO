
import { useState } from 'react';
import PixelButton from './PixelButton';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  demoUrl,
  codeUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative w-full max-w-sm h-80 pixel-corners pixel-border bg-retro-darkgray overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{ 
          backgroundImage: `url(${image})`,
          filter: isHovered ? 'brightness(0.3)' : 'brightness(0.7)'
        }}
      />
      
      {/* Pixel Overlay Pattern */}
      <div className="absolute inset-0 pixel-bg-pattern opacity-20"></div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full w-full p-5 flex flex-col justify-end">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3 transition-transform duration-300 transform translate-y-0 group-hover:translate-y-[-8px]">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-retro-black text-retro-lightgray text-xs px-2 py-1 font-pixel"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h3 
          className="text-retro-white font-pixel text-lg mb-2 transition-transform duration-300 transform translate-y-0 group-hover:translate-y-[-8px]"
        >
          {title}
        </h3>
        
        {/* Description - Only visible on hover */}
        <p 
          className={`text-sm text-retro-lightgray mb-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {description}
        </p>
        
        {/* Buttons - Only visible on hover */}
        <div 
          className={`flex gap-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {demoUrl && (
            <PixelButton size="sm" onClick={() => window.open(demoUrl, '_blank')}>
              Demo
            </PixelButton>
          )}
          {codeUrl && (
            <PixelButton variant="secondary" size="sm" onClick={() => window.open(codeUrl, '_blank')}>
              Code
            </PixelButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
