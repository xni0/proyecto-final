import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { movieService } from '../services/movie.service';
import type { PersonDetail } from '../types/movie.types';
import Loader from '../atoms/Loader';
import Button from '../atoms/Button';

export function PersonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Estado para los detalles de la persona
  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
  
  // Cargar detalles de la persona
  useEffect(() => {
    if (id) {
      setLoading(true);
      movieService.getPersonDetails(Number(id))
        .then(setPerson)
        .catch(err => {
          console.error('Error cargando detalles de la persona:', err);
          setError('No se pudieron cargar los detalles');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Estado de carga
  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader />
      </div>
    );
  }

  // Estado de error
  if (error || !person) {
    let mensajeError = 'Persona no encontrada';
    if (error) {
      mensajeError = error;
    }

    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">❌ {mensajeError}</h2>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    );
  }

  // Determinar imagen de perfil
  let imagenPerfil = '/placeholder-person.png';
  if (person.profile_path) {
    imagenPerfil = `${IMAGE_BASE_URL}/w500${person.profile_path}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 sm:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Información principal */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-10 sm:mb-12">
          
          {/* Foto de perfil */}
          <div className="flex-shrink-0 w-full sm:w-80">
            <img
              src={imagenPerfil}
              alt={person.name}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          {/* Información básica */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-5xl font-black mb-4 text-white">{person.name}</h1>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                
                {/* Departamento conocido */}
                {person.known_for_department && (
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Conocido por</span>
                    <span className="block text-base sm:text-lg font-bold">{person.known_for_department}</span>
                  </div>
                )}

                {/* Fecha de nacimiento */}
                {person.birthday && (
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Fecha de nacimiento</span>
                    <span className="block text-base sm:text-lg font-bold">{person.birthday}</span>
                  </div>
                )}

                {/* Lugar de nacimiento */}
                {person.place_of_birth && (
                  <div className="md:col-span-2">
                    <span className="block text-sm text-gray-400 mb-1">Lugar de nacimiento</span>
                    <span className="block text-base sm:text-lg font-bold">{person.place_of_birth}</span>
                  </div>
                )}

                {/* Fecha de fallecimiento si existe */}
                {person.deathday && (
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Fecha de fallecimiento</span>
                    <span className="block text-base sm:text-lg font-bold">{person.deathday}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Biografía */}
        {person.biography && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Biografía</h2>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
                {person.biography}
              </p>
            </div>
          </div>
        )}

        {/* Si no hay biografía */}
        {!person.biography && (
          <div className="mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
              <p className="text-gray-400 italic text-sm sm:text-base">No hay biografía disponible.</p>
            </div>
          </div>
        )}

        <Button onClick={() => navigate(-1)}>← Volver</Button>
      </div>
    </div>
  );
}
