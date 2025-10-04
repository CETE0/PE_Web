import Head from "next/head";

/**
 * Página de prueba para verificar que mobile-only.css funciona
 * SIN modificar tu index.js original
 * 
 * Para probar: http://localhost:3000/test-responsive
 * 
 * Esta página carga tu index.js actual + el CSS responsive
 */

// Importamos tu página actual tal cual está
import HomePage from "./index";

export default function TestResponsive() {
  return (
    <>
      <Head>
        {/* Cargamos el CSS responsive ADEMÁS del que ya tienes */}
        <link rel="stylesheet" href="/styles/mobile-only.css" />
      </Head>
      
      {/* Tu página actual sin cambios */}
      <HomePage />
    </>
  );
}
