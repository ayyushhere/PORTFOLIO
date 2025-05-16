
import { useState, FormEvent } from 'react';
import PixelButton from './PixelButton';
import { toast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="mb-6">
        <label htmlFor="name" className="block font-pixel text-retro-white text-xs mb-2">
          NAME
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-retro-black border-0 font-pixel text-retro-white p-3 pixel-corners pixel-border-inset focus:outline-none focus:ring-2 focus:ring-retro-primary"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block font-pixel text-retro-white text-xs mb-2">
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-retro-black border-0 font-pixel text-retro-white p-3 pixel-corners pixel-border-inset focus:outline-none focus:ring-2 focus:ring-retro-primary"
        />
      </div>
      
      <div className="mb-8">
        <label htmlFor="message" className="block font-pixel text-retro-white text-xs mb-2">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full bg-retro-black border-0 font-pixel text-retro-white p-3 pixel-corners pixel-border-inset focus:outline-none focus:ring-2 focus:ring-retro-primary resize-none"
        />
      </div>
      
      <div className="text-center">
        <PixelButton 
          type="submit" 
          size="lg" 
          disabled={isSubmitting}
          className={`w-full max-w-xs ${isSubmitting ? 'opacity-70' : ''}`}
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
        </PixelButton>
      </div>
    </form>
  );
};

export default ContactForm;
