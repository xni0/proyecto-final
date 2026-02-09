import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function Input({ 
  className = '', 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  required = false
}: InputProps) {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`px-4 py-3 border-2 border-gray-300 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary placeholder:text-gray-400 ${className}`}
    />
  );
}
