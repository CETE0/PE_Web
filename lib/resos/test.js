/**
 * Script de prueba para la integración con resOS API
 * Ejecutar con: node lib/resos/test.js
 */

const { createReservation, validateReservationData } = require('./bookings');

// Datos de prueba para la reserva
const testData = {
  nombre: 'Juan Pérez',
  telefono: '+56987654321',
  fecha: '2024-12-25',
  hora: '19:30',
  personas: '4'
};

async function testValidation() {
  console.log('🧪 Probando validación de datos...\n');

  // Test 1: Datos válidos
  const validResult = validateReservationData(testData);
  console.log('✅ Datos válidos:', validResult.isValid);
  console.log('Errores:', validResult.errors.length === 0 ? 'Ninguno' : validResult.errors);

  // Test 2: Datos inválidos
  const invalidData = {
    nombre: '', // Inválido
    telefono: '123', // Inválido
    fecha: '2020-01-01', // Fecha pasada
    hora: '', // Vacío
    personas: '15' // Fuera de rango
  };

  const invalidResult = validateReservationData(invalidData);
  console.log('\n❌ Datos inválidos:', !invalidResult.isValid);
  console.log('Errores encontrados:', invalidResult.errors);
}

async function testAPIConnection() {
  console.log('\n🔌 Probando conexión con resOS API...\n');

  try {
    // Nota: Esta es una prueba real que creará una reserva en resOS
    // Comenta esta línea si no quieres crear una reserva de prueba
    console.log('⚠️  ADVERTENCIA: Esta prueba creará una reserva real en resOS');
    console.log('💡 Si quieres solo probar la validación, ejecuta solo testValidation()');

    const result = await createReservation(testData);

    console.log('✅ Reserva creada exitosamente:');
    console.log('ID:', result._id);
    console.log('Estado:', result.status);
    console.log('Fecha:', result.dateTime);
    console.log('Personas:', result.people);
    console.log('Invitado:', result.guest.name);

  } catch (error) {
    console.log('❌ Error al crear reserva:');
    console.log(error.message);

    if (error.message.includes('HTTP 401')) {
      console.log('\n🔑 Posible problema con la API key');
      console.log('Verifica que la clave en config.js sea correcta');
    }

    if (error.message.includes('HTTP 422')) {
      console.log('\n📝 Datos rechazados por resOS');
      console.log('Verifica el formato de los datos enviados');
    }
  }
}

async function runTests() {
  console.log('🚀 Iniciando pruebas de integración resOS\n');

  // Ejecutar pruebas de validación
  await testValidation();

  // Preguntar si quiere probar la API real
  console.log('\n❓ ¿Quieres probar la conexión real con resOS API?');
  console.log('Esto creará una reserva de prueba en tu cuenta de resOS.');
  console.log('Responde "sí" o "no" en el código si quieres modificar esta opción.\n');

  // Por defecto, no ejecutar la prueba real para evitar crear reservas accidentales
  const testRealAPI = false; // Cambia a true para probar la API real

  if (testRealAPI) {
    await testAPIConnection();
  } else {
    console.log('⏭️  Saltando prueba de API real');
    console.log('💡 Para probar la API real, cambia testRealAPI a true en el código');
  }

  console.log('\n✨ Pruebas completadas');
  console.log('📖 Revisa el archivo README.md para más información');
}

// Ejecutar pruebas
runTests().catch(console.error);
