
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import PixelButton from '@/components/PixelButton';
import ProjectCard from '@/components/ProjectCard';
import SkillBar from '@/components/SkillBar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import PixelVideoBackground from '@/components/PixelVideoBackground';

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update scroll position for parallax effects
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Custom cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Add a slight delay to cursor movement for a retro feel
        setTimeout(() => {
          cursorRef.current!.style.left = `${e.clientX}px`;
          cursorRef.current!.style.top = `${e.clientY}px`;
        }, 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Sample project data
  const projects = [
    {
      title: "Pixel Weather App",
      description: "A weather application with pixel art style visualizations for different weather conditions.",
      image: "https://via.placeholder.com/400x300/252525/FFFFFF?text=Weather+App",
      tags: ["React", "APIs", "Pixel Art"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "Retro Game Platform",
      description: "A collection of retro-style games built with modern web technologies.",
      image: "https://via.placeholder.com/400x300/252525/FFFFFF?text=Game+Platform",
      tags: ["JavaScript", "HTML5 Canvas", "WebGL"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "Pixel Art Creator",
      description: "An online tool to create, edit and export pixel art for games and websites.",
      image: "https://via.placeholder.com/400x300/252525/FFFFFF?text=Pixel+Art+Tool",
      tags: ["React", "Canvas API", "File Export"],
      demoUrl: "#",
      codeUrl: "#"
    }
  ];

  // Skills data
  const skills = [
    { name: "HTML & CSS", percentage: 90, color: "#8B5CF6" },
    { name: "JavaScript", percentage: 80, color: "#FF6B6B" },
    { name: "React", percentage: 80, color: "#4ECDC4" },
    { name: "Node.js", percentage: 75, color: "#FFD166" },
    { name: "Pixel Art Design", percentage: 70, color: "#F78FB3" },
    { name: "UI/UX Design", percentage: 65, color: "#6A0572" }
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* Custom pixel cursor */}
      <div 
        ref={cursorRef} 
        className="fixed w-8 h-8 pointer-events-none z-50 hidden lg:block" 
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-2 h-2 bg-pink-500 animate-pixel-pulse" />
        <div className="w-2 h-2 bg-blue-400 absolute top-0 right-0 animate-pixel-pulse" style={{ animationDelay: '0.1s' }} />
        <div className="w-2 h-2 bg-yellow-300 absolute bottom-0 left-0 animate-pixel-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-green-400 absolute bottom-0 right-0 animate-pixel-pulse" style={{ animationDelay: '0.3s' }} />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-center overflow-hidden">
        {/* Video Background */}
        <PixelVideoBackground videoSrc="/pixel-bg.mp4" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded font-pixel text-xs bg-cyan-500 text-white mb-4">WELCOME TO MY PORTFOLIO</span>
            </div>
            <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl mb-6">
              <span className="text-pink-400">FULL</span>
              <span className="text-yellow-300">-</span>
              <span className="text-cyan-300">STACK</span>
              <span className="block mt-2 text-green-300">WEB DEVELOPER</span>
            </h1>
            <p className="text-lg md:text-xl text-retro-lightgray mb-8 max-w-2xl bg-black/30 p-4 rounded-lg backdrop-blur-sm">
              Full-stack developer with a systematic approach to designing, 
              developing, and deploying web solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PixelButton size="lg" variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                VIEW PROJECTS
              </PixelButton>
              <PixelButton variant="accent" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                CONTACT ME
              </PixelButton>
            </div>
          </div>
        </div>
        
        {/* Floating pixel elements */}
        <div className="absolute bottom-32 right-10 w-12 h-12 pixel-corners bg-yellow-400/30 animate-pixel-float"></div>
        <div className="absolute top-32 right-1/4 w-8 h-8 pixel-corners bg-cyan-500/40 animate-pixel-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 pixel-corners bg-pink-500/30 animate-pixel-float" style={{ animationDelay: '0.8s' }}></div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse">
          <div className="w-8 h-12 border-2 border-yellow-300 rounded-full flex justify-center">
            <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-xs text-center mt-2 font-pixel text-yellow-300">SCROLL</p>
        </div>
      </section>
      
      {/* About Me Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-retro-black to-indigo-950/90 relative">
        <div 
          className="absolute inset-0 pixel-bg-pattern opacity-10"
          style={{ transform: `translateY(${scrollPosition * 0.05}px)` }}
        ></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
              <span className="font-pixel text-xs text-white">ABOUT ME</span>
            </div>
            <h2 className="font-pixel text-3xl text-retro-white mb-4">WHO AM I?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Pixelated profile image container */}
                <div className="w-full max-w-md mx-auto aspect-square relative overflow-hidden pixel-corners pixel-border pixel-shadow">
                  {/* Replace with your profile image */}
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    {/* <p className="font-pixel text-2xl text-white">YOUR PHOTO</p> */}
                    <img src="/ayush.png" alt="ayu" />
                  </div>
                  
                  {/* Pixel overlay */}
                  <div className="absolute inset-0 pixel-bg-pattern opacity-20"></div>
                </div>
                
                {/* Decorative pixels */}
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-500 animate-pixel-float"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 animate-pixel-float" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <h3 className="font-pixel text-2xl text-retro-white mb-6">Hi, I'm <span className="text-pink-400">AYUSH KUMAR</span></h3>
              <p className="text-retro-lightgray mb-6">
               Aspiring full-stack web developer currently in my 2nd year of college. I'm passionate about understanding and building all aspects of web applications, from crafting engaging user interfaces to developing robust server-side logic. My goal is to create comprehensive and effective web solutions.
              </p>
              <p className="text-retro-lightgray mb-8">
                My current academic journey involves actively learning a diverse range of web development technologies and frameworks. Through coursework and personal projects, I'm gaining practical experience in both front-end and back-end development, eager to connect these skills to build impactful digital experiences.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners">
                  <p className="text-cyan-300 font-pixel mb-2">LOCATION</p>
                  <p className="text-retro-lightgray">INDIA</p>
                </div>
                <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners">
                  <p className="text-pink-400 font-pixel mb-2">EMAIL</p>
                  <p className="text-retro-lightgray">ayushkumar0211a@gmail.com</p>
                </div>
                <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners">
                  <p className="text-yellow-300 font-pixel mb-2">SPECIALTY</p>
                  <p className="text-retro-lightgray">Full Stack Web Development</p>
                </div>
                <div className="p-4 bg-indigo-950/50 rounded-lg pixel-corners">
                  <p className="text-green-400 font-pixel mb-2">EXPERIENCE</p>
                  <p className="text-retro-lightgray">Fresher</p>
                </div>
              </div>
              
              <PixelButton variant="secondary" onClick={() => window.open('/resume.pdf', '_blank')}>
                DOWNLOAD CV
              </PixelButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-indigo-950/90 to-[#151515] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              <span className="font-pixel text-xs text-white">MY SKILLS</span>
            </div>
            <h2 className="font-pixel text-3xl text-retro-white mb-4">WHAT I CAN DO</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <SkillBar 
                key={index}
                name={skill.name}
                percentage={skill.percentage}
                color={skill.color}
              />
            ))}
          </div>
        </div>
        
        {/* Decorative pixels */}
        <div className="absolute top-10 right-10 w-12 h-12 bg-yellow-300 opacity-20 animate-pixel-spin"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-pink-500 opacity-20 animate-pixel-spin" style={{ animationDelay: '2s' }}></div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#151515] relative">
        <div 
          className="absolute inset-0 pixel-bg-pattern opacity-10"
          style={{ transform: `translateY(${scrollPosition * -0.05}px)` }}
        ></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-teal-600 mb-2">
              <span className="font-pixel text-xs text-white">PORTFOLIO</span>
            </div>
            <h2 className="font-pixel text-3xl text-retro-white mb-4">MY PROJECTS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-600 mx-auto mb-4"></div>
            <p className="text-retro-lightgray max-w-2xl mx-auto">
              A collection of my recent work showcasing my skills in web development and pixel art design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                demoUrl={project.demoUrl}
                codeUrl={project.codeUrl}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <PixelButton variant="secondary" onClick={() => window.open('https://github.com', '_blank')}>
              VIEW ALL PROJECTS
            </PixelButton>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#151515] to-purple-950/80 relative overflow-hidden">
        {/* Background grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            transform: `translateY(${scrollPosition * 0.08}px)`
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-600 mb-2">
              <span className="font-pixel text-xs text-white">GET IN TOUCH</span>
            </div>
            <h2 className="font-pixel text-3xl text-retro-white mb-4">CONTACT ME</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-600 mx-auto mb-4"></div>
            <p className="text-retro-lightgray max-w-2xl mx-auto">
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
