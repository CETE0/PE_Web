/**
 * Script para probar los endpoints desde Node.js
 * Ejecutar con: node test-endpoint.js
 */

const http = require('http');

function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'TestScript/1.0'
      }
    };

    console.log(`\n🧪 Probando ${method} ${path}...`);

    const req = http.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);

      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        console.log(`Content-Type: ${res.headers['content-type']}`);
        console.log(`Body length: ${body.length} caracteres`);

        if (body.length < 500) {
          console.log(`Body: ${body}`);
        } else {
          console.log(`Body (primeros 200 chars): ${body.substring(0, 200)}...`);
        }

        try {
          if (res.headers['content-type'] && res.headers['content-type'].includes('application/json')) {
            const jsonData = JSON.parse(body);
            console.log('✅ Respuesta es JSON válido');
            resolve({ status: res.statusCode, headers: res.headers, data: jsonData, raw: body });
          } else {
            console.log('❌ Respuesta NO es JSON');
            resolve({ status: res.statusCode, headers: res.headers, data: null, raw: body, isJson: false });
          }
        } catch (error) {
          console.log('❌ Error parseando JSON:', error.message);
          resolve({ status: res.statusCode, headers: res.headers, data: null, raw: body, error: error.message });
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error en la petición:', error.message);
      reject(error);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('🚀 PRUEBAS DE ENDPOINTS\n');

  try {
    // Esperar un poco para que Next.js esté listo
    console.log('⏳ Esperando que Next.js esté listo...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 1: Endpoint básico
    await testEndpoint('/api/test');

    // Test 2: Endpoint simple de reservas
    const testData = {
      nombre: 'Juan Pérez',
      telefono: '+56987654321',
      fecha: '2024-12-25',
      hora: '19:30',
      personas: '4'
    };

    await testEndpoint('/api/reservas/simple', 'POST', testData);

    // Test 3: Endpoint completo de reservas
    console.log('\n⚠️  Probando endpoint completo (puede fallar)...');
    await testEndpoint('/api/reservas', 'POST', testData);

  } catch (error) {
    console.error('\n💥 Error general en las pruebas:', error.message);
  }

  console.log('\n✨ Pruebas completadas');
}

// Ejecutar pruebas
runTests();
