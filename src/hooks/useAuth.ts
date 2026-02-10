import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/auth.service';

// Hook simplificado con lógica clara
export function useAuth() {
  const context = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { user, setUser } = context;

  // Función simple para login
  const login = async (nick: string, pass: string) => {
    try {
      setError(null);
      const user = await authService.login(nick, pass);
      setUser(user);
      return true;
    } catch (err) {
      // Obtener mensaje de error de forma segura
      let errorMessage = 'Error logging in';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      return false;
    }
  };

  // Función simple para registro
  const register = async (nick: string, pass: string) => {
    try {
      setError(null);
      const user = await authService.register(nick, pass);
      setUser(user);
      return true;
    } catch (err) {
      // Obtener mensaje de error de forma segura
      let errorMessage = 'Error registering';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      return false;
    }
  };

  // Función simple para logout
  const logout = () => {
    setUser(null);
    setError(null);
  };

  // Valor derivado simple
  const isAuthenticated = user !== null;

  return {
    user,
    isAuthenticated,
    error,
    login,
    register,
    logout,
  };
}