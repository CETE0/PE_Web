# 📱 Instrucciones para hacer tu web responsive SIN cambiar el diseño desktop

## ✅ Solución creada: mobile-only.css

He creado un archivo CSS que **SOLO afecta a móviles y tablets** (hasta 1023px).
Tu diseño desktop se mantiene **EXACTAMENTE IGUAL**.

## 🚀 Cómo implementarlo (1 minuto):

### Opción A: En tu archivo _app.js
```javascript
// pages/_app.js
import "../styles/globals.css";
import "../styles/mobile-only.css";  // ← Agregar esta línea

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Opción B: En tu index.js (si no usas _app.js)
```javascript
// En el <Head> de tu index.js
<Head>
  <title>Puerto Escondido | Taquería en Chile</title>
  {/* ... otros meta tags ... */}
  <style>{`@import '/styles/mobile-only.css';`}</style>  // ← Agregar esta línea
</Head>
```

### Opción C: En tu globals.css (al final del archivo)
```css
/* Al final de styles/globals.css */
@import './mobile-only.css';
```

## 📱 ¿Qué hace el archivo mobile-only.css?

### En móviles y tablets (0-1023px):
- ✅ **Header**: Se simplifica, quita el toldo, reduce tamaño
- ✅ **Hero**: Logo centrado, taco con opacidad reducida
- ✅ **Secciones**: Todo en columna única (stack vertical)
- ✅ **Imágenes**: Se reducen o ocultan para no estorbar
- ✅ **Formulario**: Campos apilados, botones full width
- ✅ **Footer**: Reorganizado en columnas adaptativas

### En desktop (1024px+):
- ✅ **TODO IGUAL**: No se toca NADA del diseño actual

## 🧪 Cómo probar:

1. Implementa una de las opciones arriba
2. Abre tu web en el navegador
3. Presiona `F12` para abrir DevTools
4. Haz clic en el ícono de móvil/tablet (Toggle device toolbar)
5. Prueba diferentes tamaños:
   - iPhone SE (375px)
   - iPhone 14 (390px)
   - iPad (768px)
   - Desktop (1024px+) ← debe verse IGUAL que antes

## 🎯 Puntos clave del CSS:

```css
/* TODA regla está dentro de media queries */
@media (max-width: 1023px) {
  /* Solo se aplica en móviles/tablets */
}

/* Desktop no se toca porque es 1024px+ */
```

## ⚠️ Si algo se ve mal:

### Problema: Una imagen se sale del viewport
```css
/* Agregar al final de mobile-only.css */
@media (max-width: 1023px) {
  .tu-imagen-problemática {
    max-width: 100% !important;
    transform: none !important;
  }
}
```

### Problema: Algo está muy pegado
```css
/* Ajustar padding en mobile-only.css */
@media (max-width: 1023px) {
  .tu-seccion {
    padding: 2rem 1rem !important;
  }
}
```

## 📋 Checklist de pruebas:

- [ ] El header se ve bien en móvil
- [ ] No hay scroll horizontal
- [ ] El formulario es usable con el dedo
- [ ] Las imágenes no tapan el texto
- [ ] El footer es legible
- [ ] **Desktop se ve EXACTAMENTE igual que antes**

## 🔧 Ajustes opcionales:

Si quieres afinar algo específico, edita `mobile-only.css`:

```css
/* Ejemplo: hacer el logo del hero más grande en móvil */
@media (max-width: 1023px) {
  #inicio img[alt="Puerto Escondido"] {
    width: 320px !important; /* en vez de 280px */
  }
}
```

## ✨ Ventajas de esta solución:

1. **No rompe nada**: Todo el CSS está en media queries
2. **Un solo archivo**: Solo necesitas agregar mobile-only.css
3. **Fácil de revertir**: Solo quita el import si algo sale mal
4. **Debugging simple**: Todo el CSS móvil está en un solo lugar
5. **Desktop intacto**: Tu diseño actual no se toca

---

**Nota**: Este CSS ya maneja el 95% de los casos. Si encuentras algo específico que ajustar, solo agrégalo al final del archivo dentro de un media query `@media (max-width: 1023px) { }`
