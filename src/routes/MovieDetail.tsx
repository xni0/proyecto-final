import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovies';
import { useEffect, useState } from 'react';
import { movieService } from '../services/movie.service';
import type { Credits } from '../types/movie.types';
import Loader from '../atoms/Loader';
import Button from '../atoms/Button';
import { Star, Clock, Calendar, ChevronLeft, Film } from 'lucide-react';

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(Number(id));
  const [credits, setCredits] = useState<Credits | null>(null);
  const [actoresAMostrar, setActoresAMostrar] = useState(10);

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
  
  useEffect(() => {
    if (id) {
      movieService.getMovieCredits(Number(id)).then(setCredits);
    }
  }, [id]);

  if (loading) return <Loader />;
  if (error || !movie) return <div className="text-center py-20"><Button onClick={() => navigate('/')}>Back Home</Button></div>;

  return (
    <div className="min-h-screen bg-gray-900 animate-fadeIn">
      
      <div className="relative w-full h-[50vh] lg:h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-slowZoom scale-110"
          style={{ backgroundImage: `url(${IMAGE_BASE_URL}/original${movie.backdrop_path})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        <div className="absolute bottom-0 w-full p-6 sm:p-12">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="hidden md:block w-64 shadow-2xl rounded-2xl overflow-hidden border border-white/10 animate-fadeInUp">
              <img src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            
            <div className="text-white animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">{movie.title}</h1>
              <p className="text-xl text-primary-light italic mb-6">"{movie.tagline}"</p>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <span className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg font-bold">
                  <Star size={18} fill="currentColor" /> {movie.vote_average.toFixed(1)}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Calendar size={20} className="text-primary" /> {new Date(movie.release_date).toLocaleDateString('es-ES')}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Clock size={20} className="text-primary" /> {movie.runtime} min
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(g => (
                  <span key={g.id} className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-3">
              <Film size={24} className="text-primary" /> Synopsis
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed font-light">{movie.overview}</p>
          </section>

          {credits && (
            <section>
              <h2 className="text-white text-2xl font-bold mb-6">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {credits.cast.slice(0, actoresAMostrar).map(actor => (
                  <div key={actor.id} className="group cursor-pointer" onClick={() => navigate(`/person/${actor.id}`)}>
                    <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-white/5 transition-transform group-hover:-translate-y-2">
                      <img 
                        src={actor.profile_path ? `${IMAGE_BASE_URL}/w185${actor.profile_path}` : '/placeholder-person.png'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-white font-bold text-sm line-clamp-1">{actor.name}</p>
                    <p className="text-gray-500 text-xs line-clamp-1">{actor.character}</p>
                  </div>
                ))}
              </div>
              {credits.cast.length > actoresAMostrar && (
                <div className="mt-8 flex justify-center">
                   <Button onClick={() => setActoresAMostrar(prev => prev + 10)} variant="secondary">Load More</Button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <div className="flex justify-center pb-20">
        <Button onClick={() => navigate(-1)} variant="primary" className="flex items-center gap-2">
          <ChevronLeft size={20} /> Back
        </Button>
      </div>
    </div>
  );
}