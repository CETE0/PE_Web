'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * LoadingScreen - Pantalla de carga minimalista
 * Diseño simple con logo a la izquierda y taco a la derecha
 * Animaciones suaves de fade-in y fade-out
 */
export default function LoadingScreen() {
  const [isMounted, setIsMounted] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animación de entrada
    const showTimer = setTimeout(() => setShowContent(true), 200);
    const hideTimer = setTimeout(() => setShowContent(false), 2500);
    const unmountTimer = setTimeout(() => setIsMounted(false), 3200);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut"
          }}
          className="fixed inset-0 z-50 bg-white flex items-center justify-between px-8 md:px-16 lg:px-24"
          aria-hidden
        >
          {/* Logo alternativo a la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: showContent ? 1 : 0, 
              x: showContent ? 0 : -50 
            }}
            transition={{ 
              duration: 1, 
              delay: 0.3,
              ease: "easeOut"
            }}
            className="flex-shrink-0"
          >
            <Image
              src="/assets/Logo/PNG/logo alternativo.png"
              width={200}
              height={120}
              alt="Puerto Escondido Logo"
              priority
              sizes="(min-width: 1024px) 200px, (min-width: 768px) 160px, 120px"
              className="w-[120px] md:w-[160px] lg:w-[200px] h-auto"
            />
          </motion.div>

          {/* Taco 2 a la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: showContent ? 1 : 0, 
              x: showContent ? 0 : 50 
            }}
            transition={{ 
              duration: 1, 
              delay: 0.5,
              ease: "easeOut"
            }}
            className="flex-shrink-0"
          >
            <Image
              src="/assets/Elementos Gráficos/taco 2.png"
              width={180}
              height={180}
              alt="Taco ilustración"
              priority
              sizes="(min-width: 1024px) 180px, (min-width: 768px) 140px, 100px"
              className="w-[100px] md:w-[140px] lg:w-[180px] h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}