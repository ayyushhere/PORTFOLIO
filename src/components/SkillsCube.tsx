import { useState, useMemo, memo } from 'react';
import RotatingCube from './RotatingCube';

// Create a memoized skill item component to prevent unnecessary re-renders
const SkillItem = memo(({ skill, textColor }: { skill: string; textColor: string }) => (
  <span 
    className={`text-sm bg-white/10 backdrop-blur-sm px-2 py-1 rounded font-pixel ${textColor}`}
  >
    {skill}
  </span>
));

SkillItem.displayName = 'SkillItem';

// Create a memoized face component to prevent unnecessary re-renders
const CubeFaceContent = memo(({ 
  title, 
  skills, 
  icon, 
  textColor 
}: { 
  title: string; 
  skills: string[]; 
  icon: React.ReactNode; 
  textColor: string;
}) => (
  <div className="text-center">
    {icon}
    <h3 className="text-xl font-pixel text-white mb-3">{title}</h3>
    <div className="grid grid-cols-2 gap-2">
      {skills.map((skill, index) => (
        <SkillItem key={index} skill={skill} textColor={textColor} />
      ))}
    </div>
  </div>
));

CubeFaceContent.displayName = 'CubeFaceContent';

const SkillsCube = () => {
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);

  // Define the skills for each face of the cube - memoized to prevent recreating on every render
  const skillsFaces = useMemo(() => ({
    front: {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "from-indigo-900 to-blue-900",
      textColor: "text-blue-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-400 mb-3">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        </svg>
      ),
    },
    back: {
      title: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "Firebase"],
      color: "from-green-900 to-emerald-900",
      textColor: "text-green-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-green-400 mb-3">
          <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM6 7h5v5H6zm7 0h5v5h-5zM6 14h5v3H6zm7 0h5v3h-5z" />
        </svg>
      ),
    },
    left: {
      title: "Design",
      skills: ["Figma", "Pixel Art", "UI/UX", "Animation"],
      color: "from-purple-900 to-fuchsia-900",
      textColor: "text-purple-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-purple-400 mb-3">
          <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm3.59 5.59l-4.83 4.83-2.18-2.18a.996.996 0 10-1.41 1.41l2.89 2.89c.39.39 1.02.39 1.41 0l5.54-5.54a.996.996 0 000-1.41.996.996 0 00-1.42 0z" />
        </svg>
      ),
    },
    right: {
      title: "Mobile",
      skills: ["React Native", "Flutter", "Expo", "App Design"],
      color: "from-pink-900 to-rose-900",
      textColor: "text-pink-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-pink-400 mb-3">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
        </svg>
      ),
    },
    top: {
      title: "Tools",
      skills: ["Git", "VS Code", "Webpack", "Docker"],
      color: "from-cyan-900 to-sky-900",
      textColor: "text-cyan-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-cyan-400 mb-3">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      ),
    },
    bottom: {
      title: "Other",
      skills: ["SEO", "Performance", "Testing", "Analytics"],
      color: "from-amber-900 to-orange-900",
      textColor: "text-yellow-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-400 mb-3">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5h-1.5V14h-1v3H8v-3H7v4.5H5.5v-5c0-.55.45-1 1-1H11c.55 0 1 .45 1 1v5zm3.5 0H14v-6h3.5c.55 0 1 .45 1 1V16c0 .55-.45 1-1 1h-2v1.5zm-1-4.5H17v1h-2.5v-1zM13 9H9.5v1h2v1h-2v1H13V9zm6 1.5v-1c0-.55-.45-1-1-1h-2.5c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h2.5c.55 0 1-.45 1-1zm-1-.5h-2.5v-1H18v1z" />
        </svg>
      ),
    },
  }), []);

  // Create the cube faces with skill content - memoized to prevent recreating on every render
  const cubeFaces = useMemo(() => {
    // Helper function to create cube faces with consistent structure
    const createFace = (key: keyof typeof skillsFaces) => {
      const face = skillsFaces[key];
      return (
        <div 
          className={`w-full h-full bg-gradient-to-br ${face.color} p-4 flex items-center justify-center`}
          onMouseEnter={() => setHoveredFace(key)}
          onMouseLeave={() => setHoveredFace(null)}
        >
          <CubeFaceContent
            title={face.title}
            skills={face.skills}
            icon={face.icon}
            textColor={face.textColor}
          />
        </div>
      );
    };

    return {
      front: createFace('front'),
      back: createFace('back'),
      left: createFace('left'),
      right: createFace('right'),
      top: createFace('top'),
      bottom: createFace('bottom'),
    };
  }, [skillsFaces]);

  // Get the current title based on hovered face
  const currentTitle = hoveredFace ? skillsFaces[hoveredFace as keyof typeof skillsFaces].title : "My Skills";
  const currentDescription = hoveredFace ? "Hover on different faces to explore more skills" : "Drag to rotate the cube and explore my skills";

  return (
    <div className="relative">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-pixel text-white mb-1">{currentTitle}</h3>
        <p className="text-sm text-gray-400">{currentDescription}</p>
      </div>
      
      <RotatingCube 
        size={280} 
        autoRotate={true}
        autoRotateSpeed={0.1} // Slower rotation for smoother animation
        faces={cubeFaces}
      />
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(SkillsCube);
