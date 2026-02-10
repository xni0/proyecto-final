import { useMovies } from '../hooks/useMovies';
import { MovieGrid } from '../organisms/MovieGrid';
import Loader from '../atoms/Loader';

export function NowPlaying() {
  // Usar hook simplificado
  const { movies, loading, error } = useMovies('now-playing');

  // Estados de carga

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-base sm:text-xl">❌ {error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base sm:text-lg">No movies available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8 sm:mb-12 p-5 sm:p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">Now Playing</h1>
        <p className="text-base sm:text-lg text-gray-500 m-0">
          Movies currently playing in theaters
        </p>
      </div>

      <MovieGrid movies={movies} />
    </div>
  );
}