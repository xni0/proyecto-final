import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

export function Login() {
  // Estado simple del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook de autenticación
  const { login, error } = useAuth();
  const navigate = useNavigate();

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-center text-2xl sm:text-3xl mb-6 sm:mb-8 text-primary-dark">🎬 Log In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm text-center m-0">{error}</p>}
          <Button type="submit">Log In</Button>
          <p className="text-center text-xs sm:text-[0.85rem] text-gray-500 mt-4">
            Use your API credentials.
          </p>
        </form>
      </div>
    </div>
  );
}
