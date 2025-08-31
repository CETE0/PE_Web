import Image from "next/image";
import { FadeInImage } from "./ScrollReveal";

/**
 * Componente ImageWrapper - Simplifica el manejo de imágenes con posicionamiento
 * Mantiene la apariencia visual exacta pero reduce la complejidad del código
 */
export default function ImageWrapper({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  // Opciones de posicionamiento simplificadas
  position = "center", // "left", "center", "right", "top-left", "top-right", etc.
  scale = 1,
  rotation = 0,
  translateX = 0,
  translateY = 0,
  // Animaciones
  useFadeIn = true,
  animationDelay = 0.2,
  // Hover effects
  hoverRotate = 0,
  hoverScale = 1,
  // Contenedor
  containerClassName = "",
  showContainer = true,
  ...props
}) {
  // Sistema de posicionamiento simplificado
  const positionClasses = {
    center: "flex justify-center",
    left: "flex justify-start",
    right: "flex justify-end",
    "top-left": "absolute top-0 left-0",
    "top-right": "absolute top-0 right-0",
    "bottom-left": "absolute bottom-0 left-0",
    "bottom-right": "absolute bottom-0 right-0",
    "center-left": "absolute top-1/2 left-0 transform -translate-y-1/2",
    "center-right": "absolute top-1/2 right-0 transform -translate-y-1/2"
  };

  // Transformaciones combinadas
  const transformValue = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`;
  const hoverTransformValue = hoverRotate !== 0 || hoverScale !== 1
    ? `translate(${translateX}px, ${translateY}px) scale(${hoverScale}) rotate(${hoverRotate}deg)`
    : transformValue;

  const imageStyle = {
    transform: transformValue,
    transition: hoverTransformValue !== transformValue ? "transform 0.5s ease" : "none"
  };

  const imageElement = (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`w-full h-auto drop-shadow-lg ${hoverTransformValue !== transformValue ? 'hover:scale-105' : ''}`}
        style={imageStyle}
        priority={priority}
        {...props}
      />
    </div>
  );

  const animatedImage = useFadeIn ? (
    <FadeInImage delay={animationDelay}>
      {imageElement}
    </FadeInImage>
  ) : imageElement;

  if (!showContainer) {
    return animatedImage;
  }

  return (
    <div className={`${positionClasses[position]} ${containerClassName}`}>
      {animatedImage}
    </div>
  );
}

/**
 * Componente especializado para imágenes grandes (como taco y vasos)
 */
export function LargeImage({
  src,
  alt,
  width,
  height,
  sizes,
  // Posicionamiento específico para imágenes grandes
  offsetX = 0,
  offsetY = 0,
  scale = 1.2,
  // Container específico
  containerOffset = "0",
  ...props
}) {
  return (
    <div
      className="flex justify-center lg:justify-end"
      style={{
        marginRight: containerOffset,
        transform: `translateX(${offsetX})`
      }}
    >
      <FadeInImage delay={0.3}>
        <div className="relative max-w-full overflow-hidden">
          <div className="figure-wrap">
            <ImageWrapper
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              scale={scale}
              translateX={offsetX}
              translateY={offsetY}
              useFadeIn={false}
              showContainer={false}
              className="img-taco"
              {...props}
            />
          </div>
        </div>
      </FadeInImage>
    </div>
  );
}

/**
 * Componente para imágenes decorativas pequeñas (artesano, salsa, etc.)
 */
export function DecorativeImage({
  src,
  alt,
  width,
  height,
  sizes,
  position = "center",
  // Animaciones específicas
  initialRotation = 0,
  hoverRotation = 0,
  ...props
}) {
  return (
    <ImageWrapper
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      position={position}
      rotation={initialRotation}
      hoverRotate={hoverRotation}
      hoverScale={1}
      transition="transform 0.5s ease"
      {...props}
    />
  );
}
