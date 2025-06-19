import React from 'react';
import { motion } from 'framer-motion';

interface TechItemProps {
  name: string;
  icon: string;
  category: string;
}

const TechItem: React.FC<TechItemProps> = ({ name, icon, category }) => {
  // Determine background color based on category
  const getBgColor = () => {
    switch (category) {
      case 'frontend':
        return 'bg-gradient-to-br from-indigo-900 to-blue-900';
      case 'backend':
        return 'bg-gradient-to-br from-green-900 to-emerald-900';
      case 'design':
        return 'bg-gradient-to-br from-purple-900 to-fuchsia-900';
      case 'tools':
        return 'bg-gradient-to-br from-cyan-900 to-sky-900';
      case 'mobile':
        return 'bg-gradient-to-br from-pink-900 to-rose-900';
      default:
        return 'bg-gradient-to-br from-amber-900 to-orange-900';
    }
  };

  // Determine icon background color based on category
  const getIconBgColor = () => {
    switch (category) {
      case 'frontend':
        return 'bg-indigo-800/50';
      case 'backend':
        return 'bg-green-800/50';
      case 'design':
        return 'bg-purple-800/50';
      case 'tools':
        return 'bg-cyan-800/50';
      case 'mobile':
        return 'bg-pink-800/50';
      default:
        return 'bg-amber-800/50';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`${getBgColor()} p-3 rounded-lg pixel-corners flex flex-col items-center justify-center h-28 shadow-lg backdrop-blur-sm border border-white/10`}
    >
      <div className={`${getIconBgColor()} p-2 rounded-full mb-2 flex items-center justify-center w-12 h-12`}>
        <img src={icon} alt={name} className="w-8 h-8 object-contain filter brightness-[1.2]" />
      </div>
      <span className="text-white text-sm font-pixel">{name}</span>
    </motion.div>
  );
};

const TechStack: React.FC = () => {
  const techItems: TechItemProps[] = [
    // Frontend
    { name: 'React', icon: '/icons/react.svg', category: 'frontend' },
    { name: 'Next.js', icon: '/icons/nextjs.svg', category: 'frontend' },
    { name: 'TypeScript', icon: '/icons/typescript.svg', category: 'frontend' },
    { name: 'Tailwind', icon: '/icons/tailwind.svg', category: 'frontend' },
    
    // Backend
    { name: 'Node.js', icon: '/icons/nodejs.svg', category: 'backend' },
    { name: 'Express', icon: '/icons/express.svg', category: 'backend' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg', category: 'backend' },
    { name: 'Firebase', icon: '/icons/firebase.svg', category: 'backend' },
    
    // Design
    { name: 'Figma', icon: '/icons/figma.svg', category: 'design' },
    { name: 'Pixel Art', icon: '/icons/pixel.svg', category: 'design' },
    
    // Tools
    { name: 'Git', icon: '/icons/git.svg', category: 'tools' },
    { name: 'VS Code', icon: '/icons/vscode.svg', category: 'tools' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {techItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <TechItem
              name={item.name}
              icon={item.icon}
              category={item.category}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Fallback for missing icons */}
      <div className="text-xs text-gray-500 text-center mt-4">
        Note: Some icons may appear as placeholders until actual icons are added.
      </div>
    </div>
  );
};

export default TechStack;
