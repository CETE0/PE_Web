'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * LoadingScreen - Pantalla de carga minimalista
 * Diseño con logo centrado en móvil, logo + taco en desktop
 * Animaciones suaves de fade-in y fade-out
 */
export default function LoadingScreen() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Mostrar contenido después de un breve delay
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeInOut"
      }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-8"
      style={{backgroundColor: '#FBFFEE'}}
      aria-hidden
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        {/* Logo alternativo centrado - solo en móvil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showContent ? 1 : 0,
            scale: showContent ? 1 : 0.8
          }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeOut"
          }}
          className="flex-shrink-0"
        >
          <Image
            src="/assets/Logo/PNG/logo alternativo.png"
            width={400}
            height={240}
            alt="Puerto Escondido Logo"
            priority
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 320px, 240px"
            className="w-[240px] md:w-[320px] lg:w-[400px] h-auto"
          />
        </motion.div>

        {/* Taco 2 - A la derecha en desktop, oculto en móvil */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: showContent ? 1 : 0,
            x: showContent ? 0 : 100
          }}
          transition={{
            duration: 1,
            delay: 0.7,
            ease: "easeOut"
          }}
          className="hidden md:block flex-shrink-0"
        >
          <Image
            src="/assets/Elementos Gráficos/taco 2.png"
            width={700}
            height={700}
            alt="Taco ilustración"
            priority
            sizes="(min-width: 1024px) 700px, (min-width: 768px) 560px, 400px"
            className="w-[400px] md:w-[560px] lg:w-[700px] h-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}