
import { useState } from 'react';

const Footer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const currentYear = new Date().getFullYear();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPosition({ x, y });
  };

  // Social media links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/ayyushhere' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'CodePen', url: 'https://codepen.io' },
  ];

  return (
    <footer 
      className="relative bg-retro-black py-10 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Pixel cursor effect */}
      <div 
        className="absolute w-20 h-20 bg-retro-primary opacity-10 rounded-full blur-xl pointer-events-none"
        style={{
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <p className="font-pixel text-xl text-retro-white mb-3">AYUSH.<span className="text-retro-primary">DEV</span></p>
            <p className="text-retro-lightgray text-sm">Creating pixelated digital experiences with modern web technologies</p>
          </div>
          
          {/* Quick links */}
          <div className="text-center">
            <h3 className="font-pixel text-sm text-retro-white mb-4">QUICK LINKS</h3>
            <div className="flex flex-col space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-retro-lightgray text-sm hover:text-retro-primary pixel-hover"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          {/* Social links */}
          <div className="text-center md:text-right">
            <h3 className="font-pixel text-sm text-retro-white mb-4">CONNECT</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-retro-lightgray hover:text-retro-primary pixel-hover"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-retro-darkgray pt-6 text-center">
          <p className="text-retro-lightgray text-xs">
            © {currentYear} Ayush.Dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
