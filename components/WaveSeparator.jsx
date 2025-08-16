/**
 * WaveSeparator - Separador artesanal con motivo de olas
 * Inspirado en los toldos de Puerto Escondido, Oaxaca
 * Refuerza la identidad de marca de manera única y orgánica
 */
export default function WaveSeparator({ 
  color = '#DB633E', 
  height = 60, 
  className = '',
  flip = false 
}) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={flip ? 'transform rotate-180' : ''}
        preserveAspectRatio="none"
      >
        <path
          d="M0 20C80 20 80 40 160 40C240 40 240 10 320 10C400 10 400 35 480 35C560 35 560 15 640 15C720 15 720 45 800 45C880 45 880 25 960 25C1040 25 1040 5 1120 5C1160 5 1180 10 1200 15V60H0V20Z"
          fill={color}
          fillOpacity="0.8"
        />
        <path
          d="M0 30C100 30 100 50 200 50C300 50 300 20 400 20C500 20 500 45 600 45C700 45 700 25 800 25C900 25 900 55 1000 55C1100 55 1100 35 1200 35V60H0V30Z"
          fill={color}
          fillOpacity="0.6"
        />
        <path
          d="M0 40C120 40 120 60 240 60C360 60 360 30 480 30C600 30 600 55 720 55C840 55 840 35 960 35C1080 35 1080 65 1200 65V60H0V40Z"
          fill={color}
          fillOpacity="0.4"
        />
      </svg>
    </div>
  );
}

/**
 * ToldoSeparator - Separador más elaborado con motivo de toldo completo
 */
export function ToldoSeparator({ className = '' }) {
  return (
    <div className={`w-full py-8 ${className}`}>
      <div className="container">
        <svg
          width="100%"
          height="80"
          viewBox="0 0 800 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          {/* Estructura del toldo */}
          <path
            d="M50 20L750 20C760 20 770 30 770 40L770 60C770 70 760 80 750 80L50 80C40 80 30 70 30 60L30 40C30 30 40 20 50 20Z"
            fill="#DB633E"
            fillOpacity="0.1"
            stroke="#DB633E"
            strokeWidth="2"
          />
          
          {/* Ondas decorativas */}
          <path
            d="M80 40C120 35 160 45 200 40C240 35 280 45 320 40C360 35 400 45 440 40C480 35 520 45 560 40C600 35 640 45 680 40C720 35 740 40 750 42"
            stroke="#DB633E"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Detalles artesanales */}
          <circle cx="100" cy="50" r="2" fill="#FFF796" fillOpacity="0.8" />
          <circle cx="300" cy="45" r="2" fill="#3D5EA6" fillOpacity="0.8" />
          <circle cx="500" cy="52" r="2" fill="#FFF796" fillOpacity="0.8" />
          <circle cx="700" cy="48" r="2" fill="#3D5EA6" fillOpacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
