import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X, Film, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(false);

  const linkClass = "text-secondary-light no-underline font-semibold text-sm sm:text-[0.95rem] transition-all duration-300 hover:text-primary-light relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-light after:transition-all after:duration-300 hover:after:w-full flex items-center gap-2";

  const renderAuthButtons = (isMobile = false) => {
    if (isAuthenticated) {
      return (
        <div className={`flex ${isMobile ? "flex-col items-start gap-5" : "items-center gap-6"}`}>
          <span className="text-secondary-light font-semibold text-sm sm:text-[0.95rem] flex items-center gap-2">
            <User size={18} className="text-primary-light" /> {user?.username}
          </span>
          <button
            onClick={() => { logout(); setIsOpen(false); }}
            className="bg-gradient-to-br from-primary to-primary-light text-white border-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg cursor-pointer font-bold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      );
    }

    return (
      <div className={`flex ${isMobile ? "flex-col items-start gap-5" : "items-center gap-4"}`}>
        <Link to="/login" className={linkClass} onClick={() => setIsOpen(false)}>Log In</Link>
        <Link
          to="/register"
          onClick={() => setIsOpen(false)}
          className="bg-gradient-to-br from-primary to-primary-light text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg no-underline hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 font-bold"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-primary-dark/90 backdrop-blur-md border-b border-white/5 shadow-2xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent tracking-tight">
          <Film size={32} className="text-primary" /> MovieHub
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-secondary-light focus:outline-none">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <div className="hidden lg:flex gap-8 items-center">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/search" className={linkClass}>Search</Link>
          <Link to="/genres" className={linkClass}>Genres</Link>
          <Link to="/now-playing" className={linkClass}>Now Playing</Link>
          {isAuthenticated && (
            <Link to="/favorites" className={`${linkClass} text-red-400 hover:text-red-300`}>
              Favorites
            </Link>
          )}
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          {renderAuthButtons()}
        </div>
      </div>

      <div className={`${isOpen ? "max-h-[500px] opacity-100 py-8" : "max-h-0 opacity-0 py-0"} lg:hidden bg-secondary overflow-hidden transition-all duration-500 ease-in-out px-6`}>
        <div className="flex flex-col gap-6">
          <Link to="/" className={linkClass} onClick={toggleMenu}>Home</Link>
          <Link to="/search" className={linkClass} onClick={toggleMenu}>Search</Link>
          <Link to="/genres" className={linkClass} onClick={toggleMenu}>Genres</Link>
          <Link to="/now-playing" className={linkClass} onClick={toggleMenu}>Now Playing</Link>
          {isAuthenticated && <Link to="/favorites" className={linkClass} onClick={toggleMenu}>Favorites</Link>}
          <div className="pt-6 border-t border-white/5">{renderAuthButtons(true)}</div>
        </div>
      </div>
    </nav>
  );
}