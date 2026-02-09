import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/movie.types';
import { authService } from '../services/auth.service';

// Contexto simple: solo el usuario actual
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado simple: solo el usuario
  const [user, setUser] = useState<User | null>(() => {
    // Cargar usuario guardado al inicio
    return authService.getStoredUser();
  });

  // Guardar/eliminar usuario cuando cambie
  useEffect(() => {
    if (user) {
      authService.saveUser(user);
    } else {
      authService.logout();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}