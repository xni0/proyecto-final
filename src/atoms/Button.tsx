import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  
  
  const baseStyles = 'px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-wide';
  
  let variantStyle = '';

  if (variant === 'primary') {
   
    variantStyle = 'bg-gradient-to-br from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 border-none cursor-pointer';
  } else if (variant === 'secondary') {
    variantStyle = 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1 shadow-sm cursor-pointer';
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}