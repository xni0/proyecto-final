import type { Movie } from '../types/movie.types';
import MovieCard from '../molecules/MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export function MovieGrid({ movies, title }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-10 sm:py-12 text-gray-500 text-base sm:text-lg">
        <p>No se encontraron películas</p>
      </div>
    );
  }

  return (
    <section>
      {/* Mostrar título si existe */}
      {title && <h2 className="text-xl sm:text-2xl font-bold mb-6 text-primary-dark">{title}</h2>}
      
      {/* Grid de películas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {/* Renderizar cada película */}
        {movies.map((movie) => {
          return (
            <MovieCard key={movie.id} movie={movie} />
          );
        })}
      </div>
    </section>
  );
}