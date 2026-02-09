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
        <p className="text-red-600 text-xl">❌ {error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg">No hay películas disponibles</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12 p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">En Cines Ahora</h1>
        <p className="text-lg text-gray-500 m-0">
          Las películas que puedes ver en el cine en este momento
        </p>
      </div>

      <MovieGrid movies={movies} />
    </div>
  );
}