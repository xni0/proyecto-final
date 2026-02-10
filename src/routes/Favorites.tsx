import { useFavorites } from '../hooks/useFavorites';
import { MovieGrid } from '../organisms/MovieGrid';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export function Favorites() {
  const { favorites } = useFavorites();
  const { isAuthenticated } = useAuth();

  // Protección extra por si acaso
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <div className="text-center mb-8 sm:mb-12 p-5 sm:p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black my-0 mb-2 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
          Mis Favoritos
        </h1>
        <p className="text-base sm:text-lg text-gray-500 m-0">
          Tu colección personal de películas
        </p>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-base sm:text-lg">
          <p className="text-3xl sm:text-4xl mb-4">💔</p>
          <p>Aún no has guardado ninguna película.</p>
          <p className="text-xs sm:text-sm mt-2">Dale click al corazón en las películas para guardarlas aquí.</p>
        </div>
      )}
    </div>
  );
}