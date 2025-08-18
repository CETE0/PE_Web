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
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{backgroundColor: 'rgba(115, 38, 33, 0.95)'}}
    >
      <div className="container h-20 flex items-center justify-center">
        <nav className="flex items-center gap-12">
          <a href="#inicio" className="nav-link-light">
            Home
          </a>
          <a href="#cada-taco-toca" className="nav-link-light">
            Menu
          </a>
          <a href="#reservas" className="nav-link-light">
            Reservaciones
          </a>
          <a href="#ubicacion" className="btn-contact-light">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}


