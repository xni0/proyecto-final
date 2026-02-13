import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie.types';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { Star, Heart, Calendar } from 'lucide-react';

export default function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const isFav = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-3 relative animate-fadeIn"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {isAuthenticated && (
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFav ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white/70 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart size={20} fill={isFav ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>
      )}

      <div className="overflow-hidden h-80">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-5 bg-white">
        <h3 className="text-gray-800 font-bold text-base line-clamp-1 mb-2 group-hover:text-primary transition-colors">{movie.title}</h3>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-1 text-primary font-bold">
            <Star size={16} className="fill-primary" /> {movie.vote_average.toFixed(1)}
          </span>
          <span className="flex items-center gap-1 text-gray-400 font-medium">
            <Calendar size={14} /> {movie.release_date.split('-')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}