import { useEffect, useState } from 'react';

/**
 * LOADING SCREEN - Pantalla de carga inicial
 * Muestra un spinner y texto tipo terminal
 */
export default function LoadingScreen({ onLoadingComplete }) {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animación de puntos
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    // Barra de progreso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(dotsInterval);
          // Esperar un poco antes de desaparecer
          setTimeout(() => {
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-code-bg-primary flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo/Icono */}
        <div className="relative">
          <div className="code-spinner mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-code text-syntax-blue text-2xl animate-pulse"></i>
          </div>
        </div>

        {/* Texto tipo terminal */}
        <div className="font-mono">
          <p className="text-text-secondary text-sm mb-2">
            $ npm run portfolio
          </p>
          <p className="text-syntax-green text-lg font-bold">
            Compilando{dots}
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="w-64 h-2 bg-code-bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-syntax-blue via-syntax-purple to-syntax-cyan transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Porcentaje */}
        <p className="text-text-muted text-sm font-mono">
          {progress}% completado
        </p>
      </div>
    </div>
  );
}