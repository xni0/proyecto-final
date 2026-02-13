import { useState, useEffect } from 'react';
import { movieService } from '../services/movie.service';
import type { Movie, Genre } from '../types/movie.types';
import { MovieGrid } from '../organisms/MovieGrid';
import Loader from '../atoms/Loader';
import { LayoutGrid, Filter, AlertCircle } from 'lucide-react'; // Importamos los iconos

export function Genres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await movieService.getGenres();
        setGenres(response.genres);
      } catch (err) {
        setError('Error loading genres');
      }
    };
    loadGenres();
  }, []);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  useEffect(() => {
    const loadMoviesByGenres = async () => {
      if (selectedGenres.length === 0) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await movieService.getMoviesByGenres(selectedGenres);
        setMovies(response.results);
      } catch (err) {
        let errorMessage = err instanceof Error ? err.message : 'Error loading movies';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadMoviesByGenres();
  }, [selectedGenres]);

  return (
    <div className="px-2 sm:px-0 animate-fadeIn">
      
      <div className="text-center mb-8 sm:mb-12 p-5 sm:p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Filter size={36} className="text-primary" /> Browse by Genre
        </h1>
        <p className="text-base sm:text-lg text-gray-500 m-0 font-medium">
          Select one or more genres to discover movies
        </p>
      </div>

      
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);
          return (
            <button
              key={genre.id}
              onClick={() => handleGenreToggle(genre.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer border-2 ${
                isSelected 
                ? 'bg-gradient-to-br from-primary to-primary-light text-white border-transparent shadow-lg shadow-primary/30 -translate-y-1' 
                : 'bg-white text-primary-dark border-gray-100 hover:border-primary/50 hover:text-primary'
              }`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      {loading && <Loader />}

      {error && (
        <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
          <AlertCircle size={40} className="mx-auto text-red-500 mb-2" />
          <p className="text-red-600 font-bold">{error}</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}

      
      {!loading && !error && selectedGenres.length > 0 && movies.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No movies found for this selection</p>
        </div>
      )}

      
      {!loading && !error && selectedGenres.length === 0 && (
        <div className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200">
          <LayoutGrid size={64} className="mx-auto text-gray-300 mb-6 animate-pulse" />
          <p className="text-xl text-gray-400 font-semibold tracking-tight">
            Select one or more genres to get started
          </p>
          <p className="text-sm text-gray-300 mt-2 italic">
            Combine genres like "Action" and "Comedy" for better results
          </p>
        </div>
      )}
    </div>
  );
}