import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal, { FadeInImage, ParallaxElement } from "@/components/ScrollReveal";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga mínimo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 segundos de loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Puerto Escondido | Taquería en Chile</title>
        <meta
          name="description"
          content="Taquería Puerto Escondido: comida callejera mexicana con toque casero y presentaciones cuidadas. LA CALLE SE HIZO MESA, LA COSTA SE HIZO TACO."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Puerto Escondido | Taquería en Chile" />
        <meta
          property="og:description"
          content="Comida callejera mexicana con toque casero y presentaciones cuidadas. LA CALLE SE HIZO MESA, LA COSTA SE HIZO TACO."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/hero-bg.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Puerto Escondido",
              description:
                "Taquería: comida callejera mexicana con toque casero y presentaciones cuidadas en Quilpué, Chile.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Quilpué",
                addressRegion: "Valparaíso",
                addressCountry: "CL",
              },
              telephone: "+56912345678",
              servesCuisine: ["Mexicana", "Tacos"],
              url: "https://puerto-escondido.example.com",
            }),
          }}
        />
      </Head>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />

          {/* Hero Section - Composición Exacta de la Referencia */}
      <section id="inicio" className="section relative min-h-screen overflow-hidden" style={{backgroundColor: '#FBFFEE'}}>
        <div className="container min-h-screen relative">
          
          {/* Logo Alternativo Gigante - Posición Superior */}
          <div className="absolute top-1/4 left-0 transform -translate-y-1/2">
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <Image
                  src="/assets/Logo/PNG/logo alternativo.png"
                  alt="Puerto Escondido"
                  width={800}
                  height={400}
                  sizes="(min-width: 1024px) 800px, (min-width: 768px) 640px, 480px"
                  className="w-[480px] md:w-[640px] lg:w-[800px] h-auto"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Taco Gigante - Posición Centro-Derecha Ajustada */}
          <div className="absolute top-3/7   right-0 transform -translate-y-1/2 translate-x-1/3">
            <FadeInImage delay={0.4}>
              <div className="relative">
                <Image
                  src="/assets/Elementos Gráficos/taco 2.png"
                  alt="Taco artesanal"
                  width={1500}
                  height={1200}
                  sizes="(min-width: 1024px) 1500px, (min-width: 768px) 1200px, 900px"
                  className="w-[900px] md:w-[1200px] lg:w-[1500px] h-auto"
                  priority
                />
              </div>
            </FadeInImage>
          </div>

          {/* Tagline Pequeño - Pegado al Taco */}
          <div className="absolute bottom-40 right-2 lg:bottom-48 lg:right-4">
            <ScrollReveal delay={0.6}>
              <div className="text-left">
                <p className="tagline-small leading-tight" style={{color: '#732621'}}>
                  LA CALLE SE HIZO MESA,<br />
                  LA COSTA SE HIZO TACO
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sección "Cada Taco Toca" - Estilo Primera Imagen */}
      <section id="cada-taco-toca" className="relative py-6 lg:py-8 overflow-hidden" style={{backgroundColor: '#FBFFEE', paddingTop: '2rem', paddingBottom: '4rem'}}>
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center w-full max-w-7xl mx-auto">
              
              {/* Artesano a la Izquierda */}
              <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                <FadeInImage delay={0.2}>
                  <div className="relative transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/assets/Elementos Gráficos/artesano:a 2.png"
                      alt="Artesano preparando tacos"
                      width={350}
                      height={300}
                      sizes="(min-width: 1024px) 350px, (min-width: 768px) 280px, 240px"
                      className="w-[240px] md:w-[280px] lg:w-[350px] h-auto drop-shadow-lg"
                    />
                  </div>
                </FadeInImage>
              </div>

              {/* Título Central y Descripción */}
              <div className="text-center order-1 lg:order-2 px-2">
                <ScrollReveal delay={0.3}>
                  <h2 className="main-title mb-6" style={{color: '#732621', whiteSpace: 'nowrap', textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', transform: 'translateX(-18%)'}}>
                    CADA TACO TOCA
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={0.5}>
                  <div className="max-w-md mx-auto">
                    <p className="description-text mb-6 leading-relaxed text-center" style={{color: 'rgba(115, 38, 33, 0.8)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'}}>
                      Taquería que combina lo mejor de la comida callejera 
                      mexicana con un toque casero y presentaciones cuidadas, 
                      trayendo un pedacito de <strong>México a Chile</strong>.
                    </p>
                    
                    <button type="button" className="btn-outline">
                      Nuestra Historia
                    </button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Salsa Picante a la Derecha */}
              <div className="flex justify-center lg:justify-start order-3">
                <FadeInImage delay={0.4}>
                  <div className="relative transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/assets/Elementos Gráficos/salsa picante.png"
                      alt="Salsa picante artesanal"
                      width={350}
                      height={400}
                      sizes="(min-width: 1024px) 350px, (min-width: 768px) 280px, 240px"
                      className="w-[240px] md:w-[280px] lg:w-[350px] h-auto drop-shadow-lg"
                    />
                  </div>
                </FadeInImage>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menú - Diseño Bold y Minimalista */}
      <section id="menu" className="section relative py-16 lg:py-24 overflow-hidden" style={{backgroundColor: '#FBFFEE'}}>
        <div className="container flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
            
            {/* Contenido Textual */}
            <div className="order-2 lg:order-1">
              <ScrollReveal delay={0.2}>
                <h2 className="section-title mb-8" style={{color: '#732621'}}>
                  NUESTROS<br />
                  TACOS
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <div className="max-w-md">
                  <p className="description-text-large mb-10 text-left" style={{color: 'rgba(115, 38, 33, 0.8)'}}>
                    Una carta breve, honesta y rotativa: maíz nixtamalizado, 
                    salsas hechas en casa y rellenos que respetan el origen.
                  </p>
                  
                  <button type="button" className="btn-menu-cta">
                    VER EL MENÚ COMPLETO
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Taco Grande */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <FadeInImage delay={0.3}>
                <div className="relative">
                  <Image
                    src="/assets/Elementos Gráficos/taco.png"
                    alt="Taco artesanal"
                    width={800}
                    height={560}
                    sizes="(min-width: 1024px) 800px, (min-width: 768px) 640px, 480px"
                    className="w-[480px] md:w-[640px] lg:w-[800px] h-auto drop-shadow-lg"
                  />
                </div>
              </FadeInImage>
            </div>
          </div>
        </div>
      </section>

      {/* Reservas - Diseño Bold y Minimalista */}
      <section id="reservas" className="section relative py-16 lg:py-24" style={{backgroundColor: '#FBFFEE'}}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Título y Formulario */}
            <div>
              <ScrollReveal delay={0.1}>
                <h2 className="section-title mb-12" style={{color: '#732621'}}>
                  RESERVACIONES
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label-bold">NOMBRE</label>
                      <input
                        type="text"
                        placeholder="Tu nombre completo"
                        className="form-field-bold"
                      />
                    </div>
                    
                    <div>
                      <label className="form-label-bold">TELÉFONO</label>
                      <input
                        type="tel"
                        placeholder="+56 9 xxxx xxxx"
                        className="form-field-bold"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="form-label-bold">FECHA</label>
                      <input
                        type="date"
                        className="form-field-bold"
                      />
                    </div>
                    
                    <div>
                      <label className="form-label-bold">HORA</label>
                      <input
                        type="time"
                        className="form-field-bold"
                      />
                    </div>
                    
                    <div>
                      <label className="form-label-bold">PERSONAS</label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        placeholder="2"
                        className="form-field-bold"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <button type="button" className="btn-reservar w-full">
                      RESERVAR AHORA
                    </button>
                  </div>
                </form>
              </ScrollReveal>
            </div>

            {/* Ilustración */}
            <div className="flex justify-center lg:justify-end">
              <FadeInImage delay={0.4}>
                <div className="relative">
                  <Image
                    src="/assets/Elementos Gráficos/vasos.png"
                    alt="Vasos artesanales"
                    width={500}
                    height={400}
                    sizes="(min-width: 1024px) 500px, (min-width: 768px) 400px, 320px"
                    className="w-[320px] md:w-[400px] lg:w-[500px] h-auto drop-shadow-lg"
                  />
                </div>
              </FadeInImage>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación - Diseño Bold y Minimalista */}
      <section id="ubicacion" className="section py-16 lg:py-24" style={{backgroundColor: '#FBFFEE'}}>
        <div className="container">
          <ScrollReveal delay={0.1}>
            <h2 className="section-title text-center mb-16" style={{color: '#732621'}}>
              ENCUÉNTRANOS
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Información de Contacto */}
            <div>
              <ScrollReveal delay={0.3}>
                <div className="space-y-12">
                  <div>
                    <h3 className="contact-label">DIRECCIÓN</h3>
                    <p className="contact-info">Quilpué, Valparaíso, Chile</p>
                  </div>
                  
                  <div>
                    <h3 className="contact-label">HORARIOS</h3>
                    <p className="contact-info">Martes - Domingo<br />13:00 - 22:30 hrs</p>
                  </div>
                  
                  <div>
                    <h3 className="contact-label">TELÉFONO</h3>
                    <p className="contact-info">+56 9 1234 5678</p>
                  </div>
                  
                  <div>
                    <h3 className="contact-label">INSTAGRAM</h3>
                    <p className="contact-info">@puertoescondido_cl</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Mapa */}
            <div>
              <ScrollReveal delay={0.5}>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-none border-4" style={{borderColor: '#732621'}}>
                  <iframe
                    title="Mapa Quilpué"
                    width="600"
                    height="450"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.78979994994!2d-71.44084592360329!3d-33.04741317465539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dda7f1e56aef%3A0xb1b2e3cc4a69c9c6!2sQuilpu%C3%A9%2C%20Valpara%C3%ADso%2C%20Chile!5e0!3m2!1ses!2scl!4v1700000000000"
                  ></iframe>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

          <Footer />
        </>
      )}
    </>
  );
}
