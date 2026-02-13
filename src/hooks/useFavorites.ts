import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import type { Movie } from '../types/movie.types';

export function useFavorites() {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Movie[]>([]);


  useEffect(() => {
    if (isAuthenticated && user?.username) {
      const storedFavs = localStorage.getItem(`favorites_${user.username}`);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      } else {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user]);

  
  const updateLocalStorage = (newFavs: Movie[]) => {
    if (user?.username) {
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(newFavs));
      setFavorites(newFavs);
      
      
      window.dispatchEvent(new Event("storage"));
    }
  };

  const addFavorite = (movie: Movie) => {
    if (!isFavorite(movie.id)) {
      const newFavs = [...favorites, movie];
      updateLocalStorage(newFavs);
    }
  };

  const removeFavorite = (movieId: number) => {
    const newFavs = favorites.filter(m => m.id !== movieId);
    updateLocalStorage(newFavs);
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(m => m.id === movieId);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
}