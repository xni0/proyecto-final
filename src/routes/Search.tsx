import { useState, useEffect } from 'react';
import { movieService } from '../services/movie.service';
import type { Movie } from '../types/movie.types';
import { MovieGrid } from '../organisms/MovieGrid';
import Input from '../atoms/Input';
import Loader from '../atoms/Loader';

export function Search() {
  // Estado simple
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce: buscar después de 500ms sin escribir
  useEffect(() => {
    // Crear un timer
    const timer = setTimeout(() => {
      // Verificar si hay texto para buscar
      if (query.trim()) {
        handleSearch(query);
      } else if (hasSearched) {
        // Limpiar búsqueda anterior
        setMovies([]);
        setHasSearched(false);
      }
    }, 500);

    // Limpiar el timer anterior si el usuario sigue escribiendo
    return () => clearTimeout(timer);
  }, [query]);

  // Función para buscar películas
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const response = await movieService.searchMovies(searchQuery);
      
      // Filtrar películas que comienzan con la letra/texto del usuario
      const primeraLetra = searchQuery.trim().toLowerCase();
      const peliculasFiltradas = response.results.filter((movie) => {
        // Comparar la primera letra del título con la letra del usuario
        const tituloLower = movie.title.toLowerCase();
        return tituloLower.startsWith(primeraLetra);
      });
      
      setMovies(peliculasFiltradas);
    } catch (err) {
      // Obtener mensaje de error de forma segura
      let errorMessage = 'Error al buscar películas';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8 sm:mb-12 p-5 sm:p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">Buscar Películas</h1>
        <p className="text-base sm:text-lg text-gray-500 m-0">
          Encuentra tus películas favoritas por título
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
        <Input
          type="text"
          placeholder="Escribe el título de una película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {loading && (
        <div className="text-center py-8 sm:py-12">
          <Loader />
        </div>
      )}

      {error && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-red-600 text-base sm:text-xl">❌ {error}</p>
        </div>
      )}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-base sm:text-lg">
          <p>No se encontraron películas con ese título</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}

      {!loading && !error && !hasSearched && (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-base sm:text-lg">
          <p>🔍 Escribe el título de una película para buscar</p>
        </div>
      )}
    </div>
  );
}
