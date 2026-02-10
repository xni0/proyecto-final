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
  const baseStyles = 'px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Determinar estilos segun la variante
  let variantStyle = 'bg-gradient-to-br from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5';
  if (variant === 'secondary') {
    variantStyle = 'bg-gray-200 text-primary-dark hover:bg-gray-300';
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
