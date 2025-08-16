import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * Footer artesanal - Mantiene la calidez de la marca
 * Textura sutil y elementos orgánicos
 */
export default function Footer() {
  return (
    <footer className="relative bg-pe-accent-dark text-white">
      {/* Contenido principal */}
      <div className="relative z-10 py-20">
        <div className="container">
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-16">
              <Image
                src="/assets/Logo/PNG/logo alternativo blanco.png"
                width={200}
                height={50}
                alt="Puerto Escondido"
                sizes="(min-width: 768px) 200px, 160px"
                className="w-[160px] md:w-[200px] h-auto mx-auto mb-6"
              />
              <p className="footer-tagline text-white/90">
                LA CALLE SE HIZO MESA,<br />
                LA COSTA SE HIZO TACO
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
              
              {/* Dirección */}
              <div>
                <h3 className="footer-label">DIRECCIÓN</h3>
                <p className="footer-info">
                  Quilpué<br />
                  Valparaíso, Chile
                </p>
              </div>
              
              {/* Horarios */}
              <div>
                <h3 className="footer-label">HORARIOS</h3>
                <p className="footer-info">
                  Martes - Domingo<br />
                  13:00 - 22:30 hrs
                </p>
              </div>
              
              {/* Contacto */}
              <div>
                <h3 className="footer-label">CONTACTO</h3>
                <p className="footer-info">
                  +56 9 1234 5678<br />
                  info@puertoescondido.cl
                </p>
              </div>
              
              {/* Redes */}
              <div>
                <h3 className="footer-label">REDES</h3>
                <a
                  href="https://instagram.com/puertoescondido_cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-info hover:text-pe-accent-yellow transition-colors duration-300 inline-block"
                  aria-label="Instagram"
                >
                  @puertoescondido_cl
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Copyright */}
          <ScrollReveal delay={0.5}>
            <div className="mt-16 pt-8 border-t border-white/20 text-center">
              <p className="text-white/70 text-sm">
                © 2025 Puerto Escondido - Todos los derechos reservados
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}


