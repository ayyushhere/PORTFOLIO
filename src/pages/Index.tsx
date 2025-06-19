
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import PixelButton from '@/components/PixelButton';
import ProjectCard from '@/components/ProjectCard';
import SkillBar from '@/components/SkillBar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import PixelVideoBackground from '@/components/PixelVideoBackground';
import MemoryGame from '@/components/MemoryGame';
import TechStack from '@/components/TechStack';
import { motion } from 'framer-motion';

// Import custom styles
import '@/styles/index.css';

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update scroll position for parallax effects
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Initialize cursor trail elements pool
    const trailPool = Array.from({ length: 10 }, () => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.display = 'none';
      document.body.appendChild(trail);
      return trail;
    });

    let currentTrailIndex = 0;
    let lastMoveTime = 0;

    // Optimized cursor effect with throttling and element pooling
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < 32) return; // Limit to ~30fps
      lastMoveTime = now;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        
        // Reuse trail element from pool
        const trail = trailPool[currentTrailIndex];
        const colors = ['#EC4899', '#8B5CF6', '#10B981'];
        
        trail.style.display = 'block';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        setTimeout(() => {
          trail.style.display = 'none';
        }, 300);

        currentTrailIndex = (currentTrailIndex + 1) % trailPool.length;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      // Clean up trail elements
      trailPool.forEach(trail => trail.remove());
    };
  }, []);

  // Project data
  const projects = [
    {
      title: "SRM System",
      description: "Next-Gen SRM Platform to streamline operations, reduce costs, and build stronger supplier relationships with an all-in-one platform.",
      image: "/public/srm.png",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      demoUrl: "#",
      codeUrl: "https://github.com/ayyushhere/SRM"
    },
    {
      title: "Portfolio Website",
      description: "A pixel-art themed portfolio website showcasing my projects and skills with interactive elements and modern design.",
      image: "/public/portfolio.png",
      tags: ["React", "Vite", "Tailwind CSS", "TypeScript"],
      demoUrl: "#",
      codeUrl: "https://github.com/ayyushhere/PORTFOLIO"
    }
  ];

  // Skills data
  const skills = [
    { name: "HTML & CSS", percentage: 90, color: "#8B5CF6" },
    { name: "JavaScript", percentage: 80, color: "#FF6B6B" },
    { name: "React", percentage: 80, color: "#4ECDC4" },
    { name: "Node.js", percentage: 75, color: "#FFD166" },
    { name: "MySQl", percentage: 70, color: "#F78FB3" },
    { name: "UI/UX Design", percentage: 65, color: "#6A0572" }
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* Enhanced pixel cursor */}
      <div 
        ref={cursorRef} 
        className="fixed w-10 h-10 pointer-events-none z-50 hidden lg:block cursor-main"
      >
        <div className="w-3 h-3 bg-pink-500 animate-pixel-pulse rainbow-animated" />
        <div className="w-3 h-3 bg-blue-400 absolute top-0 right-0 animate-pixel-pulse rainbow-animated animation-delay-01s" />
        <div className="w-3 h-3 bg-yellow-300 absolute bottom-0 left-0 animate-pixel-pulse rainbow-animated animation-delay-02s" />
        <div className="w-3 h-3 bg-green-400 absolute bottom-0 right-0 animate-pixel-pulse rainbow-animated animation-delay-03s" />
      </div>
      
      {/* CRT scan line effect */}
      <div className="scanline fixed inset-0 pointer-events-none z-40"></div>

      <Navbar />
      
      {/* Redesigned Hero Section */}
      <section id="home" className="min-h-screen relative flex items-center overflow-hidden">
        {/* Video Background */}
        <PixelVideoBackground videoSrc="/pixel-bg.mp4" />
        
        {/* Overlay grid pattern */}
        <div className="absolute inset-0 pixel-bg-pattern opacity-10 z-0"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 rounded font-pixel text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white mb-4 pixel-corners">WELCOME TO MY PIXEL WORLD</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="font-pixel responsive-heading mb-6"
              >
                <span className="glitch-text" data-text="FULL"><span className="text-pink-400">FULL</span></span>
                <span className="text-yellow-300">-</span>
                <span className="glitch-text" data-text="STACK"><span className="text-cyan-300">STACK</span></span>
                <span className="block mt-2 gradient-text">WEB DEVELOPER</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="responsive-text text-retro-lightgray mb-8 bg-black/40 p-4 rounded-lg backdrop-blur-sm pixel-corners"
              >
                Crafting intelligent digital experiences at the intersection of AI and web development. As a fullstack developer,
                I architect seamless solutions that harness the power of artificial intelligence to create smarter, faster, and more
                intuitive applications.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <PixelButton size="lg" variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <span className="flex items-center">
                    <span className="mr-2">VIEW PROJECTS</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                  </span>
                </PixelButton>
                <PixelButton variant="accent" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <span className="flex items-center">
                    <span className="mr-2">CONTACT ME</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                </PixelButton>
              </motion.div>
            </motion.div>
            
            {/* Right side - Decorative pixel art */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 pixel-corners pixel-border crt-effect">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-0"></div>
                
                {/* Pixel art computer */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-48 h-40 bg-gray-800 pixel-corners relative">
                    {/* Screen */}
                    <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center overflow-hidden">
                      <div className="text-white font-pixel text-xs text-center">
                        <div className="mb-2">HELLO WORLD</div>
                        <div className="animate-pulse">_</div>
                      </div>
                      
                      {/* Scan line */}
                      <div className="scanline"></div>
                    </div>
                    
                    {/* Computer base */}
                    <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gray-700 pixel-corners"></div>
                    <div className="absolute -bottom-12 left-8 right-8 h-4 bg-gray-800 pixel-corners"></div>
                  </div>
                </div>
                
                {/* Floating pixels */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-500 pixel-corners animate-pixel-float"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 pixel-corners animate-pixel-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -right-6 w-4 h-12 bg-yellow-500 pixel-corners animate-pixel-float" style={{ animationDelay: '1s' }}></div>
                
                {/* Scan line effect */}
                <div className="scanline"></div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating pixel elements */}
        <div className="absolute bottom-32 right-10 w-12 h-12 pixel-corners bg-yellow-400/30 animate-pixel-float"></div>
        <div className="absolute top-32 right-1/4 w-8 h-8 pixel-corners bg-cyan-500/40 animate-pixel-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 pixel-corners bg-pink-500/30 animate-pixel-float" style={{ animationDelay: '0.8s' }}></div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse"
        >
          <div className="w-8 h-12 border-2 border-yellow-300 rounded-full flex justify-center pixel-corners">
            <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-xs text-center mt-2 font-pixel text-yellow-300">SCROLL</p>
        </motion.div>
      </section>
      
      {/* Redesigned About Me Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-retro-black to-indigo-950/90 relative overflow-hidden">
        {/* Animated background grid */}
        <div 
          className="absolute inset-0 pixel-bg-pattern opacity-10"
          style={{ transform: `translateY(${scrollPosition * 0.05}px)` }}
        ></div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-900/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mb-2 float-in">
              <span className="font-pixel text-xs text-white">ABOUT ME</span>
            </div>
            <h2 className="font-pixel responsive-heading text-retro-white mb-4">WHO AM I?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image - Takes 5 columns on large screens */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="order-2 lg:order-1 lg:col-span-5 flex justify-center"
            >
              <div className="relative">
                {/* Terminal-style frame */}
                <div className="w-full max-w-md mx-auto aspect-square relative overflow-hidden crt-effect">
                  {/* Terminal header */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 z-20 flex items-center px-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="font-pixel text-xs text-gray-400 mx-auto">developer_profile.exe</div>
                  </div>
                  
                  {/* Profile image with pixel effect */}
                  <div className="w-full h-full pt-8 bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center pixel-border">
                    <div className="relative w-5/6 h-5/6 pixel-corners overflow-hidden">
                      <img src="/ayush.png" alt="Ayush Kumar" className="w-full h-full object-cover z-10" />
                      <div className="absolute inset-0 pixel-bg-pattern opacity-20"></div>
                    </div>
                  </div>
                  
                  {/* Terminal-style command line with enhanced name animation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-green-400 font-mono text-xs p-2 z-20">
                    <div className="flex items-center">
                      <span className="text-cyan-400 mr-2">$</span>
                      <span className="mr-1">load_developer_profile --name="</span>
                      <span className="name-animation">
                        {"AYUSH KUMAR".split('').map((letter, index) => (
                          <span key={index} className="letter">{letter}</span>
                        ))}
                      </span>
                      <span>"</span>
                    </div>
                  </div>
                  
                  {/* Scan line effect */}
                  <div className="scanline"></div>
                </div>
                
                {/* Decorative pixels */}
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-500 animate-pixel-float pixel-corners"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 animate-pixel-float pixel-corners" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -left-6 w-4 h-12 bg-yellow-400 animate-pixel-float pixel-corners" style={{ animationDelay: '1.2s' }}></div>
              </div>
            </motion.div>
            
            {/* Content - Takes 7 columns on large screens */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="order-1 lg:order-2 lg:col-span-7"
            >
              <div className="bg-indigo-950/30 p-6 rounded-lg pixel-corners pixel-border backdrop-blur-sm">
                <h3 className="font-pixel text-2xl text-retro-white mb-6">
                  Hi, I'm <span className="text-pink-400 neon-text">AYUSH KUMAR</span>
                </h3>
                
                <p className="text-retro-lightgray mb-6 responsive-text">
                  Aspiring full-stack web developer currently in my 2nd year of college. I'm passionate about understanding and building all aspects of web applications, from crafting engaging user interfaces to developing robust server-side logic. My goal is to create comprehensive and effective web solutions.
                </p>
                
                <p className="text-retro-lightgray mb-8 responsive-text">
                  My current academic journey involves actively learning a diverse range of web development technologies and frameworks. Through coursework and personal projects, I'm gaining practical experience in both front-end and back-end development, eager to connect these skills to build impactful digital experiences.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners hover:glow-cyan transition-all duration-300">
                    <p className="text-cyan-300 font-pixel mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      LOCATION
                    </p>
                    <p className="text-retro-lightgray">INDIA</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners hover:glow-pink transition-all duration-300">
                    <p className="text-pink-400 font-pixel mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      EMAIL
                    </p>
                    <p className="text-retro-lightgray">ayushkumar0211a@gmail.com</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners hover:glow-yellow transition-all duration-300">
                    <p className="text-yellow-300 font-pixel mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      SPECIALTY
                    </p>
                    <p className="text-retro-lightgray">Full Stack Web Development</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners hover:glow-cyan transition-all duration-300">
                    <p className="text-green-400 font-pixel mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      EXPERIENCE
                    </p>
                    <p className="text-retro-lightgray">Fresher</p>
                  </div>
                </div>
                
                <PixelButton variant="secondary" onClick={() => window.open('/resume.pdf', '_blank')} download>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    DOWNLOAD CV
                  </span>
                </PixelButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Redesigned Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-indigo-950/90 to-[#151515] relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-grid" style={{
          transform: `translateY(${scrollPosition * 0.05}px)`
        }}></div>
        
        {/* Decorative elements */}
        <div className="blur-circle-blue"></div>
        <div className="blur-circle-cyan"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-2 float-in">
              <span className="font-pixel text-xs text-white">MY SKILLS</span>
            </div>
            <h2 className="font-pixel responsive-heading text-retro-white mb-4">TECH ARSENAL</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
            <p className="text-retro-lightgray max-w-2xl mx-auto responsive-text">
              My toolkit of technologies and skills that I use to build digital experiences.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side - Skill bars */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-7 bg-indigo-950/30 p-6 rounded-lg pixel-corners pixel-border backdrop-blur-sm"
            >
              <h3 className="font-pixel text-xl text-cyan-300 mb-6">DEVELOPMENT SKILLS</h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <SkillBar 
                      name={skill.name}
                      percentage={skill.percentage}
                      color={skill.color}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right side - Interactive 3D Skills Cube */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-indigo-950/30 p-6 rounded-lg pixel-corners pixel-border backdrop-blur-sm h-full">
                <h3 className="font-pixel text-xl text-pink-400 mb-6">TECH STACK</h3>
                
                {/* Tech Stack Grid */}
                <TechStack />
                
                {/* Terminal-style command line */}
                <div className="mt-6 bg-gray-900 text-green-400 font-mono text-xs p-2 rounded-lg">
                  <div className="flex">
                    <span className="text-cyan-400 mr-2">$</span>
                    <span className="typing-animation">npm install --save my-skills</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative pixels */}
        <div className="absolute top-10 right-10 w-12 h-12 bg-yellow-300 opacity-20 animate-pixel-spin"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-pink-500 opacity-20 animate-pixel-spin" style={{ animationDelay: '2s' }}></div>
      </section>
      
      {/* Interactive Memory Game Section */}
      <section id="interactive" className="py-20 bg-gradient-to-b from-[#151515] to-purple-950/90 relative overflow-hidden">
        <div className="absolute inset-0 pixel-bg-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mb-2 float-in">
              <span className="font-pixel text-xs text-white">INTERACTIVE</span>
            </div>
            <h2 className="font-pixel responsive-heading text-retro-white mb-4">PLAY WITH ME</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mb-4"></div>
            <p className="text-retro-lightgray max-w-2xl mx-auto responsive-text">
              Test your memory with this fun pixel-themed memory matching game! Find all the matching pairs with as few moves as possible.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl mx-auto bg-indigo-950/30 p-6 rounded-lg pixel-corners pixel-border backdrop-blur-sm"
          >
            <MemoryGame className="mb-4" />
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
      </section>
      
      {/* Redesigned Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-[#151515] to-indigo-950/90 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid" style={{
          transform: `translateY(${scrollPosition * -0.05}px)`
        }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-900/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-teal-600 mb-2 float-in">
              <span className="font-pixel text-xs text-white">PORTFOLIO</span>
            </div>
            <h2 className="font-pixel responsive-heading text-retro-white mb-4">PIXEL PROJECTS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-600 mx-auto mb-6"></div>
            <p className="text-retro-lightgray max-w-2xl mx-auto responsive-text">
              A collection of my creative work and coding adventures.
            </p>
          </motion.div>
          
          {/* Project filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {['All', 'Web', 'Mobile', 'Design', 'Game'].map((filter, index) => (
              <button
                key={index}
                className={`filter-button font-pixel ${index === 0 ? 'active' : ''}`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
          
          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="project-card aspect-[4/5]"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                />
                
                <div className="project-content">
                  <div className="project-tags">
                    {project.tags && project.tags.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="project-tag font-pixel">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-pixel text-xl text-white mb-2">{project.title}</h3>
                  <p className="text-retro-lightgray mb-4 text-sm line-clamp-2">{project.description}</p>
                  
                  <div className="project-links">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link demo font-pixel text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.codeUrl && (
                      <a 
                        href={project.codeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link font-pixel text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View more button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mt-12"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-md hover:opacity-90 transition-opacity font-pixel inline-flex items-center gap-2">
              View More Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </motion.div>
        </div>
        
        {/* Decorative pixels */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-green-500 opacity-20 animate-pixel-spin"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-teal-500 decorative-pixel animate-pixel-spin animation-delay-1s"></div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#151515] to-purple-950/80 relative overflow-hidden">
        {/* Background grid */}
        <div 
          className="absolute inset-0 background-grid"
          style={{
            transform: `translateY(${scrollPosition * 0.08}px)`
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-600 mb-2 float-in">
              <span className="font-pixel text-xs text-white">GET IN TOUCH</span>
            </div>
            <h2 className="font-pixel responsive-heading text-retro-white mb-4">CONTACT ME</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-600 mx-auto mb-4"></div>
            <p className="text-retro-lightgray max-w-2xl mx-auto responsive-text">
              Have a project in mind? Let's work together to create something amazing.
            </p>
          </div>
          
          <ContactForm />
        </div>
        
        {/* Decorative pixels */}
        <div className="absolute bottom-0 left-0 w-full h-8 pixel-bg-pattern opacity-20"></div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
