
import { useState, useEffect } from 'react';
import PixelButton from './PixelButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-retro-black/90 backdrop-blur-sm py-2 pixel-shadow' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="font-pixel text-xl text-retro-white group">
          AYUSH.<span className="text-retro-primary group-hover:rainbow-animated">DEV</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {['Home', 'About', 'Skills', 'Interactive', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-pixel text-xs text-retro-white hover:text-retro-primary transition-all duration-200 pixel-hover relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <PixelButton 
            className="!p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-retro-white block transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-retro-white block transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-retro-white block transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </PixelButton>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute left-0 w-full bg-retro-black transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
      }`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {['Home', 'About', 'Skills', 'Interactive', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-pixel text-xs text-retro-white hover:text-retro-primary transition-all duration-200 pixel-hover block py-2 relative group"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
