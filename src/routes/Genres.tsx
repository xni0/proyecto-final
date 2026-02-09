import { useState, useEffect } from 'react';
import { movieService } from '../services/movie.service';
import type { Movie, Genre } from '../types/movie.types';
import { MovieGrid } from '../organisms/MovieGrid';
import Loader from '../atoms/Loader';

export function Genres() {
  // Estado simple
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar géneros al inicio
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await movieService.getGenres();
        setGenres(response.genres);
      } catch (err) {
        setError('Error al cargar géneros');
      }
    };
    loadGenres();
  }, []);

  // Cargar películas por género
  const handleGenreClick = async (genreId: number) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedGenre(genreId);
      const response = await movieService.getMoviesByGenre(genreId);
      setMovies(response.results);
    } catch (err) {
      // Obtener mensaje de error de forma segura
      let errorMessage = 'Error al cargar películas';
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
      <div className="text-center mb-12 p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">Explorar por Género</h1>
        <p className="text-lg text-gray-500 m-0">
          Selecciona un género para descubrir películas
        </p>
      </div>

      {/* Mostrar botones de géneros */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {genres.map((genre) => {
          // Determinar el estilo del botón
          let buttonStyle = 'bg-white text-primary-dark border-2 border-gray-200 hover:border-primary hover:text-primary hover:-translate-y-0.5';
          if (selectedGenre === genre.id) {
            buttonStyle = 'bg-gradient-to-br from-primary to-primary-light text-white shadow-lg shadow-primary/40 -translate-y-0.5';
          }

          return (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 cursor-pointer ${buttonStyle}`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-12">
          <Loader />
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600 text-xl">❌ {error}</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}

      {!loading && !error && selectedGenre && movies.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          <p>No se encontraron películas en este género</p>
        </div>
      )}

      {!loading && !error && !selectedGenre && (
        <div className="text-center py-12 text-gray-500 text-lg">
          <p>🎭 Selecciona un género para comenzar</p>
        </div>
      )}
    </div>
  );
}
