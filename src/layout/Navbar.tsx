import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  // Renderizar botones de autenticacion
  const renderAuthButtons = () => {
    if (isAuthenticated) {
      // Si el usuario esta logueado
      return (
        <>
          <span className="text-secondary-light font-semibold text-sm sm:text-[0.95rem]">
            👤 {user?.username}
          </span>
          <button
            onClick={logout}
            className="bg-gradient-to-br from-primary to-primary-light text-white border-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg cursor-pointer font-bold transition-all duration-300 text-sm sm:text-[0.95rem] hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            Cerrar Sesión
          </button>
        </>
      );
    }

    // Si el usuario no esta logueado
    return (
      <>
        <Link
          to="/login"
          className="text-secondary-light no-underline font-semibold text-sm sm:text-[0.95rem] transition-colors duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="bg-gradient-to-br from-primary to-primary-light text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg no-underline hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-[0.95rem]"
        >
          Registrarse
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-primary-dark to-secondary shadow-2xl sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent tracking-tight"
        >
          🎬 MovieHub
        </Link>

        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 items-center justify-center sm:justify-end">
          <Link
            to="/"
            className="text-secondary-light no-underline font-semibold text-sm sm:text-[0.95rem] transition-colors duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full"
          >
            Inicio
          </Link>
          <Link
            to="/search"
            className="text-secondary-light no-underline font-semibold text-sm sm:text-[0.95rem] transition-colors duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full"
          >
            Buscar
          </Link>
          <Link
            to="/genres"
            className="text-secondary-light no-underline font-semibold text-sm sm:text-[0.95rem] transition-colors duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full"
          >
            Géneros
          </Link>
          <Link
            to="/now-playing"
            className="text-secondary-light no-underline font-semibold text-sm sm:text-[0.95rem] transition-colors duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full"
          >
            En Cines
          </Link>

          {isAuthenticated && (
            <Link
              to="/favorites"
              className="text-secondary-light no-underline font-semibold text-sm sm:text-[0.95rem] transition-colors duration-300 hover:text-red-500 relative"
            >
              Favoritos ❤️
            </Link>
          )}

          {renderAuthButtons()}
        </div>
      </div>
    </nav>
  );
}
