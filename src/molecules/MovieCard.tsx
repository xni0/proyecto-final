import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie.types';

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:shadow-xl group" onClick={handleClick}>
      {/* Imagen de película */}
      {(() => {
        const imageUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg';
        return (
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-80 object-cover transition-transform duration-400 group-hover:scale-105"
          />
        );
      })()}
      <div className="p-5 bg-gradient-to-br from-white to-gray-50">
        <h3 className="text-base font-bold my-0 mb-2.5 text-primary-dark leading-snug line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-primary my-1 font-bold">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="text-[0.85rem] text-gray-500 my-1 font-medium">{movie.release_date}</p>
      </div>
    </div>
  );
}
