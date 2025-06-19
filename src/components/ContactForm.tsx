
import { useState, FormEvent } from 'react';
import PixelButton from './PixelButton';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '', subject: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation variants for form elements
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-indigo-950/30 p-8 rounded-lg pixel-corners pixel-border backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name Field */}
          <motion.div
            custom={0}
            variants={formItemVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <label htmlFor="name" className="block font-pixel text-retro-white text-xs mb-2 flex items-center">
              <span className="text-pink-400 mr-2">01.</span> NAME
            </label>
            <div className={`relative transition-all duration-300 ${activeField === 'name' ? 'transform scale-[1.02]' : ''}`}>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className="w-full bg-gray-900/80 border-0 font-pixel text-retro-white p-3 pixel-corners pixel-border-inset focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                placeholder="Your name"
              />
              {activeField === 'name' && (
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg opacity-50 blur-sm -z-10"></div>
              )}
            </div>
          </motion.div>
          
          {/* Email Field */}
          <motion.div
            custom={1}
            variants={formItemVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <label htmlFor="email" className="block font-pixel text-retro-white text-xs mb-2 flex items-center">
              <span className="text-cyan-400 mr-2">02.</span> EMAIL
            </label>
            <div className={`relative transition-all duration-300 ${activeField === 'email' ? 'transform scale-[1.02]' : ''}`}>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className="w-full bg-gray-900/80 border-0 font-pixel text-retro-white p-3 pixel-corners pixel-border-inset focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                placeholder="your.email@example.com"
              />
              {activeField === 'email' && (
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-50 blur-sm -z-10"></div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Subject Field */}
        <motion.div
          custom={2}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 relative"
        >
          <label htmlFor="subject" className="block font-pixel text-retro-white text-xs mb-2 flex items-center">
            <span className="text-purple-400 mr-2">03.</span> SUBJECT
          </label>
          <div className={`relative transition-all duration-300 ${activeField === 'subject' ? 'transform scale-[1.02]' : ''}`}>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => handleFocus('subject')}
              onBlur={handleBlur}
              className="w-full bg-gray-900/80 border-0 font-pixel text-retro-white p-3 pixel-corners pixel-border-inset focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 appearance-none"
            >
              <option value="" disabled>Select a subject</option>
              <option value="job">Job Opportunity</option>
              <option value="project">Project Inquiry</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
            {activeField === 'subject' && (
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg opacity-50 blur-sm -z-10"></div>
            )}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </motion.div>
        
        {/* Message Field */}
        <motion.div
          custom={3}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 relative"
        >
          <label htmlFor="message" className="block font-pixel text-retro-white text-xs mb-2 flex items-center">
            <span className="text-green-400 mr-2">04.</span> MESSAGE
          </label>
          <div className={`relative transition-all duration-300 ${activeField === 'message' ? 'transform scale-[1.02]' : ''}`}>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              rows={5}
              className="w-full bg-gray-900/80 border-0 font-pixel text-retro-white p-3 pixel-corners pixel-border-inset focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
              placeholder="Your message here..."
            />
            {activeField === 'message' && (
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg opacity-50 blur-sm -z-10"></div>
            )}
          </div>
        </motion.div>
        
        {/* Submit Button */}
        <motion.div
          custom={4}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <PixelButton 
            type="submit" 
            size="lg" 
            disabled={isSubmitting}
            className={`w-full max-w-xs ${isSubmitting ? 'opacity-70' : ''}`}
          >
            <span className="flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SENDING...
                </>
              ) : (
                <>
                  SEND MESSAGE
                  <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </span>
          </PixelButton>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
