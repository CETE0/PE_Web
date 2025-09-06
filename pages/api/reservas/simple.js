/**
 * Endpoint simplificado de reservas sin dependencias externas
 * Para probar que el problema no está en Next.js
 */

export default async function handler(req, res) {
  console.log('🧪 Endpoint simple de reservas llamado');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método no permitido. Use POST.',
    });
  }

  try {
    console.log('📨 Body recibido:', req.body);

    // Simular procesamiento de reserva sin llamar a resOS
    const { nombre, telefono, fecha, hora, personas } = req.body;

    // Validación básica
    if (!nombre || !telefono || !fecha || !hora || !personas) {
      return res.status(400).json({
        success: false,
        message: 'Campos obligatorios faltantes',
        received: { nombre, telefono, fecha, hora, personas }
      });
    }

    // Simular creación exitosa
    console.log('✅ Procesamiento simulado exitoso');

    return res.status(200).json({
      success: true,
      message: 'Reserva procesada (simulada)',
      data: {
        bookingId: `sim-${Date.now()}`,
        status: 'confirmed',
        dateTime: `${fecha}T${hora}:00.000Z`,
        people: parseInt(personas),
        guest: {
          name: nombre,
          phone: telefono,
        },
      },
      simulation: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en endpoint simple:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno',
      error: error.message,
      simulation: true
    });
  }
}
