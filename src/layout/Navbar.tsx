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
          <span className="text-secondary-light font-semibold text-[0.95rem]">
            👤 {user?.username}
          </span>
          <button
            onClick={logout}
            className="bg-gradient-to-br from-primary to-primary-light text-white border-none px-5 py-2.5 rounded-lg cursor-pointer font-bold transition-all duration-300 text-[0.95rem] hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
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
          className="text-secondary-light no-underline font-semibold text-[0.95rem] transition-colors duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="bg-gradient-to-br from-primary to-primary-light text-white px-5 py-2.5 rounded-lg no-underline hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          Registrarse
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-primary-dark to-secondary shadow-2xl sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent tracking-tight"
        >
          🎬 MovieHub
        </Link>

        <div className="flex gap-10 items-center">
          <Link
            to="/"
            className="text-secondary-light no-underline font-semibold text-[0.95rem] transition-colors duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full"
          >
            Inicio
          </Link>
          <Link to="/search" className="...">
            Buscar
          </Link>
          <Link to="/genres" className="...">
            Géneros
          </Link>
          <Link to="/now-playing" className="...">
            En Cines
          </Link>

          {isAuthenticated && (
            <Link
              to="/favorites"
              className="text-secondary-light no-underline font-semibold text-[0.95rem] transition-colors duration-300 hover:text-red-500 relative"
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
