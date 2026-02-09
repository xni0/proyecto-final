import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-[8rem] font-black my-0 mb-4 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-primary-dark">Página no encontrada</h2>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/')}>Volver al Inicio</Button>
          <Button onClick={() => navigate(-1)} variant="secondary">
            Volver Atrás
          </Button>
        </div>
      </div>
    </div>
  );
}