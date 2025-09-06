# Integración API de resOS - Puerto Escondido

## Descripción

Este módulo implementa la integración completa con la API de resOS para el sistema de reservas de Puerto Escondido. La integración mantiene intacta la estética del formulario existente mientras agrega funcionalidad completa de reservas.

## Estructura del Proyecto

```
lib/resos/
├── config.js          # Configuración de la API y autenticación
├── bookings.js        # Funciones específicas para reservas
└── README.md          # Esta documentación

pages/api/reservas/
└── index.js           # Endpoint de Next.js para reservas

hooks/
└── useReservation.js  # Hook personalizado para el formulario
```

## Configuración de la API

### Autenticación HTTP Basic Auth

La API de resOS utiliza autenticación HTTP Basic Auth. La clave API proporcionada se configura en `config.js`:

```javascript
const RESOS_API_CONFIG = {
  baseURL: 'https://api.resos.com/v1',
  apiKey: 'QroV6PLVsXGBVth2lg44YyDyhTCmTj-p7HwT7Sjfltk',
  timeout: 10000,
};
```

### Funciones Principales

#### Crear Reserva

```javascript
const { createReservation } = require('./lib/resos/bookings');

const formData = {
  nombre: 'Juan Pérez',
  telefono: '+56912345678',
  fecha: '2024-12-25',
  hora: '19:00',
  personas: '4'
};

const result = await createReservation(formData);
```

#### Validar Datos

```javascript
const { validateReservationData } = require('./lib/resos/bookings');

const validation = validateReservationData(formData);
if (!validation.isValid) {
  console.log('Errores:', validation.errors);
}
```

## Endpoint de la API

### POST /api/reservas

Endpoint principal para crear reservas desde el frontend.

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "telefono": "+56912345678",
  "fecha": "2024-12-25",
  "hora": "19:00",
  "personas": "4"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Reserva creada exitosamente.",
  "data": {
    "bookingId": "ABC123",
    "status": "pending",
    "dateTime": "2024-12-25T19:00:00.000Z",
    "people": 4,
    "guest": {
      "name": "Juan Pérez",
      "phone": "+56912345678"
    }
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Los datos proporcionados no son válidos.",
  "errors": {
    "telefono": "Formato de teléfono inválido",
    "fecha": "La fecha no puede ser anterior a hoy"
  }
}
```

## Hook de React - useReservation

Hook personalizado que maneja todo el estado del formulario de reservas.

### Uso Básico

```javascript
import { useReservation } from '@/hooks/useReservation';

function ReservationForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    updateField,
    submitReservation,
  } = useReservation();

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitReservation(); }}>
      {/* Campos del formulario */}
    </form>
  );
}
```

### Estados Disponibles

- `formData`: Estado actual de los campos del formulario
- `errors`: Errores de validación por campo
- `isSubmitting`: Boolean indicando si se está enviando la reserva
- `submitStatus`: 'success', 'error' o null
- `submitMessage`: Mensaje de feedback para el usuario

### Funciones Disponibles

- `updateField(field, value)`: Actualiza el valor de un campo
- `submitReservation()`: Envía la reserva a la API
- `resetForm()`: Reinicia el formulario

## Validación de Datos

### Campos Requeridos

- **Nombre**: Mínimo 2 caracteres
- **Teléfono**: Formato válido (acepta códigos de país)
- **Fecha**: No puede ser anterior a hoy
- **Hora**: Campo obligatorio
- **Personas**: Entre 1 y 12

### Validación en Tiempo Real

La validación se ejecuta:
- Al cambiar el foco de un campo
- Antes de enviar el formulario
- Al recibir errores del servidor

## Manejo de Errores

### Errores del Cliente

- Validación de campos vacíos
- Formatos inválidos
- Fechas pasadas
- Límites de personas excedidos

### Errores del Servidor

- Error de autenticación (401)
- Datos inválidos (422)
- Error interno del servidor (500)
- Problemas de conexión

### Mensajes de Usuario

Los errores se muestran de manera amigable:
- ✅ "Reserva creada exitosamente. Te contactaremos pronto para confirmar."
- ❌ "Los datos proporcionados no son válidos."
- ❌ "Error de conexión. Por favor, verifica tu conexión a internet."

## Estilos y UX

### Manteniendo la Estética Original

- Los estilos CSS existentes se mantienen intactos
- Solo se agregan clases para estados de error
- Diseño responsive preservado
- Animaciones y transiciones originales

### Estados Visuales

- **Campos con error**: Borde rojo (`border-red-500`)
- **Botón deshabilitado**: Opacidad reducida (`opacity-50`)
- **Mensajes de éxito**: Fondo verde claro
- **Mensajes de error**: Fondo rojo claro

## Testing

### Prueba Manual

1. **Formulario vacío**: Intentar enviar sin datos
2. **Datos inválidos**: Teléfono incorrecto, fecha pasada
3. **Datos válidos**: Completar y enviar correctamente
4. **Conexión**: Probar con conexión lenta/interrumpida

### Verificación en resOS

Después de crear una reserva exitosa:
1. Verificar en el panel de resOS que aparezca la nueva reserva
2. Confirmar que los datos se guardaron correctamente
3. Verificar el estado inicial ('pending')

## Configuración de Producción

### Variables de Entorno

Para entornos de producción, mover la API key a variables de entorno:

```javascript
// config.js
const RESOS_API_CONFIG = {
  baseURL: 'https://api.resos.com/v1',
  apiKey: process.env.RESOS_API_KEY,
  timeout: 10000,
};
```

### Archivo .env.local

```env
RESOS_API_KEY=QroV6PLVsXGBVth2lg44YyDyhTCmTj-p7HwT7Sjfltk
```

## Consideraciones de Seguridad

### API Key

- ✅ Nunca expuesta en el frontend
- ✅ Solo usada en el servidor (API routes de Next.js)
- ✅ Transmitida de forma segura via HTTPS

### Validación

- ✅ Validación tanto en cliente como servidor
- ✅ Sanitización de datos de entrada
- ✅ Límites en campos numéricos

## Próximas Funcionalidades

### Posibles Extensiones

1. **Lista de reservas**: Mostrar reservas existentes
2. **Cancelación**: Permitir cancelar reservas
3. **Modificación**: Editar reservas existentes
4. **Notificaciones**: Email/SMS automáticas
5. **Calendario**: Vista de disponibilidad

### Webhooks

resOS soporta webhooks para eventos como:
- Nueva reserva creada
- Reserva confirmada/cancelada
- Cambios en reservas existentes

## Soporte

Para problemas con la API de resOS:
- Documentación: https://api.resos.com/v1/
- Email: hi@resos.com

Para problemas con esta implementación:
- Verificar logs del servidor
- Revisar configuración de la API key
- Probar conectividad con la API de resOS
