import "@/styles/globals.css";
import "@/styles/mobile-only.css"; // ← Adaptación responsive para móviles
import "@/styles/mobile-hero-fix.css"; // ← Correcciones específicas del hero
import "@/styles/mobile-visual-fixes.css"; // ← Correcciones visuales finales
import "@/styles/mobile-layout-optimizer.css"; // ← Optimización final de layout
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={montserrat.variable}>
      <Component {...pageProps} />
    </div>
  );
}
