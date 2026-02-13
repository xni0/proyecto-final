import type { MovieDetail, MoviesResponse, Genre } from '../types/movie.types';

const API_KEY = '4f5f43495afcc67e9553f6c684a82f84'; // API Key pública de ejemplo
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const movieService = {
  
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error loading popular movies');
    }
    return response.json();
  },

  
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error searching movies');
    }
    return response.json();
  },

  
  getMovieDetails: async (id: number): Promise<MovieDetail> => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error('Error loading movie details');
    }
    return response.json();
  },

  
  getMoviesByGenres: async (genreIds: number[], page: number = 1): Promise<MoviesResponse> => {
    const genresParam = genreIds.join(',');
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genresParam}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error loading movies by genre');
    }
    return response.json();
  },

 
  getGenres: async (): Promise<{ genres: Genre[] }> => {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error('Error loading genres');
    }
    return response.json();
  },

  
  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error loading now playing movies');
    }
    return response.json();
  },

  
  getMovieCredits: async (id: number): Promise<import('../types/movie.types').Credits> => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error('Error loading movie credits');
    }
    return response.json();
  },

 
  getPersonDetails: async (id: number): Promise<import('../types/movie.types').PersonDetail> => {
    const response = await fetch(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error('Error loading person information');
    }
    return response.json();
  },

  
  getImageUrl: (path: string | null, size: string = 'w500'): string => {
    if (!path) return '/placeholder-movie.png';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};