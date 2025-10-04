import Head from "next/head";
import { useState } from "react";
import HeaderResponsive from "@/components/HeaderResponsive";
import { ImageWrapperResponsive, HeroImageResponsive, DecorativeImageResponsive, SectionImageResponsive } from "@/components/ImageWrapperResponsive";
import Footer from "@/components/Footer";
import ScrollReveal, { FadeInImage } from "@/components/ScrollReveal";

/**
 * Página de ejemplo implementando todas las mejoras responsive
 * Puedes usar esta página como referencia para migrar tu index.js actual
 * 
 * Para probar: http://localhost:3000/ejemplo-responsive
 */

export default function EjemploResponsive() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    personas: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
    <>
      <Head>
        <title>Puerto Escondido - Versión Responsive</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles/responsive-improvements.css" />
      </Head>

      <HeaderResponsive />

      {/* Hero Section Responsive */}
      <section 
        id="inicio" 
        className="section relative min-h-screen overflow-hidden pt-20 md:pt-24 lg:pt-32"
        style={{ backgroundColor: '#FBFFEE' }}
      >
        <div className="container min-h-[calc(100vh-80px)] relative px-4 md:px-8">
          
          {/* Logo - Responsive sizing */}
          <div className="absolute top-1/4 left-0 transform -translate-y-1/2 w-full md:w-auto">
            <ScrollReveal delay={0.2}>
              <HeroImageResponsive
                src="/assets/Logo/PNG/logo alternativo.png"
                alt="Puerto Escondido"
                width={800}
                height={400}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 800px"
                className="max-w-[90vw] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]"
              />
            </ScrollReveal>
          </div>

          {/* Taco Grande - Responsive con menor prominencia en móvil */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 md:translate-x-1/4 lg:translate-x-1/3">
            <SectionImageResponsive
              src="/assets/Elementos Gráficos/taco 2.png"
              alt="Taco artesanal"
              type="taco"
              width={1400}
              height={1120}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 100vw, 1400px"
              priority
            />
          </div>

          {/* Tagline - Mejor posicionado para móviles */}
          <div className="absolute bottom-8 right-4 md:bottom-12 md:right-8 lg:bottom-16 lg:right-0 max-w-[250px] md:max-w-none">
            <ScrollReveal delay={0.6}>
              <p 
                className="tagline-small text-right bg-white/80 md:bg-transparent p-2 md:p-0 rounded md:rounded-none"
                style={{ color: '#732621' }}
              >
                LA CALLE SE HIZO MESA,<br />
                LA COSTA SE HIZO TACO
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sección "Cada Taco Toca" - Responsive Grid */}
      <section 
        id="cada-taco-toca" 
        className="section py-8 md:py-12 lg:py-16"
        style={{ backgroundColor: '#FBFFEE' }}
      >
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            
            {/* Artesano - Se oculta en móviles muy pequeños */}
            <div className="hidden sm:flex justify-center lg:justify-end order-2 lg:order-1">
              <DecorativeImageResponsive
                src="/assets/Elementos Gráficos/artesano:a 2.png"
                alt="Artesano preparando tacos"
                width={350}
                height={300}
                initialRotation={-12}
                hoverRotation={0}
                hideOnMobile={false}
              />
            </div>

            {/* Contenido Central */}
            <div className="text-center order-1 lg:order-2 px-4 lg:px-2">
              <ScrollReveal delay={0.3}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#732621' }}>
                  CADA TACO TOCA
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: 'rgba(115, 38, 33, 0.8)' }}>
                  Taquería que combina lo mejor de la comida callejera 
                  mexicana con un toque casero y presentaciones cuidadas, 
                  trayendo un pedacito de <strong>México a Chile</strong>.
                </p>
                
                <button className="btn-outline px-6 py-2 md:px-8 md:py-3">
                  Nuestra Historia
                </button>
              </ScrollReveal>
            </div>

            {/* Salsa Picante - Se adapta al espacio disponible */}
            <div className="flex justify-center lg:justify-start order-3">
              <DecorativeImageResponsive
                src="/assets/Elementos Gráficos/salsa picante.png"
                alt="Salsa picante artesanal"
                width={350}
                height={400}
                initialRotation={12}
                hoverRotation={0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menú - Con imagen adaptativa */}
      <section 
        id="menu" 
        className="section py-8 md:py-12 lg:py-16 overflow-visible"
        style={{ backgroundColor: '#FBFFEE' }}
      >
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Contenido */}
            <div className="order-2 lg:order-1">
              <ScrollReveal delay={0.2}>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8" style={{ color: '#732621' }}>
                  NUESTROS<br />
                  TACOS
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <p className="text-base md:text-lg lg:text-xl mb-10" style={{ color: 'rgba(115, 38, 33, 0.8)' }}>
                  Una carta breve, honesta y rotativa: maíz nixtamalizado, 
                  salsas hechas en casa y rellenos que respetan el origen.
                </p>
                
                <a
                  href="https://toteat.shop/r/cl/Puerto-Escondido-tacos/21637/checkin/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-menu-cta w-full md:w-auto"
                >
                  VER EL MENÚ COMPLETO
                </a>
              </ScrollReveal>
            </div>

            {/* Imagen del Taco - Oculta en móvil */}
            <div className="order-1 lg:order-2 -mx-4 md:mx-0 hidden md:block">
              <SectionImageResponsive
                src="/assets/Elementos Gráficos/taco.png"
                alt="Taco artesanal"
                type="taco"
                width={1800}
                height={1260}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reservas - Formulario Responsive */}
      <section 
        id="reservas" 
        className="section py-8 md:py-12 lg:py-16"
        style={{ backgroundColor: '#FBFFEE' }}
      >
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-6xl mx-auto">
            
            {/* Formulario */}
            <div>
              <ScrollReveal delay={0.1}>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12" style={{ color: '#732621' }}>
                  RESERVAS
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  {/* Nombre y Teléfono */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="form-label-bold">NOMBRE</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        className="form-field-bold"
                      />
                    </div>

                    <div>
                      <label className="form-label-bold">TELÉFONO</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+56 9 xxxx xxxx"
                        className="form-field-bold"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="form-label-bold">
                      EMAIL <span className="text-gray-500 text-xs font-normal">(opcional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="form-field-bold"
                    />
                  </div>

                  {/* Fecha, Hora, Personas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div>
                      <label className="form-label-bold">FECHA</label>
                      <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        className="form-field-bold"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <label className="form-label-bold">HORA</label>
                      <input
                        type="time"
                        name="hora"
                        value={formData.hora}
                        onChange={handleInputChange}
                        className="form-field-bold"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="form-label-bold">PERSONAS</label>
                      <input
                        type="number"
                        name="personas"
                        value={formData.personas}
                        onChange={handleInputChange}
                        min="1"
                        max="12"
                        placeholder="2"
                        className="form-field-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button type="submit" className="btn-reservar w-full">
                      RESERVAR AHORA
                    </button>
                  </div>
                </form>
              </ScrollReveal>
            </div>

            {/* Imagen Vasos - Adaptativa */}
            <div className="hidden lg:block">
              <SectionImageResponsive
                src="/assets/Elementos Gráficos/vasos.png"
                alt="Vasos artesanales"
                type="vasos"
                width={700}
                height={560}
                sizes="(max-width: 1024px) 0vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación - Layout Responsive */}
      <section 
        id="ubicacion" 
        className="section py-8 md:py-12 lg:py-16"
        style={{ backgroundColor: '#FBFFEE' }}
      >
        <div className="container px-4 md:px-8">
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 md:mb-12 lg:mb-16" style={{ color: '#732621' }}>
              ENCUÉNTRANOS
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
            
            {/* Información */}
            <div className="text-center lg:text-left">
              <ScrollReveal delay={0.3}>
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h3 className="contact-label">DIRECCIÓN</h3>
                    <p className="contact-info">Avenida los carrera 1765, Strip center IPA</p>
                  </div>
                  
                  <div>
                    <h3 className="contact-label">HORARIOS</h3>
                    <p className="contact-info">Martes - Domingo<br />13:00 - 22:30 hrs</p>
                  </div>
                  
                  <div>
                    <h3 className="contact-label">TELÉFONO</h3>
                    <p className="contact-info">+56 9 5539 2622</p>
                  </div>
                  
                  <div>
                    <h3 className="contact-label">INSTAGRAM</h3>
                    <p className="contact-info">@puerto.escondido.cl</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Mapa - Responsive */}
            <div>
              <ScrollReveal delay={0.5}>
                <div className="aspect-video lg:aspect-[4/3] w-full overflow-hidden rounded-none border-4" style={{ borderColor: '#732621' }}>
                  <iframe
                    title="Mapa Quilpué"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.78979994994!2d-71.44084592360329!3d-33.04741317465539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dda7f1e56aef%3A0xb1b2e3cc4a69c9c6!2sQuilpu%C3%A9%2C%20Valpara%C3%ADso%2C%20Chile!5e0!3m2!1ses!2scl!4v1700000000000"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
