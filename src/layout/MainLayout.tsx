import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar />
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white px-8 py-8 text-center text-gray-500 border-t border-gray-300 mt-16">
        <p className="my-2">© 2026 MovieHub - Proyecto Final React P9.2</p>
        <p className="my-2">Desarrollado con React, TypeScript y TMDB API</p>
      </footer>
    </div>
  );
}