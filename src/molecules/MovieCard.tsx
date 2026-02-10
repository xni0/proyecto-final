import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie.types';
import { useFavorites } from '../hooks/useFavorites'; // <--- Importar hook
import { useAuth } from '../hooks/useAuth'; // <--- Importar auth

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites(); // <--- Usar hook
  const { isAuthenticated } = useAuth(); // <--- Verificar si está logueado

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Manejar clic en el corazón
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita navegar al detalle
    toggleFavorite(movie);
  };

  const isFav = isFavorite(movie.id);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:shadow-xl group relative" onClick={handleClick}>
      
      {/* Botón de Favoritos (Solo si está logueado) */}
      {isAuthenticated && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all duration-200 hover:scale-110 border-none cursor-pointer"
          title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFav ? "#ef4444" : "none"} // Rojo si es fav, transparente si no
            stroke={isFav ? "#ef4444" : "currentColor"}
            strokeWidth="2"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      )}

      {/* Imagen de película */}
      {(() => {
        const imageUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg';
        return (
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-72 sm:h-80 object-cover transition-transform duration-400 group-hover:scale-105"
          />
        );
      })()}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-white to-gray-50">
        <h3 className="text-sm sm:text-base font-bold my-0 mb-2.5 text-primary-dark leading-snug line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-primary my-1 font-bold">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="text-[0.8rem] sm:text-[0.85rem] text-gray-500 my-1 font-medium">{movie.release_date}</p>
      </div>
    </div>
  );
}