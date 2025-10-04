import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="theme-color" content="#FBFFEE" />
        <meta name="color-scheme" content="light" />

        {/* Favicon moderno (SVG) - Escalable y nítido en todos los dispositivos */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Favicon tradicional (ICO) para compatibilidad */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Favicon para diferentes dispositivos Apple */}
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-title" content="Puerto Escondido" />

        {/* Meta tags para PWA */}
        <meta name="application-name" content="Puerto Escondido" />
        <meta name="theme-color" content="#732621" />

        {/* Prevenir zoom en móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
