import { useState, useEffect } from 'react';
import { movieService } from '../services/movie.service';
import type { Movie } from '../types/movie.types';
import { MovieGrid } from '../organisms/MovieGrid';
import Input from '../atoms/Input';
import Loader from '../atoms/Loader';
import { Search as SearchIcon, Film } from 'lucide-react'; // Importamos el icono

export function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query);
      } else if (hasSearched) {
        setMovies([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const response = await movieService.searchMovies(searchQuery);
      
      const primeraLetra = searchQuery.trim().toLowerCase();
      const peliculasFiltradas = response.results.filter((movie) => {
        const tituloLower = movie.title.toLowerCase();
        return tituloLower.startsWith(primeraLetra);
      });
      
      setMovies(peliculasFiltradas);
    } catch (err) {
      let errorMessage = 'Error searching movies';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8 sm:mb-12 p-5 sm:p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent flex items-center justify-center gap-3">
          <SearchIcon size={40} className="text-primary" /> Search Movies
        </h1>
        <p className="text-base sm:text-lg text-gray-500 m-0 font-medium">
          Find your favorite movies by title
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-8 sm:mb-12 relative">
        <Input
          type="text"
          placeholder="Type a movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 shadow-sm focus:shadow-xl transition-shadow duration-300"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {loading && (
        <div className="text-center py-8 sm:py-12">
          <Loader />
        </div>
      )}

      {error && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-red-600 text-base sm:text-xl font-semibold">❌ {error}</p>
        </div>
      )}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
          <Film size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No movies found with that title</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}

      {/* Estado inicial sin búsqueda con el nuevo icono */}
      {!loading && !error && !hasSearched && (
        <div className="text-center py-20 bg-white/30 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200 animate-pulse">
          <SearchIcon size={64} className="mx-auto text-gray-300 mb-6" />
          <p className="text-xl text-gray-400 font-medium">Type a movie title to search</p>
          <p className="text-sm text-gray-300 mt-2">Discover thousands of stories...</p>
        </div>
      )}
    </div>
  );
}