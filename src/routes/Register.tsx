import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

export function Register() {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  
  const { register, error } = useAuth();
  const navigate = useNavigate();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    
    const success = await register(username, password);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-center text-2xl sm:text-3xl mb-6 sm:mb-8 text-primary-dark">🎬 Create Account</h1>
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
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          {(() => {
            const errorMessage = validationError || error;
            if (errorMessage) {
              return <p className="text-red-600 text-sm text-center m-0">{errorMessage}</p>;
            }
            return null;
          })()}
          <Button type="submit">Sign Up</Button>
          <p className="text-center text-xs sm:text-[0.85rem] text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-primary hover:underline">
              Log in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
