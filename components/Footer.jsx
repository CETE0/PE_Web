import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * Footer artesanal - Mantiene la calidez de la marca
 * Textura sutil y elementos orgánicos
 */
export default function Footer() {
  return (
    <footer className="relative text-white" style={{backgroundColor: '#732621'}}>
      {/* Contenido principal */}
      <div className="relative z-10 py-8">
        <div className="container">
          {/* Información de contacto compacta con logo */}
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
              
              {/* Logo al lado izquierdo */}
              <div className="flex justify-center md:justify-start items-start">
                <Image
                  src="/assets/Logo/PNG/logo alternativo blanco.png"
                  width={150}
                  height={40}
                  alt="Puerto Escondido"
                  sizes="(min-width: 768px) 150px, 120px"
                  className="w-[120px] md:w-[150px] h-auto"
                />
              </div>
              
              {/* Dirección */}
              <div>
                <h3 className="footer-label text-xs">DIRECCIÓN</h3>
                <p className="footer-info text-sm">
                  Quilpué<br />
                  Valparaíso, Chile
                </p>
              </div>
              
              {/* Horarios */}
              <div>
                <h3 className="footer-label text-xs">HORARIOS</h3>
                <p className="footer-info text-sm">
                  Martes - Domingo<br />
                  13:00 - 22:30 hrs
                </p>
              </div>
              
              {/* Contacto */}
              <div>
                <h3 className="footer-label text-xs">CONTACTO</h3>
                <p className="footer-info text-sm">
                  +56 9 1234 5678<br />
                  info@puertoescondido.cl
                </p>
              </div>
              
              {/* Redes */}
              <div>
                <h3 className="footer-label text-xs">REDES</h3>
                <a
                  href="https://instagram.com/puertoescondido_cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-info footer-link-hover transition-colors duration-300 inline-block text-sm"
                  aria-label="Instagram"
                >
                  @puertoescondido_cl
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Copyright compacto */}
          <ScrollReveal delay={0.5}>
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <p className="text-white/70 text-xs">
                © 2025 Puerto Escondido - Todos los derechos reservados
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}


