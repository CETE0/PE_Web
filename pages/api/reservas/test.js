/**
 * Endpoint de prueba para verificar el módulo de resOS
 */

export default async function handler(req, res) {
  console.log('🧪 Probando módulo de resOS');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Intentar importar el módulo de resOS
    console.log('📦 Intentando importar módulo de resOS...');

    let bookingsModule;
    try {
      bookingsModule = await import('@/lib/resos/bookings');
      console.log('✅ Módulo importado correctamente');
    } catch (importError) {
      console.error('❌ Error al importar módulo:', importError);
      return res.status(500).json({
        success: false,
        message: 'Error al importar módulo de resOS',
        error: importError.message,
        stack: importError.stack
      });
    }

    // Verificar que las funciones existen
    const { createReservation, validateReservationData } = bookingsModule;
    console.log('✅ Funciones encontradas:', {
      createReservation: typeof createReservation,
      validateReservationData: typeof validateReservationData
    });

    // Probar validación de datos
    console.log('🧪 Probando validación de datos...');
    const testData = {
      nombre: 'Juan Pérez',
      telefono: '+56987654321',
      fecha: '2024-12-25',
      hora: '19:30',
      personas: '4'
    };

    const validation = validateReservationData(testData);
    console.log('✅ Resultado de validación:', validation);

    return res.status(200).json({
      success: true,
      message: 'Módulo de resOS funcionando correctamente',
      timestamp: new Date().toISOString(),
      moduleStatus: {
        imported: true,
        functions: {
          createReservation: typeof createReservation === 'function',
          validateReservationData: typeof validateReservationData === 'function'
        },
        validation: validation
      }
    });

  } catch (error) {
    console.error('❌ Error en endpoint de prueba de resOS:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en módulo de resOS',
      error: error.message,
      stack: error.stack
    });
  }
}
