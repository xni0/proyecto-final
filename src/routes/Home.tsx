import { useState, useEffect } from 'react';
import { movieService } from '../services/movie.service';
import type { Movie } from '../types/movie.types';
import { MovieGrid } from '../organisms/MovieGrid';
import Loader from '../atoms/Loader';
import Button from '../atoms/Button';

export function Home() {
  // Estados
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Cargar películas
  const cargarPeliculas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const respuesta = await movieService.getPopularMovies(page);
      
      // Si es la primera página, reemplazar películas
      // Si no, agregar películas nuevas a las que ya tenemos
      if (page === 1) {
        setMovies(respuesta.results);
      } else {
        const peliculasAnteriores = movies;
        const peliculasNuevas = respuesta.results;
        const todasLasPeliculas: Movie[] = [];
        
        // Agregar películas anteriores
        peliculasAnteriores.forEach(pelicula => {
          todasLasPeliculas.push(pelicula);
        });
        
        // Agregar películas nuevas
        peliculasNuevas.forEach(pelicula => {
          todasLasPeliculas.push(pelicula);
        });
        
        setMovies(todasLasPeliculas);
      }
    } catch (err) {
      let mensaje = 'Error al cargar películas';
      if (err instanceof Error) {
        mensaje = err.message;
      }
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  // Cargar películas al iniciar
  useEffect(() => {
    cargarPeliculas();
  }, [page]);

  // Cargar más películas
  const cargarMas = () => {
    setPage(page + 1);
  };

  // Mostrar cargando
  if (loading && movies.length === 0) {
    return (
      <div className="text-center py-12">
        <Loader />
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-base sm:text-xl">❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.6s_ease]">
      {/* Encabezado */}
      <div className="text-center mb-8 sm:mb-12 p-5 sm:p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">Películas Populares</h1>
        <p className="text-base sm:text-lg text-gray-500 m-0">
          Descubre las películas más populares del momento
        </p>
      </div>

      {/* Grid de películas */}
      <MovieGrid movies={movies} />

      {/* Botón para cargar más */}
      <div className="text-center mt-8 sm:mt-12 p-4 sm:p-8">
        <Button onClick={cargarMas} disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar Más Películas'}
        </Button>
      </div>
    </div>
  );
}
