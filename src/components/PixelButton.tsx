
import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  // Define variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-opacity-90 text-white',
    secondary: 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:bg-opacity-90 text-white',
    accent: 'bg-gradient-to-r from-pink-500 to-rose-600 hover:bg-opacity-90 text-white',
  };

  // Define size styles
  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  // Play a retro sound effect on click
  const playClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 
                          'lvT18AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    audio.volume = 0.2;
    audio.play();
  };

  return (
    <button
      className={cn(
        'font-pixel transition-all',
        'pixel-corners pixel-border pixel-shadow',
        'active:translate-y-1 active:shadow-none', 
        'focus:outline-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={(e) => {
        playClickSound();
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;
