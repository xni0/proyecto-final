import { useState, useEffect } from 'react';
import type { Movie, MovieDetail } from '../types/movie.types';
import { movieService } from '../services/movie.service';


export function useMovies(type: 'popular' | 'now-playing' = 'popular') {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = type === 'popular' 
          ? await movieService.getPopularMovies()
          : await movieService.getNowPlayingMovies();
          
        setMovies(response.results);
      } catch (err) {
        
        let errorMessage = 'Error loading movies';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [type]);

  return { movies, loading, error };
}


export function useMovieDetail(id: number) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
 
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        
        let errorMessage = 'Error loading movie';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  return { movie, loading, error };
}