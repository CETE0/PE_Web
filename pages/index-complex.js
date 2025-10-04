import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal, { FadeInImage, ParallaxElement } from "@/components/ScrollReveal";
import { useReservation } from "@/hooks/useReservation";

/*
🎯🎯 SISTEMA COMPLETO DE CONTROL VISUAL - PUERTO ESCONDIDO

Este archivo incluye CUATRO sistemas de ajuste para el control completo de la web:

🎛️ SISTEMA 1: Variables CSS para ESPACIADO ENTRE SECCIONES (NUEVO - MÁXIMO CONTROL)
🎛️ SISTEMA 2: Variables CSS para POSICIONAMIENTO DE IMÁGENES (Avanzado)
🎛️ SISTEMA 3: Variables CSS LEGACY (Para compatibilidad)
🎛️ SISTEMA 4: Estilos Inline (Control directo - menos recomendado)

📍 SISTEMA 1: CONTROL DE ESPACIADO ENTRE SECCIONES
   - Edita las variables en styles/globals.css:
     🔥 SECCIÓN "CADA TACO TOCA":
     --cada-taco-toca-padding-y-mobile: 0.5rem    (espaciado vertical móvil - REDUCIDO PARA SUBIR SECCIÓN)
     --cada-taco-toca-padding-y-desktop: 1rem     (espaciado vertical desktop - REDUCIDO PARA SUBIR SECCIÓN)
     --cada-taco-toca-padding-x-top: 0.25rem      (padding superior)
     --cada-taco-toca-padding-x-bottom: 0.25rem   (padding inferior)

     🔥 SECCIÓN MENÚ:
     --menu-padding-y-mobile: 2rem                (espaciado vertical móvil - BALANCEADO)
     --menu-padding-y-desktop: 3rem               (espaciado vertical desktop - BALANCEADO)

     🔥 SECCIÓN RESERVAS:
     --reservas-padding-y-mobile: 2.5rem          (espaciado vertical móvil - REDUCIDO PARA SUBIR SECCIÓN)
     --reservas-padding-y-desktop: 3.5rem         (espaciado vertical desktop - REDUCIDO PARA SUBIR SECCIÓN)

     🔥 SECCIÓN UBICACIÓN:
     --ubicacion-padding-y-mobile: 3rem           (espaciado vertical móvil - AUMENTADO PARA MAYOR DISTANCIA)
     --ubicacion-padding-y-desktop: 4rem          (espaciado vertical desktop - AUMENTADO PARA MAYOR DISTANCIA)

📍 SISTEMA 2: CONTROL DE IMÁGENES AVANZADO
   - Edita las variables en styles/globals.css:

🎛️ MÉTODO 1: Variables CSS AVANZADAS (Máximo control - RECOMENDADO)
   - Edita las variables en styles/globals.css:
     🔥 SISTEMA AVANZADO:
     --taco-position-x: -120px        (movimiento horizontal del taco)
     --taco-position-y: 0px          (movimiento vertical del taco)
     --vasos-position-x: -100px      (movimiento horizontal de los vasos)
     --vasos-position-y: 0px         (movimiento vertical de los vasos)
     --taco-scale: 1.5               (escala del taco: 1.5 = 150%)
     --vasos-scale: 1.4              (escala de los vasos: 1.4 = 140%)
     --taco-rotation: 0deg           (rotación del taco)
     --vasos-rotation: 0deg          (rotación de los vasos)

🎛️ MÉTODO 2: Variables CSS LEGACY (Para compatibilidad)
   - Edita las variables en styles/globals.css:
     --taco-margin-right: 8rem        (posición del taco - aumentado)
     --vasos-margin-right: 7rem       (posición de los vasos/tasas - aumentado)
     --taco-translate-x: 0px          (ajuste fino del taco)
     --vasos-translate-x: 0px         (ajuste fino de los vasos/tasas)
     --vasos-width-mobile: 400px      (ancho en móvil)
     --vasos-width-tablet: 550px      (ancho en tablet)
     --vasos-width-desktop: 700px     (ancho en desktop)

🎛️ MÉTODO 3: Estilos Inline (Control directo - menos recomendado)

📍 UBICACIONES DE LAS IMÁGENES:
   - TACO GRANDE: Líneas ~240-255 (Sección Menú)
   - VASOS/TASAS ARTESANALES: Líneas ~395-410 (Sección Reservas)

💡 GUÍA DE AJUSTES AVANZADOS:

   🔥🔥 SISTEMA AVANZADO (MÉTODO 1 - RECOMENDADO - VALORES ACTUALES APLICADOS):
      🔥 MOVER EXTREMADAMENTE A LA DERECHA:
         ✅ --taco-position-x: -220px (APLICADO - MÁS a la derecha dentro del container)
         ✅ --vasos-position-x: -200px (APLICADO - MÁS a la derecha dentro del container)

      🔥 MOVER EXTREMADAMENTE A LA IZQUIERDA:
         - --taco-position-x: 100px (más a la izquierda)
         - --vasos-position-x: 80px (más a la izquierda)

      🔥 MOVER VERTICALMENTE:
         - --taco-position-y: -50px (arriba) o 50px (abajo)
         - --vasos-position-y: -30px (arriba) o 30px (abajo)

      🔥 AGRANDAR EXTREMADAMENTE:
         ✅ --taco-scale: 1.35 (APLICADO - 135% del tamaño - MODERADO PARA NO INVADIR TEXTO)
         ✅ --vasos-scale: 1.25 (APLICADO - 125% del tamaño - MODERADO)
         - Para más grande: --taco-scale: 1.8 (180% del tamaño)
         - Para más grande: --vasos-scale: 1.6 (160% del tamaño)

      🔥 ROTAR IMÁGENES:
         - --taco-rotation: 15deg (rotación horaria)
         - --vasos-rotation: -10deg (rotación antihoraria)

   🔥 SISTEMA LEGACY (MÉTODO 2):
      - Funciona igual que antes pero con menos control

   🔥 ESTILOS INLINE (MÉTODO 3):
      - Para ajustes rápidos temporales

   🔥🔥 EFECTO CONTENEDOR REDUCIDO (ACTUALMENTE APLICADO):
      ✅ Taco Container: Reducido a col-span-1 con imagen 1.35x sobresaliendo
      ✅ Vasos Container: Con imagen 1.25x sobresaliendo
      ✅ Efecto Visual: Imágenes moderadas que no invaden el texto
      ✅ Movimiento: -220px para taco, -200px para vasos (MÁS a la derecha)
      - Para ajustar contenedor: Modifica className de grid en el componente
      - Para más efecto: Aumenta --taco-scale y --vasos-scale

💡 GUÍA DE AJUSTES PARA ESPACIADO DE SECCIONES:

   🔥🔥 VALORES OPTIMIZADOS APLICADOS (ACTUALMENTE ACTIVOS):
      ✅ --cada-taco-toca-padding-y-mobile: 0.5rem (OPTIMIZADO - sección subida para mejor flujo)
      ✅ --cada-taco-toca-padding-y-desktop: 1rem (OPTIMIZADO - sección subida para mejor flujo)
      ✅ --menu-padding-y-mobile: 2rem (BALANCEADO - buen flujo en móvil)
      ✅ --menu-padding-y-desktop: 3rem (BALANCEADO - espacio generoso en desktop)
      ✅ --reservas-padding-y-mobile: 2.5rem (OPTIMIZADO - sección subida para mejor flujo)
      ✅ --reservas-padding-y-desktop: 3.5rem (OPTIMIZADO - sección subida para mejor flujo)
      ✅ --ubicacion-padding-y-mobile: 3rem (AUMENTADO - separación clara de reservas)
      ✅ --ubicacion-padding-y-desktop: 4rem (AUMENTADO - separación clara de reservas)

   🔥 HACER SECCIONES MÁS CERCANAS:
      - --cada-taco-toca-padding-y-mobile: 0.5rem (ultra compacto)
      - --cada-taco-toca-padding-y-desktop: 1rem (compacto)
      - --menu-padding-y-mobile: 1rem (compacto)
      - --menu-padding-y-desktop: 2rem (compacto)

   🔥 HACER SECCIONES MÁS SEPARADAS:
      - --cada-taco-toca-padding-y-mobile: 2rem (más aire)
      - --cada-taco-toca-padding-y-desktop: 3rem (más aire)
      - --menu-padding-y-mobile: 3rem (más aire)
      - --menu-padding-y-desktop: 4rem (más aire)

   🔥 AJUSTES POR SECCIÓN INDIVIDUAL:
      - Para "Cada Taco Toca": Modifica --cada-taco-toca-padding-*
      - Para "Menú": Modifica --menu-padding-*
      - Para "Reservas": Modifica --reservas-padding-*
      - Para "Ubicación": Modifica --ubicacion-padding-*

   🔥🔥 CAMBIOS ESPECÍFICOS APLICADOS:

      📏 REDUCCIÓN DISTANCIA HERO:
      - Sección Hero: Cambiada de min-h-screen (100vh) a min-h-[80vh] (20% menos altura)
      - Sección "Cada Taco Toca": Padding reducido para mejor transición
      - Resultado: 20% menos distancia de scroll entre hero y primera sección

      📏 AJUSTE FLUJO HEADER-HERO-PRIMERA SECCIÓN:
      - Sección Hero: Agregado pt-8 (móvil) y pt-12 (desktop) para bajar del header
      - Logo Hero: Movido de top-1/4 → top-1/3 → top-2/5 → top-3/7 para bajar todo proporcionalmente
      - Taco Hero: Movido de top-3/7 → top-1/2 → top-2/5 → top-3/7 → top-4/9 → top-5/11 → top-1/2 → top-3/5 para bajar más proporcionalmente
      - Tagline Hero: Movido de bottom-32 → bottom-24 → bottom-20 → bottom-16 → bottom-12 → bottom-8 (móvil) y bottom-28 → bottom-24 → bottom-20 → bottom-16 → bottom-12 (desktop) para bajar más proporcionalmente, y right-2 → right-1 → right-0.5 → right-0 (móvil) y right-4 → right-2 → right-1 → right-0 (desktop) para mover al borde completo
      - Sección "Cada Taco Toca": Padding reducido 0.75rem→0.5rem (móvil) y 1.5rem→1rem (desktop)
      - Resultado: Contenido del hero bajado y flujo más compacto desde header hasta primera sección

      📏 AJUSTE SECCIÓN RESERVAS SUBIDA:
      - Sección Reservas: Padding reducido 4rem→2.5rem (móvil) y 5rem→3.5rem (desktop)
      - Resultado: Sección reservas más cerca de la sección menú, mejor flujo visual

      📏 AUMENTO DISTANCIA SECCIONES 3-4:
      - Sección Reservas: Padding reducido para subir, pero ubicación mantiene separación
      - Sección Ubicación: Padding mantiene 3rem→3rem (móvil) y 4rem→4rem (desktop)
      - Resultado: Reservas más cerca del menú, pero ubicación mantiene separación del formulario

⚠️ NOTAS IMPORTANTES:
   - 🎯 ESPACIADO: Secciones ahora controladas por variables CSS (Sistema 1)
   - 🖼️ IMÁGENES: Controladas por variables CSS avanzadas (Sistema 2)
   - 📱 RESPONSIVE: Variables separadas para móvil y desktop
   - ⚡ TIEMPO REAL: Cambios aplicados inmediatamente al guardar globals.css
   - 🔧 SENCILLO: Solo edita valores en styles/globals.css
   - 📏 UNIDADES: rem para espaciado, px para posiciones de imágenes
*/


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Hook para manejar el formulario de reservas
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    updateField,
    submitReservation,
    resetForm,
  } = useReservation();

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
              telephone: "+56955392622",
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
      <section id="inicio" className="section relative min-h-[80vh] overflow-hidden pt-8 lg:pt-12" style={{backgroundColor: '#FBFFEE'}}>
        <div className="container min-h-[80vh] relative">
          
          {/* Logo Alternativo Gigante - Posición Superior Bajada Más */}
          <div className="absolute top-3/7 left-0 transform -translate-y-1/2">
            <ScrollReveal delay={0.2}>
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/Logo/PNG/logo alternativo.png"
                  alt="Puerto Escondido"
                  width={800}
                  height={400}
                  sizes="(min-width: 1280px) 800px, (min-width: 1024px) 700px, (min-width: 768px) 600px, 500px"
                  className="w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] h-auto"
                  priority
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Taco Gigante - Posición Centro-Derecha Bajada Más Proporcionalmente */}
          <div className="absolute top-3/5 right-0 transform -translate-y-1/2 translate-x-2/6 rotate-365">
            <FadeInImage delay={0.4}>
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/Elementos Gráficos/taco 2.png"
                  alt="Taco artesanal"
                  width={1400}
                  height={1120}
                  sizes="(min-width: 1280px) 1400px, (min-width: 1024px) 1200px, (min-width: 768px) 1000px, 800px"
                  className="w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] h-auto"
                  priority
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </FadeInImage>
          </div>

          {/* Tagline Pequeño - Movido al Borde Completo */}
          <div className="absolute bottom-8 right-0 lg:bottom-7 lg:right-0">
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
      <section id="cada-taco-toca" className="relative py-1 lg:py-2 overflow-hidden" style={{
        backgroundColor: '#FBFFEE',
        paddingTop: 'var(--cada-taco-toca-padding-x-top)',
        paddingBottom: 'var(--cada-taco-toca-padding-x-bottom)',
        paddingLeft: 'var(--cada-taco-toca-padding-y-mobile)',
        paddingRight: 'var(--cada-taco-toca-padding-y-mobile)'
      }}>
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">
              
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
      <section id="menu" className="section relative py-4 lg:py-6 overflow-visible" style={{
        backgroundColor: '#FBFFEE',
        paddingTop: 'var(--menu-padding-y-mobile)',
        paddingBottom: 'var(--menu-padding-y-mobile)'
      }}>
        <div className="container flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto">
            
            {/* Contenido Textual */}
            <div className="order-2 lg:order-1 lg:col-span-1">
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
            <div
              className="order-1 lg:order-2 lg:col-span-2 flex justify-center lg:justify-end"
              style={{
                marginRight: 'var(--taco-margin-right)',
                // 💡 Ajuste fino adicional (opcional)
                transform: 'translateX(var(--taco-translate-x))'
              }}
            >
              <FadeInImage delay={0.3}>
                <div className="relative max-w-full overflow-hidden">
                  <div className="figure-wrap">
                    <Image
                      src="/assets/Elementos Gráficos/taco.png"
                      alt="Taco artesanal"
                      width={1800}
                      height={1260}
                      sizes="(min-width: 1280px) 1600px, (min-width: 1024px) 1400px, (min-width: 768px) 1200px, 960px"
                      className="img-taco w-[960px] md:w-[1200px] lg:w-[1400px] xl:w-[1600px] drop-shadow-lg"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              </FadeInImage>
            </div>
          </div>
        </div>
      </section>

      {/* Reservas - Diseño Bold y Minimalista */}
      <section id="reservas" className="section relative py-8 lg:py-12" style={{
        backgroundColor: '#FBFFEE',
        paddingTop: 'var(--reservas-padding-y-mobile)',
        paddingBottom: 'var(--reservas-padding-y-mobile)'
      }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto">
            
            {/* Título y Formulario */}
            <div>
              <ScrollReveal delay={0.1}>
                <h2 className="section-title mb-12" style={{color: '#732621'}}>
                  RESERVAS
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <div className="space-y-8">
                  {/* Mensaje de estado del formulario */}
                  {submitMessage && (
                    <div className={`p-4 rounded-lg border ${
                      submitStatus === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                      {submitMessage}
                      {submitStatus === 'error' && (
                        <div className="mt-2 text-sm" style={{color: '#732621'}}>
                          <a href="/instrucciones" target="_blank" className="underline hover:no-underline">
                            📋 Ver instrucciones de uso
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <form
                    className="space-y-8"
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log('📝 Formulario enviado desde página principal');
                      console.log('📦 Datos del formulario:', formData);
                      console.log('🚀 Llamando a submitReservation...');
                      submitReservation();
                    }}
                  >
                    <div className="space-y-6">
                      {/* Primera fila: Nombre y Teléfono */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label-bold">NOMBRE</label>
                          <input
                            type="text"
                            placeholder="Tu nombre completo"
                            className={`form-field-bold ${errors.nombre ? 'border-red-500' : ''}`}
                            value={formData.nombre}
                            onChange={(e) => updateField('nombre', e.target.value)}
                            disabled={isSubmitting}
                          />
                          {errors.nombre && (
                            <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
                          )}
                        </div>

                        <div>
                          <label className="form-label-bold">TELÉFONO</label>
                          <input
                            type="tel"
                            placeholder="+56 9 xxxx xxxx"
                            className={`form-field-bold ${errors.telefono ? 'border-red-500' : ''}`}
                            value={formData.telefono}
                            onChange={(e) => updateField('telefono', e.target.value)}
                            disabled={isSubmitting}
                          />
                          {errors.telefono && (
                            <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>
                          )}
                        </div>
                      </div>

                      {/* Segunda fila: Email (opcional pero recomendado) */}
                      <div>
                        <label className="form-label-bold">
                          EMAIL <span className="text-gray-500 text-sm font-normal" style={{color: '#732621'}}>(opcional pero recomendado)</span>
                        </label>
                        <input
                          type="email"
                          placeholder="tu@email.com"
                          className={`form-field-bold ${errors.email ? 'border-red-500' : ''}`}
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                        <p className="text-gray-600 text-xs mt-1" style={{color: '#732621'}}>
                          📧 Te enviaremos confirmación y recordatorios por email
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="form-label-bold">FECHA</label>
                        <input
                          type="date"
                          className={`form-field-bold ${errors.fecha ? 'border-red-500' : ''}`}
                          value={formData.fecha}
                          onChange={(e) => updateField('fecha', e.target.value)}
                          disabled={isSubmitting}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.fecha && (
                          <p className="text-red-600 text-sm mt-1">{errors.fecha}</p>
                        )}
                      </div>

                      <div>
                        <label className="form-label-bold">HORA</label>
                        <input
                          type="time"
                          className={`form-field-bold ${errors.hora ? 'border-red-500' : ''}`}
                          value={formData.hora}
                          onChange={(e) => updateField('hora', e.target.value)}
                          disabled={isSubmitting}
                        />
                        {errors.hora && (
                          <p className="text-red-600 text-sm mt-1">{errors.hora}</p>
                        )}
                      </div>

                      <div>
                        <label className="form-label-bold">PERSONAS</label>
                        <input
                          type="number"
                          min="1"
                          max="12"
                          placeholder="2"
                          className={`form-field-bold ${errors.personas ? 'border-red-500' : ''}`}
                          value={formData.personas}
                          onChange={(e) => updateField('personas', e.target.value)}
                          disabled={isSubmitting}
                        />
                        {errors.personas && (
                          <p className="text-red-600 text-sm mt-1">{errors.personas}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        className={`btn-reservar w-full ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                        onClick={(e) => {
                          console.log('🖱️ Botón RESERVAR AHORA clickeado');
                          console.log('📝 Estado del formulario:', {
                            isSubmitting,
                            submitStatus,
                            hasData: Object.values(formData).some(v => v !== '')
                          });
                        }}
                      >
                        {isSubmitting ? 'ENVIANDO...' : 'RESERVAR AHORA'}
                      </button>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Ilustración - TASAS/VASOS ARTESANALES */}
            <div
              className="flex justify-center lg:justify-end"
              style={{
                marginRight: 'var(--vasos-margin-right)',
                transform: 'translateX(var(--vasos-translate-x))'
              }}
            >
              <FadeInImage delay={0.4}>
                <div className="relative">
                  <Image
                    src="/assets/Elementos Gráficos/vasos.png"
                    alt="Tasas/Vasos artesanales"
                    width={700}
                    height={560}
                    sizes="(min-width: 1280px) 700px, (min-width: 1024px) 600px, (min-width: 768px) 500px, 400px"
                    className="img-vasos w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] drop-shadow-lg"
                  />
                </div>
              </FadeInImage>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación - Diseño Bold y Minimalista */}
      <section id="ubicacion" className="section py-8 lg:py-10" style={{
        backgroundColor: '#FBFFEE',
        paddingTop: 'var(--ubicacion-padding-y-mobile)',
        paddingBottom: 'var(--ubicacion-padding-y-mobile)'
      }}>
        <div className="container">
          <ScrollReveal delay={0.1}>
            <h2 className="section-title text-center mb-24" style={{color: '#732621', marginTop: '-2rem'}}>
              ENCUÉNTRANOS
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full max-w-6xl mx-auto">
            
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
                    <p className="contact-info">+56 9 5539 2622</p>
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
