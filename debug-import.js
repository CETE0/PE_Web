/**
 * Script para depurar la importación del módulo de resOS
 * Ejecutar con: node debug-import.js
 */

// Simular el entorno de Next.js
process.env.NODE_ENV = 'development';

async function testImport() {
  console.log('🔍 Probando importación del módulo de resOS...\n');

  try {
    // Intentar importar el módulo
    console.log('📦 Importando config.js...');
    const configModule = await import('./lib/resos/config.js');
    console.log('✅ config.js importado correctamente');
    console.log('Funciones disponibles:', Object.keys(configModule));

    console.log('\n📦 Importando bookings.js...');
    const bookingsModule = await import('./lib/resos/bookings.js');
    console.log('✅ bookings.js importado correctamente');
    console.log('Funciones disponibles:', Object.keys(bookingsModule));

    // Probar una función
    console.log('\n🧪 Probando validación de datos...');
    const { validateReservationData } = bookingsModule;
    const testData = {
      nombre: 'Juan Pérez',
      telefono: '+56987654321',
      fecha: '2024-12-25',
      hora: '19:30',
      personas: '4'
    };

    const validation = validateReservationData(testData);
    console.log('✅ Validación exitosa:', validation);

    console.log('\n🎉 Todas las importaciones funcionan correctamente!');
    return true;

  } catch (error) {
    console.error('\n❌ Error en la importación:', error.message);
    console.error('Stack trace:', error.stack);

    if (error.message.includes('Cannot find module')) {
      console.log('\n🔍 Posibles causas:');
      console.log('1. El archivo no existe en la ruta especificada');
      console.log('2. Problema con la sintaxis ES6');
      console.log('3. Error en la configuración de jsconfig.json');
    }

    if (error.message.includes('Unexpected token')) {
      console.log('\n🔍 Posibles causas:');
      console.log('1. Sintaxis incorrecta en el módulo');
      console.log('2. Error de parsing en el archivo');
    }

    return false;
  }
}

// Ejecutar prueba
testImport().then(success => {
  if (success) {
    console.log('\n✅ El problema NO está en la importación del módulo');
  } else {
    console.log('\n❌ El problema SÍ está en la importación del módulo');
  }
});
