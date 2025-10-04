import Image from "next/image";
import { FadeInImage } from "./ScrollReveal";

/**
 * ImageWrapperResponsive - Versión mejorada con soporte responsive completo
 * Mantiene la estética artesanal pero se adapta mejor a diferentes pantallas
 */
export default function ImageWrapperResponsive({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  
  // Configuración responsive por breakpoint
  responsive = {
    mobile: {
      scale: 1,
      translateX: 0,
      translateY: 0,
      rotation: 0,
      hide: false,
      opacity: 1
    },
    tablet: {
      scale: 1.2,
      translateX: 20,
      translateY: 0,
      rotation: 0,
      hide: false,
      opacity: 1
    },
    desktop: {
      scale: 1.5,
      translateX: 50,
      translateY: 0,
      rotation: 0,
      hide: false,
      opacity: 1
    }
  },
  
  // Animaciones
  useFadeIn = true,
  animationDelay = 0.2,
  
  // Hover effects (solo desktop)
  hoverScale = null,
  hoverRotate = null,
  
  // Contenedor
  containerClassName = "",
  position = "center", // "left", "center", "right"
  
  // Optimizaciones móviles
  lazyBoundary = "200px",
  objectFit = "contain", // "contain", "cover", "fill"
  
  ...props
}) {
  
  // Clases de posicionamiento del contenedor
  const positionClasses = {
    left: "flex justify-start",
    center: "flex justify-center",
    right: "flex justify-end"
  };

  // Generar estilos CSS con variables para responsive
  const imageStyles = {
    '--scale-mobile': responsive.mobile.scale,
    '--scale-tablet': responsive.tablet.scale,
    '--scale-desktop': responsive.desktop.scale,
    '--translate-x-mobile': `${responsive.mobile.translateX}px`,
    '--translate-x-tablet': `${responsive.tablet.translateX}px`,
    '--translate-x-desktop': `${responsive.desktop.translateX}px`,
    '--translate-y-mobile': `${responsive.mobile.translateY}px`,
    '--translate-y-tablet': `${responsive.tablet.translateY}px`,
    '--translate-y-desktop': `${responsive.desktop.translateY}px`,
    '--rotate-mobile': `${responsive.mobile.rotation}deg`,
    '--rotate-tablet': `${responsive.tablet.rotation}deg`,
    '--rotate-desktop': `${responsive.desktop.rotation}deg`,
    '--opacity-mobile': responsive.mobile.opacity,
    '--opacity-tablet': responsive.tablet.opacity,
    '--opacity-desktop': responsive.desktop.opacity,
  };

  // Clases responsive para la imagen
  const responsiveImageClasses = `
    ${responsive.mobile.hide ? 'hidden sm:block' : ''}
    ${responsive.tablet.hide ? 'md:hidden lg:block' : ''}
    transform-gpu
    transition-transform duration-300
    
    /* Mobile */
    scale-[var(--scale-mobile)]
    translate-x-[var(--translate-x-mobile)]
    translate-y-[var(--translate-y-mobile)]
    rotate-[var(--rotate-mobile)]
    opacity-[var(--opacity-mobile)]
    
    /* Tablet */
    md:scale-[var(--scale-tablet)]
    md:translate-x-[var(--translate-x-tablet)]
    md:translate-y-[var(--translate-y-tablet)]
    md:rotate-[var(--rotate-tablet)]
    md:opacity-[var(--opacity-tablet)]
    
    /* Desktop */
    lg:scale-[var(--scale-desktop)]
    lg:translate-x-[var(--translate-x-desktop)]
    lg:translate-y-[var(--translate-y-desktop)]
    lg:rotate-[var(--rotate-desktop)]
    lg:opacity-[var(--opacity-desktop)]
    
    ${hoverScale ? `lg:hover:scale-[${hoverScale}]` : ''}
    ${hoverRotate ? `lg:hover:rotate-[${hoverRotate}deg]` : ''}
  `;

  const imageElement = (
    <div className="relative w-full max-w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className={`w-full h-auto ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${responsiveImageClasses} ${className}`}
        style={imageStyles}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
        {...props}
      />
    </div>
  );

  const animatedImage = useFadeIn ? (
    <FadeInImage delay={animationDelay}>
      {imageElement}
    </FadeInImage>
  ) : imageElement;

  return (
    <div className={`${positionClasses[position]} ${containerClassName}`}>
      {animatedImage}
    </div>
  );
}

/**
 * Componente especializado para imágenes grandes del hero
 */
export function HeroImageResponsive({
  src,
  alt,
  ...props
}) {
  return (
    <ImageWrapperResponsive
      src={src}
      alt={alt}
      responsive={{
        mobile: {
          scale: 0.8,
          translateX: 0,
          translateY: 0,
          opacity: 0.7
        },
        tablet: {
          scale: 1,
          translateX: 30,
          translateY: 0,
          opacity: 0.9
        },
        desktop: {
          scale: 1.2,
          translateX: 60,
          translateY: 0,
          opacity: 1
        }
      }}
      priority={true}
      {...props}
    />
  );
}

/**
 * Componente para imágenes decorativas (artesano, salsa, etc)
 */
export function DecorativeImageResponsive({
  src,
  alt,
  initialRotation = 0,
  hoverRotation = 0,
  hideOnMobile = false,
  ...props
}) {
  return (
    <ImageWrapperResponsive
      src={src}
      alt={alt}
      responsive={{
        mobile: {
          scale: 0.7,
          translateX: 0,
          translateY: 0,
          rotation: initialRotation / 2,
          hide: hideOnMobile,
          opacity: hideOnMobile ? 0 : 0.8
        },
        tablet: {
          scale: 0.85,
          translateX: 10,
          translateY: 0,
          rotation: initialRotation * 0.75,
          hide: false,
          opacity: 0.9
        },
        desktop: {
          scale: 1,
          translateX: 20,
          translateY: 0,
          rotation: initialRotation,
          hide: false,
          opacity: 1
        }
      }}
      hoverRotate={hoverRotation}
      {...props}
    />
  );
}

/**
 * Componente para las imágenes principales de sección (taco, vasos)
 */
export function SectionImageResponsive({
  src,
  alt,
  type = "taco", // "taco" | "vasos"
  ...props
}) {
  const configs = {
    taco: {
      mobile: { scale: 0.6, translateX: 0, translateY: 0, opacity: 0.8 },
      tablet: { scale: 1.2, translateX: 40, translateY: -20, opacity: 1 },
      desktop: { scale: 1.8, translateX: 85, translateY: -50, opacity: 1 }
    },
    vasos: {
      mobile: { scale: 0.7, translateX: 0, translateY: 0, opacity: 0.9 },
      tablet: { scale: 1.1, translateX: 20, translateY: 0, opacity: 1 },
      desktop: { scale: 1.4, translateX: 30, translateY: 0, opacity: 1 }
    }
  };

  return (
    <ImageWrapperResponsive
      src={src}
      alt={alt}
      responsive={configs[type]}
      objectFit="contain"
      {...props}
    />
  );
}
