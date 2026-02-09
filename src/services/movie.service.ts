import type { MovieDetail, MoviesResponse, Genre } from '../types/movie.types';

const API_KEY = '4f5f43495afcc67e9553f6c684a82f84'; // API Key pública de ejemplo
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const movieService = {
  // Obtener películas populares
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error al cargar películas populares');
    }
    return response.json();
  },

  // Buscar películas por título
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error al buscar películas');
    }
    return response.json();
  },

  // Obtener detalles de una película
  getMovieDetails: async (id: number): Promise<MovieDetail> => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`
    );
    if (!response.ok) {
      throw new Error('Error al cargar detalles de la película');
    }
    return response.json();
  },

  // Obtener películas por género
  getMoviesByGenre: async (genreId: number, page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${genreId}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error al cargar películas por género');
    }
    return response.json();
  },

  // Obtener lista de géneros
  getGenres: async (): Promise<{ genres: Genre[] }> => {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
    );
    if (!response.ok) {
      throw new Error('Error al cargar géneros');
    }
    return response.json();
  },

  // Obtener películas en cines
  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Error al cargar películas en cines');
    }
    return response.json();
  },

  // Obtener créditos de una película (actores y directores)
  getMovieCredits: async (id: number): Promise<import('../types/movie.types').Credits> => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=es-ES`
    );
    if (!response.ok) {
      throw new Error('Error al cargar créditos de la película');
    }
    return response.json();
  },

  // Obtener información de una persona (actor/director)
  getPersonDetails: async (id: number): Promise<import('../types/movie.types').PersonDetail> => {
    const response = await fetch(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=es-ES`
    );
    if (!response.ok) {
      throw new Error('Error al cargar información de la persona');
    }
    return response.json();
  },

  // Construir URL de imagen
  getImageUrl: (path: string | null, size: string = 'w500'): string => {
    if (!path) return '/placeholder-movie.png';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};