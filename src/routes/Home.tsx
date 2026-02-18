import { useState, useEffect } from 'react';
import { movieService } from '../services/movie.service';
import type { Movie } from '../types/movie.types';
import { MovieGrid } from '../organisms/MovieGrid';
import Loader from '../atoms/Loader';
import Button from '../atoms/Button';

export function Home() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  
  const cargarPeliculas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const respuesta = await movieService.getPopularMovies(page);
      
      
      
      if (page === 1) {
        setMovies(respuesta.results);
      } else {
        setMovies(prev => prev.concat(respuesta.results));
      }
    } catch (err) {
      let mensaje = 'Error loading movies';
      if (err instanceof Error) {
        mensaje = err.message;
      }
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    cargarPeliculas();
  }, [page]);

  
  const cargarMas = () => {
    setPage(page + 1);
  };

  
  if (loading && movies.length === 0) {
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

  return (
    <div className="animate-[fadeIn_0.6s_ease]">
      
      <div className="text-center mb-8 sm:mb-12 p-5 sm:p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">Popular Movies</h1>
        <p className="text-base sm:text-lg text-gray-500 m-0">
          Discover the most popular movies right now
        </p>
      </div>

     
      <MovieGrid movies={movies} />

      
      <div className="text-center mt-8 sm:mt-12 p-4 sm:p-8">
        <Button onClick={cargarMas} disabled={loading}>
          {loading ? 'Loading...' : 'Load More Movies'}
        </Button>
      </div>
    </div>
  );
}
