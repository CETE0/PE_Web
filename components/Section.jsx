import ScrollReveal from "./ScrollReveal";

/**
 * Componente Section reutilizable - Estandariza el markup de todas las secciones
 * Mantiene la apariencia visual exacta pero mejora la mantenibilidad
 */
export default function Section({
  id,
  children,
  className = "",
  style = {},
  backgroundColor = '#FBFFEE',
  spacing = "normal", // "normal", "compact", "hero"
  containerClassName = "",
  showContainer = true,
  overflowHidden = true
}) {
  // Sistema de espaciado consistente
  const spacingClasses = {
    hero: "min-h-screen",
    normal: "section",
    compact: "py-1 lg:py-2"
  };

  const baseClasses = `relative ${spacingClasses[spacing]} ${overflowHidden ? 'overflow-hidden' : ''} ${className}`;

  const baseStyle = {
    backgroundColor,
    ...style
  };

  const containerClasses = `container ${containerClassName}`;

  const content = showContainer ? (
    <div className={containerClasses}>
      {children}
    </div>
  ) : children;

  return (
    <section id={id} className={baseClasses} style={baseStyle}>
      {content}
    </section>
  );
}

/**
 * Variante para secciones con título
 */
export function SectionWithTitle({
  id,
  title,
  subtitle,
  children,
  titleClassName = "section-title",
  subtitleClassName = "description-text-large",
  titleDelay = 0.1,
  subtitleDelay = 0.3,
  ...props
}) {
  return (
    <Section id={id} {...props}>
      {title && (
        <ScrollReveal delay={titleDelay}>
          <h2 className={titleClassName} style={{color: '#732621'}}>
            {title}
          </h2>
        </ScrollReveal>
      )}

      {subtitle && (
        <ScrollReveal delay={subtitleDelay}>
          <p className={subtitleClassName} style={{color: 'rgba(115, 38, 33, 0.8)'}}>
            {subtitle}
          </p>
        </ScrollReveal>
      )}

      {children}
    </Section>
  );
}

/**
 * Variante para secciones de grid (como menú y reservas)
 */
export function GridSection({
  id,
  children,
  gridCols = "1 lg:grid-cols-3",
  gap = "gap-8 lg:gap-16",
  itemsCenter = true,
  maxWidth = "max-w-6xl",
  ...props
}) {
  const gridClasses = `grid ${gridCols} ${gap} ${itemsCenter ? 'items-center' : ''} w-full ${maxWidth} mx-auto`;

  return (
    <Section id={id} {...props}>
      <div className={gridClasses}>
        {children}
      </div>
    </Section>
  );
}
