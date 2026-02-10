import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

export function Register() {
  // Estado simple del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Hook de autenticación
  const { register, error } = useAuth();
  const navigate = useNavigate();

  // Validación y envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validaciones simples
    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Registrar usuario
    const success = await register(username, password);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-center text-2xl sm:text-3xl mb-6 sm:mb-8 text-primary-dark">🎬 Crear Cuenta</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* Mostrar error si existe */}
          {(() => {
            const errorMessage = validationError || error;
            if (errorMessage) {
              return <p className="text-red-600 text-sm text-center m-0">{errorMessage}</p>;
            }
            return null;
          })()}
          <Button type="submit">Registrarse</Button>
          <p className="text-center text-xs sm:text-[0.85rem] text-gray-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-primary hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
