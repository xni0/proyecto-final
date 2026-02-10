import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar />
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
      <footer className="bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-gray-500 border-t border-gray-300 mt-10 sm:mt-16">
        <p className="my-2 text-sm sm:text-base">© 2026 MovieHub - Final React Project P9.2</p>
        <p className="my-2 text-sm sm:text-base">Built with React, TypeScript, and TMDB API</p>
      </footer>
    </div>
  );
}