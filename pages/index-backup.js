import Head from "next/head";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal, { FadeInImage, ParallaxElement } from "@/components/ScrollReveal";
import WaveSeparator, { ToldoSeparator } from "@/components/WaveSeparator";

export default function Home() {
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

      <LoadingScreen />
      <Header />

      {/* Inicio / Hero - Composición Asimétrica Artesanal */}
      <section id="inicio" className="section relative min-h-screen overflow-hidden">
        {/* Fondo con parallax sutil */}
        <ParallaxElement speed={0.3} className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: "url(/assets/Elementos Gráficos/toldo 3.png)",
              backgroundSize: "min(1400px, 140vw)",
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateY(-10%)",
            }}
            aria-hidden
          />
        </ParallaxElement>

        {/* Grid asimétrico - composición orgánica */}
        <div className="container min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
            
            {/* Texto principal - columnas asimétricas */}
            <div className="lg:col-span-7 lg:col-start-1 text-center lg:text-left">
              <ScrollReveal delay={0.2}>
                <h1 className="headline max-w-5xl text-pe-text-dark mb-6">
                  LA CALLE SE HIZO MESA,{" "}
                  <span className="block text-pe-accent">
                    LA COSTA SE HIZO TACO.
                  </span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <p className="subheadline text-pe-text-dark/80 max-w-xl mb-8">
                  Taquería gourmet accesible, inspirada en la estética costera de{" "}
                  <span className="text-pe-accent-blue font-semibold">Puerto Escondido, Oaxaca</span>.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <button type="button" className="btn-primary text-lg">
                  DESCUBRE NUESTRO MENÚ
                </button>
              </ScrollReveal>
            </div>

            {/* Ilustración flotante - rompiendo el grid */}
            <div className="lg:col-span-5 lg:col-start-8 relative">
              <FadeInImage delay={0.3}>
                <div className="relative">
                  {/* Elementos decorativos asimétricos */}
                  <div className="absolute -top-6 -right-4 w-20 h-20 bg-pe-accent-yellow/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-6 w-16 h-16 bg-pe-accent-blue/20 rounded-full blur-xl"></div>
                  
                  {/* Ilustración principal */}
                  <div className="transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/assets/Elementos Gráficos/artesano:a.png"
                      alt="Artesano preparando tacos"
                      width={480}
                      height={400}
                      sizes="(min-width: 1024px) 480px, (min-width: 768px) 400px, 320px"
                      className="w-[320px] md:w-[400px] lg:w-[480px] h-auto relative z-10"
                      priority
                    />
                  </div>
                  
                  {/* Sombra artesanal */}
                  <div 
                    className="absolute inset-0 bg-pe-shadow rounded-full blur-3xl opacity-25 -z-10"
                    style={{ transform: 'translateY(20px) scale(0.8)' }}
                  />
                </div>
              </FadeInImage>
            </div>
          </div>
        </div>

        {/* Scroll indicator artesanal */}
        <ScrollReveal delay={1.0}>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <span className="text-pe-text-dark/60 text-xs uppercase tracking-wide">
                Desliza para explorar
              </span>
              <div className="w-0.5 h-8 bg-pe-accent rounded-full"></div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Separador artesanal */}
      <WaveSeparator color="#DB633E" height={80} />

      {/* Quiénes Somos - Layout Asimétrico */}
      <section id="quienes-somos" className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Ilustración - posición asimétrica */}
            <div className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1">
              <FadeInImage delay={0.2}>
                <div className="relative">
                  {/* Marco artesanal */}
                  <div className="absolute -inset-4 bg-pe-accent-light rounded-2xl transform rotate-1"></div>
                  <div className="relative bg-white/80 p-6 rounded-2xl shadow-lg">
                    <Image
                      src="/assets/Elementos Gráficos/vasos.png"
                      alt="Ilustración artesanal de vasos"
                      width={420}
                      height={340}
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 280px"
                      className="w-full h-auto"
                    />
                  </div>
                  {/* Elementos decorativos */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-pe-accent-yellow rounded-full"></div>
                  <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-pe-accent-blue rounded-full"></div>
                </div>
              </FadeInImage>
            </div>
            
            {/* Contenido textual */}
            <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
              <ScrollReveal delay={0.1}>
                <h2 className="headline mb-6 text-pe-text-dark">
                  Un Pedacito de{" "}
                  <span className="text-pe-accent">México</span>{" "}
                  en Chile
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <p className="paragraph mb-6">
                  En Puerto Escondido, celebramos la tradición de la comida callejera mexicana, llevándola a la mesa con
                  cariño casero y presentaciones que enamoran. Nuestra propuesta fusiona sabores auténticos, técnicas
                  sencillas y productos frescos, para una experiencia gourmet pero cercana.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <p className="paragraph">
                  Inspirados por las playas, el surf y las fachadas coloridas de{" "}
                  <span className="font-semibold text-pe-accent">Puerto Escondido en Oaxaca</span>, buscamos que
                  cada bocado te transporte a la costa. Bienvenido a tu nueva taquería favorita en Chile.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Separador de toldo */}
      <ToldoSeparator />

      {/* Menú - Presentación Artesanal */}
      <section id="menu" className="section bg-pe-accent-light/30">
        <div className="container text-center">
          <ScrollReveal delay={0.1}>
            <h2 className="headline mb-6 text-pe-text-dark">
              Nuestros <span className="text-pe-accent">Tacos</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="paragraph max-w-2xl mx-auto mb-8">
              Una carta breve, honesta y rotativa: maíz nixtamalizado, salsas hechas en casa y rellenos que respetan el
              origen. Todo para que pruebes de a poco y vuelvas por más.
            </p>
          </ScrollReveal>

          {/* Ilustración de taco flotante */}
          <div className="relative my-12">
            <FadeInImage delay={0.4}>
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-pe-accent/10 rounded-full blur-2xl transform scale-110"></div>
                <Image
                  src="/assets/Elementos Gráficos/taco 2.png"
                  alt="Taco artesanal"
                  width={300}
                  height={200}
                  className="relative z-10 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </FadeInImage>
          </div>
          
          <ScrollReveal delay={0.6}>
            <button type="button" className="btn-primary text-lg">
              VER EL MENÚ COMPLETO
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Reservas - Formulario Minimalista */}
      <section id="reservas" className="section">
        <div className="container max-w-4xl">
          <ScrollReveal delay={0.1}>
            <h2 className="headline text-center mb-12 text-pe-text-dark">
              Reserva Tu <span className="text-pe-accent">Mesa</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="form-field"
                />
              </div>
              
              <div>
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-field"
                />
              </div>
              
              <div>
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  className="form-field"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="form-label">Número de Personas</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  placeholder="2"
                  className="form-field"
                />
              </div>
              
              <div className="md:col-span-2 flex justify-center pt-4">
                <button type="button" className="btn-primary w-full md:w-auto text-lg">
                  RESERVAR AHORA
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Separador final */}
      <WaveSeparator color="#3D5EA6" height={60} flip={true} />

      {/* Ubicación - Composición Orgánica */}
      <section id="ubicacion" className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Información y mapa */}
            <div className="lg:col-span-7 lg:col-start-1">
              <ScrollReveal delay={0.1}>
                <h2 className="headline mb-8 text-pe-text-dark">
                  <span className="text-pe-accent">Encuéntranos</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <span className="form-label">Dirección</span>
                      <p className="subheadline">Quilpué, Valparaíso, Chile</p>
                    </div>
                    <div>
                      <span className="form-label">Horario</span>
                      <p className="paragraph">Mar - Dom: 13:00 a 22:30</p>
                    </div>
                    <div>
                      <span className="form-label">Teléfono</span>
                      <p className="paragraph">+56 9 5539 2622</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-pe-border shadow-lg">
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
            
            {/* Ilustración flotante */}
            <div className="lg:col-span-4 lg:col-start-9">
              <FadeInImage delay={0.4}>
                <div className="relative">
                  {/* Elementos decorativos orgánicos */}
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-pe-accent-yellow/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-pe-accent-blue/20 rounded-full blur-xl"></div>
                  
                  <div className="transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/assets/Elementos Gráficos/dirección.png"
                      alt="Ilustración ubicación"
                      width={400}
                      height={300}
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 350px, 280px"
                      className="w-full h-auto relative z-10"
                    />
                  </div>
                </div>
              </FadeInImage>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
