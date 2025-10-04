/**
 * SectionLayout Optimizado - Componente para layouts de sección consistentes
 * Mantiene la estructura actual pero mejora la mantenibilidad y performance
 */
import ScrollReveal from './ScrollReveal';

export default function SectionLayout({
  id,
  className = "",
  children,
  backgroundColor = "#FBFFEE",
  paddingTop = "var(--section-padding-y-mobile)",
  paddingBottom = "var(--section-padding-y-mobile)",
  containerClass = "container",
  maxWidth = "max-w-6xl",
  gap = "gap-8 lg:gap-16",
  itemsCenter = true,
  overflow = "overflow-hidden"
}) {
  const sectionStyle = {
    backgroundColor,
    paddingTop,
    paddingBottom
  };

  return (
    <section id={id} className={`section relative ${overflow} ${className}`} style={sectionStyle}>
      <div className={containerClass}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${gap} items-${itemsCenter ? 'center' : 'start'} w-full ${maxWidth} mx-auto`}>
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * Layout específico para secciones con texto + imagen grande
 */
export function TextImageSection({
  title,
  titleDelay = 0.2,
  titleClass = "section-title mb-8",
  titleColor = "#732621",
  children,
  image,
  imagePosition = "right", // "left" | "right"
  imageDelay = 0.3,
  reverseOnMobile = true,
  ...sectionProps
}) {
  const titleElement = title && (
    <div className={imagePosition === "left" ? "lg:col-span-1" : "order-2 lg:order-1 lg:col-span-1"}>
      <ScrollReveal delay={titleDelay}>
        {typeof title === 'string' ? (
          <h2 className={titleClass} style={{ color: titleColor }}>
            {title}
          </h2>
        ) : title}
      </ScrollReveal>
    </div>
  );

  const contentElement = children && (
    <div className={imagePosition === "left" ? "lg:col-span-1" : "order-1 lg:order-2 lg:col-span-1"}>
      <ScrollReveal delay={titleDelay + 0.2}>
        {children}
      </ScrollReveal>
    </div>
  );

  const imageElement = image && (
    <div className={`flex justify-center ${imagePosition === "left" ? "lg:justify-start" : "lg:justify-end"} ${reverseOnMobile ? "order-1 lg:order-2" : ""} lg:col-span-1`}>
      <ScrollReveal delay={imageDelay}>
        {image}
      </ScrollReveal>
    </div>
  );

  return (
    <SectionLayout {...sectionProps}>
      {imagePosition === "left" ? (
        <>
          {imageElement}
          <div>
            {titleElement}
            {contentElement}
          </div>
        </>
      ) : (
        <>
          <div>
            {titleElement}
            {contentElement}
          </div>
          {imageElement}
        </>
      )}
    </SectionLayout>
  );
}

/**
 * Layout para secciones con 3 columnas (texto central + 2 imágenes laterales)
 */
export function ThreeColumnSection({
  leftImage,
  centerContent,
  rightImage,
  leftDelay = 0.2,
  centerDelay = 0.3,
  rightDelay = 0.4,
  gap = "gap-8 lg:gap-12",
  minHeight = "min-h-[400px] lg:min-h-[500px]",
  ...sectionProps
}) {
  return (
    <SectionLayout
      {...sectionProps}
      gap={gap}
      containerClass="container flex items-center"
      maxWidth="max-w-none"
    >
      <div className={`flex items-center justify-center ${minHeight}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center w-full max-w-6xl mx-auto">

          {/* Imagen izquierda */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <ScrollReveal delay={leftDelay}>
              {leftImage}
            </ScrollReveal>
          </div>

          {/* Contenido central */}
          <div className="text-center order-1 lg:order-2 px-2">
            <ScrollReveal delay={centerDelay}>
              {centerContent}
            </ScrollReveal>
          </div>

          {/* Imagen derecha */}
          <div className="flex justify-center lg:justify-start order-3">
            <ScrollReveal delay={rightDelay}>
              {rightImage}
            </ScrollReveal>
          </div>

        </div>
      </div>
    </SectionLayout>
  );
}
