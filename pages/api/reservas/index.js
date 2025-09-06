/**
 * API Endpoint para manejar reservas con resOS
 * POST /api/reservas - Crear nueva reserva
 */

import { createReservation } from '@/lib/resos/bookings';

export default async function handler(req, res) {
  // Headers CORS para evitar problemas
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log detallado de la petición
  console.log('🔍 Nueva petición a /api/reservas:');
  console.log('Método:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('URL:', req.url);

  // Solo permitir método POST
  if (req.method !== 'POST') {
    console.log('❌ Método no permitido:', req.method);
    return res.status(405).json({
      success: false,
      message: 'Método no permitido. Use POST.',
      method: req.method,
      allowed: 'POST',
      tip: 'Este endpoint solo acepta peticiones POST desde el formulario'
    });
  }

  try {
    console.log('📨 Nueva petición de reserva recibida');
    console.log('Body recibido:', req.body);

    // Obtener datos del formulario
    const { nombre, telefono, fecha, hora, personas } = req.body;

    // Log de datos recibidos
    console.log('Datos parseados:', { nombre, telefono, fecha, hora, personas });

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !telefono || !fecha || !hora || !personas) {
      console.log('❌ Validación fallida - campos faltantes');
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios.',
        errors: {
          nombre: !nombre ? 'El nombre es obligatorio' : null,
          telefono: !telefono ? 'El teléfono es obligatorio' : null,
          fecha: !fecha ? 'La fecha es obligatoria' : null,
          hora: !hora ? 'La hora es obligatoria' : null,
          personas: !personas ? 'El número de personas es obligatorio' : null,
        },
      });
    }

    // Validación adicional de formato
    if (!/^\+?[\d\s\-\(\)]{8,}$/.test(telefono)) {
      console.log('❌ Validación fallida - teléfono inválido');
      return res.status(400).json({
        success: false,
        message: 'El formato del teléfono es inválido.',
        errors: {
          telefono: 'Formato de teléfono inválido',
        },
      });
    }

    console.log('✅ Datos validados correctamente');

    // Preparar datos para resOS
    const formData = { nombre, telefono, fecha, hora, personas };
    console.log('📦 Datos a formatear para resOS:', formData);

    // Importar y usar el formateador de datos
    const { formatReservationData } = await import('@/lib/resos/bookings');
    const formattedData = formatReservationData(formData);
    console.log('🔄 Datos formateados para resOS:', JSON.stringify(formattedData, null, 2));

    // Crear reserva usando el módulo de resOS
    console.log('🚀 Enviando reserva a resOS...');
    const reservationResult = await createReservation(formData);

    console.log('✅ Reserva creada en resOS:', JSON.stringify(reservationResult, null, 2));

    // Responder con éxito
    console.log('✅ Reserva creada exitosamente en resOS');
    console.log('📧 Email final registrado:', reservationResult.guest.email);

    return res.status(201).json({
      success: true,
      message: 'Reserva creada exitosamente.',
      data: {
        bookingId: reservationResult._id,
        status: reservationResult.status,
        dateTime: reservationResult.dateTime,
        people: reservationResult.people,
        guest: {
          name: reservationResult.guest.name,
          phone: reservationResult.guest.phone,
          email: reservationResult.guest.email, // Incluir email en respuesta
        },
      },
    });

  } catch (error) {
    console.error('❌ Error en API de reservas:', error);
    console.error('Stack trace:', error.stack);

    // Determinar el tipo de error para dar una respuesta apropiada
    if (error.message.includes('Datos inválidos')) {
      console.log('📝 Error de validación de datos');
      return res.status(400).json({
        success: false,
        message: 'Los datos proporcionados no son válidos.',
        errors: error.message.replace('Datos inválidos: ', '').split(', '),
      });
    }

    if (error.message.includes('HTTP 401')) {
      console.log('🔐 Error de autenticación con resOS');
      return res.status(500).json({
        success: false,
        message: 'Error de autenticación con el servicio de reservas.',
      });
    }

    if (error.message.includes('HTTP 422')) {
      console.log('📋 Datos rechazados por resOS');
      return res.status(400).json({
        success: false,
        message: 'Los datos proporcionados no cumplen con los requisitos.',
      });
    }

    if (error.message.includes('fetch')) {
      console.log('🌐 Error de conexión de red');
      return res.status(503).json({
        success: false,
        message: 'Error de conexión con el servicio de reservas. Por favor, inténtelo nuevamente.',
      });
    }

    // Error genérico
    console.log('💥 Error desconocido');
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error al procesar la reserva. Por favor, inténtelo nuevamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
