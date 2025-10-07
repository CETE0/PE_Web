import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Header Responsive - Versión mejorada del Header con menú móvil
 * Mantiene el diseño de toldo en desktop y simplifica en móvil
 */
export default function HeaderResponsive() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;
      const thresholdPassed = currentY > 64;
      setIsHidden(isScrollingDown && thresholdPassed);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú móvil al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Header principal */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          backgroundColor: 'rgba(115, 38, 33, 0.95)',
          height: '80px', // Reducido en móvil
        }}
      >
        {/* Desktop: Mantener diseño de toldo */}
        <div 
          className="hidden md:block h-full"
          style={{
            height: '120px',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 98% 100%, 96% 85%, 94% 100%, 88% 100%, 86% 85%, 84% 100%, 78% 100%, 76% 85%, 74% 100%, 68% 100%, 66% 85%, 64% 100%, 58% 100%, 56% 85%, 54% 100%, 48% 100%, 46% 85%, 44% 100%, 38% 100%, 36% 85%, 34% 100%, 28% 100%, 26% 85%, 24% 100%, 18% 100%, 16% 85%, 14% 100%, 8% 100%, 6% 85%, 4% 100%, 0% 100%)'
          }}
        >
          <div className="container-header h-full flex items-center justify-center px-8">
            <nav className="flex items-center gap-12">
              <a href="#cada-taco-toca" className="nav-link-light">
                Nosotros
              </a>
              <a href="https://toteat.shop/r/cl/Puerto-Escondido-tacos/21637/checkin/menu" target="_blank" rel="noopener noreferrer" className="nav-link-light">
                Menú
              </a>
              <a href="#reservas" className="nav-link-light">
                Reservas
              </a>
              <a href="#ubicacion" className="btn-contact-light">
                Contacto
              </a>
            </nav>
          </div>
        </div>

        {/* Mobile: Diseño simplificado */}
        <div className="md:hidden h-full flex items-center justify-between px-6">
          {/* Logo móvil */}
          <div className="flex items-center">
            <Image
              src="/assets/Logo/PNG/logo alternativo blanco.png"
              alt="Puerto Escondido"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </div>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span 
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Menú móvil deslizable */}
      <div 
        className={`md:hidden fixed inset-0 z-30 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#FBFFEE',
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 px-8">
          {/* Logo en el menú */}
          <div className="mb-8">
            <Image
              src="/assets/Logo/PNG/logo principal.png"
              alt="Puerto Escondido"
              width={200}
              height={100}
              className="w-48 h-auto"
            />
          </div>

          {/* Enlaces del menú móvil */}
          <a
            href="#cada-taco-toca"
            onClick={handleLinkClick}
            className="nav-link"
            style={{ color: '#732621' }}
          >
            NOSOTROS
          </a>
          <a
            href="https://toteat.shop/r/cl/Puerto-Escondido-tacos/21637/checkin/menu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="nav-link"
            style={{ color: '#732621' }}
          >
            MENÚ
          </a>
          <a
            href="#reservas"
            onClick={handleLinkClick}
            className="nav-link"
            style={{ color: '#732621' }}
          >
            RESERVAS
          </a>
          <a
            href="#ubicacion"
            onClick={handleLinkClick}
            className="nav-link"
            style={{ color: '#732621' }}
          >
            CONTACTO
          </a>

          {/* Información adicional */}
          <div className="mt-6 text-center">
            <p className="contact-info" style={{ color: 'rgba(115, 38, 33, 0.7)' }}>
              Martes - Domingo<br />
              13:00 - 22:30 hrs
            </p>
            <p className="contact-info mt-2" style={{ color: 'rgba(115, 38, 33, 0.7)' }}>
              +56 9 5539 2622
            </p>
          </div>
        </nav>
      </div>

      {/* Overlay para cerrar menú */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
