
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.getElementById('footer');
      if (footerElement) {
        const footerPosition = footerElement.getBoundingClientRect();
        const isFooterVisible = footerPosition.top < window.innerHeight - 100;
        setIsVisible(isFooterVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPosition({ x, y });
  };

  // Social media links with icons
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/ayyushhere',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/ayyushhere/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/ayussh.dev/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    { 
      name: 'CodePen', 
      url: 'https://codepen.io',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z" />
        </svg>
      )
    },
  ];

  // Footer animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.footer 
      id="footer"
      className="relative bg-gradient-to-b from-gray-900 to-black py-12 overflow-hidden border-t border-indigo-900/30"
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={footerVariants}
    >
      {/* Pixel cursor effect */}
      <div 
        className="absolute w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 rounded-full blur-xl pointer-events-none"
        style={{
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Pixel art decorations */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70"></div>
      <div className="absolute top-4 left-0 w-full h-1 bg-black opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10" variants={footerVariants}>
          {/* Logo and tagline */}
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <div className="mb-4 inline-block">
              <div className="font-pixel text-2xl text-white mb-1 relative">
                <span className="relative z-10">AYUSH</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 relative z-10">.DEV</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600"></div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">Creating pixelated digital experiences with modern web technologies</p>
            <div className="flex space-x-3 justify-center md:justify-start">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-400 text-xs">Available for freelance work</span>
            </div>
          </motion.div>
          
          {/* Quick links */}
          <motion.div className="text-center" variants={itemVariants}>
            <h3 className="font-pixel text-sm text-white mb-4 inline-block relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">QUICK LINKS</span>
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-300 flex items-center justify-center md:justify-start"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="text-cyan-400 mr-1 text-xs">{String(index + 1).padStart(2, '0')}.</span>
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Social links */}
          <motion.div className="text-center md:text-right" variants={itemVariants}>
            <h3 className="font-pixel text-sm text-white mb-4 inline-block relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">CONNECT</span>
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-pink-500"></div>
            </h3>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-xs">
              Let's build something amazing together!
            </p>
          </motion.div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-800 pt-6 text-center"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs mb-2 md:mb-0">
              © {currentYear} Ayush Kumar. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs flex items-center">
              <span className="mr-2">Made with</span>
              <span className="text-pink-500 animate-pulse">❤</span>
              <span className="mx-2">and</span>
              <span className="text-cyan-400 font-pixel">React</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
