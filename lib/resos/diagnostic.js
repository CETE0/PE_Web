/**
 * Script de diagnóstico para la API de resOS
 * Ejecutar con: node lib/resos/diagnostic.js
 */

const https = require('https');
const { RESOS_API_CONFIG, getAuthHeader } = require('./config');

function testBasicConnection() {
  return new Promise((resolve, reject) => {
    const url = new URL(RESOS_API_CONFIG.baseURL);
    const authHeader = getAuthHeader();

    console.log('🔍 Probando conexión básica...\n');
    console.log('URL base:', RESOS_API_CONFIG.baseURL);
    console.log('API Key presente:', !!RESOS_API_CONFIG.apiKey);
    console.log('API Key longitud:', RESOS_API_CONFIG.apiKey.length);
    console.log('Header de auth generado:', authHeader.substring(0, 50) + '...');

    const options = {
      hostname: url.hostname,
      path: '/v1/bookings',
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'PuertoEscondido-Diagnostic/1.0'
      }
    };

    const req = https.request(options, (res) => {
      console.log('\n📡 Respuesta del servidor:');
      console.log('Status:', res.statusCode);
      console.log('Headers:', JSON.stringify(res.headers, null, 2));

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('\n📄 Contenido de la respuesta:');
        if (data.length > 500) {
          console.log(data.substring(0, 500) + '...\n[contenido truncado]');
        } else {
          console.log(data);
        }

        try {
          const jsonData = JSON.parse(data);
          console.log('\n✅ La respuesta es JSON válido');
          resolve({ status: res.statusCode, data: jsonData, raw: data });
        } catch (error) {
          console.log('\n❌ La respuesta NO es JSON válido');
          console.log('Error de parsing:', error.message);

          // Verificar si es HTML
          if (data.includes('<!DOCTYPE') || data.includes('<html')) {
            console.log('🚨 La respuesta parece ser HTML (probablemente página de error)');
          }

          resolve({
            status: res.statusCode,
            data: null,
            raw: data,
            isJson: false,
            error: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('\n❌ Error de conexión:', error.message);
      reject(error);
    });

    req.setTimeout(10000, () => {
      console.log('\n⏰ Timeout después de 10 segundos');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

function testCreateReservation() {
  return new Promise((resolve, reject) => {
    const url = new URL(RESOS_API_CONFIG.baseURL);
    const authHeader = getAuthHeader();

    // Datos de prueba que coinciden con el formato esperado por resOS
    const testData = {
      guest: {
        name: 'Juan Pérez',
        phone: '+56987654321',
        email: 'juan.perez@example.com',
        notificationEmail: true,
        notificationSms: true
      },
      dateTime: new Date('2024-12-25T19:30:00').toISOString(),
      people: 4,
      source: 'website'
    };

    const postData = JSON.stringify(testData);

    console.log('\n📝 Probando creación de reserva...\n');
    console.log('Datos a enviar:', JSON.stringify(testData, null, 2));

    const options = {
      hostname: url.hostname,
      path: '/v1/bookings',
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'PuertoEscondido-Diagnostic/1.0',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      console.log('\n📡 Respuesta de creación de reserva:');
      console.log('Status:', res.statusCode);
      console.log('Headers:', JSON.stringify(res.headers, null, 2));

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('\n📄 Contenido de la respuesta:');
        if (data.length > 500) {
          console.log(data.substring(0, 500) + '...\n[contenido truncado]');
        } else {
          console.log(data);
        }

        try {
          const jsonData = JSON.parse(data);
          console.log('\n✅ La respuesta es JSON válido');

          if (res.statusCode === 201 || res.statusCode === 200) {
            console.log('✅ Reserva creada exitosamente');
          } else {
            console.log('❌ Reserva rechazada por resOS');
            if (jsonData.message) {
              console.log('Mensaje de error:', jsonData.message);
            }
          }

          resolve({ status: res.statusCode, data: jsonData, raw: data });
        } catch (error) {
          console.log('\n❌ La respuesta NO es JSON válido');
          console.log('Error de parsing:', error.message);

          // Verificar si es HTML
          if (data.includes('<!DOCTYPE') || data.includes('<html')) {
            console.log('🚨 La respuesta parece ser HTML (probablemente página de error)');
          }

          resolve({
            status: res.statusCode,
            data: null,
            raw: data,
            isJson: false,
            error: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('\n❌ Error de conexión:', error.message);
      reject(error);
    });

    req.setTimeout(15000, () => {
      console.log('\n⏰ Timeout después de 15 segundos');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.write(postData);
    req.end();
  });
}

async function runDiagnostic() {
  console.log('🔧 DIAGNÓSTICO DE API RESOS\n');
  console.log('=' .repeat(50));

  try {
    // Primero probar conexión básica
    console.log('🔍 PASO 1: Probando conexión básica...');
    const basicResult = await testBasicConnection();

    if (basicResult.status !== 200) {
      console.log('\n❌ La conexión básica falló. Abortando pruebas avanzadas.');
      return;
    }

    console.log('\n✅ Conexión básica exitosa. Probando creación de reserva...');

    // Luego probar creación de reserva
    console.log('\n🔍 PASO 2: Probando creación de reserva...');
    const createResult = await testCreateReservation();

    console.log('\n📊 RESULTADO COMPLETO DEL DIAGNÓSTICO:');
    console.log('=' .repeat(40));

    if (createResult.status === 201 || createResult.status === 200) {
      console.log('✅ TODO FUNCIONANDO - API de resOS completamente operativa');
    } else if (createResult.status === 422) {
      console.log('❌ Error 422 - Datos inválidos');
      console.log('🔍 Los datos enviados no cumplen con los requisitos de resOS');
      console.log('💡 Revisa el formato de los datos y los campos requeridos');
    } else if (createResult.status === 401) {
      console.log('❌ Error 401 - Problema de autenticación');
      console.log('🔑 Verifica que la API key sea correcta');
      console.log('🔗 Asegúrate de que la API esté habilitada en tu cuenta resOS');
    } else {
      console.log(`❌ Error ${createResult.status} - ${createResult.data?.message || 'Error desconocido'}`);
    }

    if (!createResult.isJson) {
      console.log('\n🚨 PROBLEMA CRÍTICO:');
      console.log('La API está devolviendo HTML en lugar de JSON');
      console.log('Esto causa el error: "Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON"');
    }

  } catch (error) {
    console.error('\n💥 ERROR EN DIAGNÓSTICO:', error.message);
  }

  console.log('\n' + '=' .repeat(50));
  console.log('🔗 Recursos útiles:');
  console.log('- Documentación API: https://api.resos.com/v1/');
  console.log('- Soporte resOS: hi@resos.com');
  console.log('\n💡 Para más información, revisa los logs detallados arriba');
}

// Ejecutar diagnóstico
runDiagnostic();
