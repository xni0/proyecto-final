import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar(props: SearchBarProps) {
  // Extraer props de forma clara
  const onSearch = props.onSearch;
  const placeholder = props.placeholder || 'Buscar películas...';
  
  const [query, setQuery] = useState('');

  // Manejar envio del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar que hay texto
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-300 rounded-xl transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-lg"
      />
      <button type="submit" className="px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-primary to-primary-light text-white border-none rounded-xl cursor-pointer font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}