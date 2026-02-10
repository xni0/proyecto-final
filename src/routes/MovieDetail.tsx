import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovies';
import { useEffect, useState } from 'react';
import { movieService } from '../services/movie.service';
import type { Credits } from '../types/movie.types';
import Loader from '../atoms/Loader';
import Button from '../atoms/Button';

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Usar hook simplificado
  const { movie, loading, error } = useMovieDetail(Number(id));
  
  // Estado para créditos
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loadingCredits, setLoadingCredits] = useState(false);
  
  // Estado para controlar cuántos actores mostrar
  const [actoresAMostrar, setActoresAMostrar] = useState(10);

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
  
  // Cargar créditos cuando se carga la película
  useEffect(() => {
    if (id) {
      setLoadingCredits(true);
      movieService.getMovieCredits(Number(id))
        .then(setCredits)
        .catch(err => console.error('Error cargando créditos:', err))
        .finally(() => setLoadingCredits(false));
    }
  }, [id]);

  // Estados de carga

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader />
      </div>
    );
  }

  if (error || !movie) {
    // Determinar mensaje de error
    let mensajeError = 'Película no encontrada';
    if (error) {
      mensajeError = error;
    }

    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">❌ {mensajeError}</h2>
        <Button onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* SECCIÓN SUPERIOR: Imagen de fondo con información principal */}
      <div className="relative w-full">
        {/* Determinar imagen de fondo */}
        {(() => {
          let imagenFondo = 'none';
          if (movie.backdrop_path) {
            imagenFondo = `url(${IMAGE_BASE_URL}/original${movie.backdrop_path})`;
          }

          return (
            <div
              className="w-full h-[360px] sm:h-[500px] bg-cover bg-center"
              style={{
                backgroundImage: imagenFondo,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-900"></div>
            </div>
          );
        })()}

        {/* Información principal sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 sm:gap-8">
            {/* Póster */}
            <div className="flex-shrink-0 w-full sm:w-64">
              {/* Determinar imagen del póster */}
              {(() => {
                let imagenPoster = '/placeholder.jpg';
                if (movie.poster_path) {
                  imagenPoster = `${IMAGE_BASE_URL}/w500${movie.poster_path}`;
                }
                
                return (
                  <img
                    src={imagenPoster}
                    alt={movie.title}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                );
              })()}
            </div>

            {/* Información básica */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl sm:text-5xl font-black mb-4">{movie.title}</h1>

              {movie.tagline && (
                <p className="text-base sm:text-xl italic text-gray-300 mb-6">"{movie.tagline}"</p>
              )}

              <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 text-base sm:text-lg">
                <span className="font-bold">⭐ {movie.vote_average.toFixed(1)}</span>
                <span>{movie.release_date.split('-')[0]}</span>
                <span>{movie.runtime} min</span>
              </div>

              {/* Mostrar géneros */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => {
                  return (
                    <span key={genre.id} className="px-4 py-2 bg-primary text-white rounded-full text-xs sm:text-sm font-semibold">
                      {genre.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE CONTENIDO: Fondo oscuro sólido */}
      <div className="bg-gray-900 px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Sinopsis */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Sinopsis</h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">{movie.overview}</p>
          </div>

          {/* SECCIÓN DE DIRECTORES */}
          {credits && (
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Directores</h2>
              <div className="flex flex-wrap gap-4">
                {credits.crew.map((persona) => {
                  // Solo mostrar si es director
                  if (persona.job !== 'Director') {
                    return null;
                  }

                  // Construir URL de la foto del director
                  let fotoDirector = '/placeholder-person.png';
                  if (persona.profile_path) {
                    fotoDirector = `${IMAGE_BASE_URL}/w92${persona.profile_path}`;
                  }

                  return (
                    <div 
                      key={persona.id} 
                      onClick={() => navigate(`/person/${persona.id}`)}
                      className="flex items-center gap-3 bg-gray-800 border border-gray-700 p-4 rounded-lg hover:bg-gray-750 transition cursor-pointer"
                    >
                      <img
                        src={fotoDirector}
                        alt={persona.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      />
                      <div>
                        <p className="font-bold text-white text-base sm:text-lg">{persona.name}</p>
                        <p className="text-xs sm:text-sm text-gray-400">Director</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECCIÓN DE ACTORES */}
          {credits && (
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Reparto completo</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {credits.cast.map((actor, index) => {
                  // Solo mostrar los actores hasta el límite actual
                  if (index >= actoresAMostrar) {
                    return null;
                  }

                  // Construir URL de la foto del actor
                  let fotoActor = '/placeholder-person.png';
                  if (actor.profile_path) {
                    fotoActor = `${IMAGE_BASE_URL}/w185${actor.profile_path}`;
                  }

                  return (
                    <div 
                      key={actor.id} 
                      onClick={() => navigate(`/person/${actor.id}`)}
                      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-primary transition cursor-pointer"
                    >
                      <img
                        src={fotoActor}
                        alt={actor.name}
                        className="w-full h-44 sm:h-56 object-cover"
                      />
                      <div className="p-4">
                        <p className="font-bold text-white text-sm mb-1">{actor.name}</p>
                        <p className="text-xs text-gray-400">{actor.character}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botón Cargar más */}
              {credits.cast.length > actoresAMostrar && (
                <div className="text-center mt-8">
                  <Button onClick={() => setActoresAMostrar(actoresAMostrar + 10)}>
                    Cargar más actores
                  </Button>
                </div>
              )}
            </div>
          )}

          <Button onClick={() => navigate(-1)}>← Volver</Button>
        </div>
      </div>
    </div>
  );
}
