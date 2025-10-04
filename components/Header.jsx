import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
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

  // Removemos la clase navLink ya que usaremos la nueva clase .nav-link del CSS

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundColor: 'rgba(115, 38, 33, 0.95)',
        height: '120px',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 98% 100%, 96% 85%, 94% 100%, 88% 100%, 86% 85%, 84% 100%, 78% 100%, 76% 85%, 74% 100%, 68% 100%, 66% 85%, 64% 100%, 58% 100%, 56% 85%, 54% 100%, 48% 100%, 46% 85%, 44% 100%, 38% 100%, 36% 85%, 34% 100%, 28% 100%, 26% 85%, 24% 100%, 18% 100%, 16% 85%, 14% 100%, 8% 100%, 6% 85%, 4% 100%, 0% 100%)'
      }}
    >
      <div className="container-header h-full flex items-center justify-center px-8">
        <nav className="flex items-center gap-12 lg:gap-16">
          <a href="#cada-taco-toca" className="nav-link-light text-sm lg:text-base uppercase tracking-wide hover:opacity-80 transition-opacity">
            Menu
          </a>
          <a href="#reservas" className="nav-link-light text-sm lg:text-base uppercase tracking-wide hover:opacity-80 transition-opacity">
            Reservas
          </a>
          <a href="#ubicacion" className="nav-link-light text-sm lg:text-base uppercase tracking-wide hover:opacity-80 transition-opacity">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}


