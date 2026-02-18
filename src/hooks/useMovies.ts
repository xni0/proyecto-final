import { useState, useEffect } from 'react';
import type { Movie, MovieDetail } from '../types/movie.types';
import { movieService } from '../services/movie.service';

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
};


export function useMovies(type: 'popular' | 'now-playing' = 'popular') {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        if (type === 'popular') {
          response = await movieService.getPopularMovies();
        } else {
          response = await movieService.getNowPlayingMovies();
        }

        setMovies(response.results);
      } catch (err) {
        setError(getErrorMessage(err, 'Error loading movies'));
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
        setError(getErrorMessage(err, 'Error loading movie'));
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  return { movie, loading, error };
}