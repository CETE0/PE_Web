import "@/styles/globals.css";
import "@/styles/mobile-only.css"; // ← Adaptación responsive para móviles
import "@/styles/mobile-hero-fix.css"; // ← Correcciones específicas del hero
import "@/styles/mobile-visual-fixes.css"; // ← Correcciones visuales finales
import "@/styles/mobile-layout-optimizer.css"; // ← Optimización final de layout

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
