/**
 * Página de prueba para el sistema de reservas
 * Acceder en: /test-reservas
 */

import { useState } from 'react';

export default function TestReservas() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [endpoint, setEndpoint] = useState('/api/reservas');

  const testData = {
    nombre: 'Juan Pérez',
    telefono: '+56987654321',
    fecha: '2024-12-25',
    hora: '19:30',
    personas: '4',
    email: 'juan.perez@example.com' // Email válido para resOS
  };

  const testDataWithoutEmail = {
    nombre: 'María González',
    telefono: '+56987654322',
    fecha: '2024-12-26',
    hora: '20:00',
    personas: '2',
    email: '' // Email vacío para probar funcionamiento sin email
  };

  const testDataEmptyEmail = {
    nombre: 'Carlos López',
    telefono: '+56987654323',
    fecha: '2024-12-27',
    hora: '18:30',
    personas: '3',
    email: null // Email null para probar funcionamiento con email explícitamente null
  };

  const testAPI = async (apiEndpoint = endpoint, useTestData = true) => {
    setLoading(true);
    setResult(null);

    const dataToSend = useTestData ? testData : testDataWithoutEmail;

    try {
      console.log('🧪 Enviando datos de prueba a:', apiEndpoint);
      console.log('Datos:', dataToSend);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('📡 Respuesta del servidor:');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Respuesta no es JSON: ${contentType}`);
      }

      const data = await response.json();
      console.log('✅ Datos parseados:', data);

      setResult({
        success: true,
        status: response.status,
        data,
        headers: Object.fromEntries(response.headers.entries()),
        endpoint: apiEndpoint
      });

    } catch (error) {
      console.error('❌ Error en la prueba:', error);
      setResult({
        success: false,
        error: error.message,
        stack: error.stack,
        endpoint: apiEndpoint
      });
    } finally {
      setLoading(false);
    }
  };

  const testBasicAPI = () => testAPI('/api/test');
  const testSimpleReservas = () => testAPI('/api/reservas/simple');
  const testFullReservas = () => testAPI('/api/reservas');
  const testFullReservasWithoutEmail = () => testAPI('/api/reservas', false);
  const testFullReservasNullEmail = () => testAPI('/api/reservas', null, testDataEmptyEmail);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🧪 PRUEBA DEL SISTEMA DE RESERVAS</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Datos de prueba que se enviarán:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#0070f3' }}>📧 Con Email:</h4>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.9rem'
            }}>
              {JSON.stringify(testData, null, 2)}
            </pre>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#17a2b8' }}>❌ Sin Email:</h4>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.9rem'
            }}>
              {JSON.stringify(testDataWithoutEmail, null, 2)}
            </pre>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#6c757d' }}>❌ Email Null:</h4>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.9rem'
            }}>
              {JSON.stringify(testDataEmptyEmail, null, 2)}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e8f4fd', border: '1px solid #b8daff', borderRadius: '4px' }}>
          <strong>💡 Notas:</strong>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Email es opcional pero recomendado para confirmaciones</li>
            <li>Si no se proporciona email, se genera uno automáticamente</li>
            <li>El sistema funciona con o sin email</li>
          </ul>
        </div>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            🔍 Ver datos formateados para resOS
          </summary>
          <div style={{
            background: '#e8f5e8',
            padding: '1rem',
            borderRadius: '4px',
            marginTop: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <p><strong>Nota:</strong> Estos son los datos que se enviarán a la API de resOS después del formateo:</p>
            <pre style={{
              background: '#f8f9fa',
              padding: '0.5rem',
              borderRadius: '4px',
              marginTop: '0.5rem',
              overflow: 'auto',
              fontSize: '0.8rem'
            }}>
{JSON.stringify({
  guest: {
    name: testData.nombre.trim(),
    phone: testData.telefono.startsWith('+') ? testData.telefono : `+56${testData.telefono}`,
    email: testData.email,
    notificationEmail: true,
    notificationSms: true
  },
  dateTime: new Date(`${testData.fecha}T${testData.hora}:00`).toISOString(),
  people: parseInt(testData.personas, 10),
  source: 'website'
}, null, 2)}
            </pre>
          </div>
        </details>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={testBasicAPI}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Enviando...' : '🧪 Probar API Básica'}
        </button>

        <button
          onClick={testSimpleReservas}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: loading ? '#ccc' : '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Enviando...' : '📝 Probar Reservas Simple'}
        </button>

        <button
          onClick={testFullReservas}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Enviando...' : '🚀 Probar Reservas Completa'}
        </button>

        <button
          onClick={testFullReservasWithoutEmail}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: loading ? '#ccc' : '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Enviando...' : '📧 Probar Sin Email'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>📊 Resultado:</h2>

          {result.success ? (
            <div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '4px',
                color: '#155724',
                marginBottom: '1rem'
              }}>
                ✅ PRUEBA EXITOSA - Status: {result.status}
              </div>

              <details style={{ marginBottom: '1rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  📄 Headers de respuesta
                </summary>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  marginTop: '0.5rem'
                }}>
                  {JSON.stringify(result.headers, null, 2)}
                </pre>
              </details>

              <details>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  📋 Datos de respuesta
                </summary>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  marginTop: '0.5rem'
                }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              color: '#721c24'
            }}>
              ❌ ERROR: {result.error}

              {result.stack && (
                <details style={{ marginTop: '1rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    🔍 Stack Trace
                  </summary>
                  <pre style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflow: 'auto',
                    marginTop: '0.5rem',
                    fontSize: '0.8rem'
                  }}>
                    {result.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
        <h3>📋 Instrucciones:</h3>
        <ol>
          <li><strong>API Básica</strong> (verde): Prueba que Next.js funciona correctamente</li>
          <li><strong>Reservas Simple</strong> (amarillo): Prueba endpoint sin dependencias externas</li>
          <li><strong>Reservas Completa</strong> (azul): Prueba el sistema completo con resOS</li>
          <li>Revisa la consola del navegador (F12) para ver los logs detallados</li>
          <li>Si hay un error, revisa los detalles en la sección de resultado</li>
          <li>Los logs del servidor aparecerán en la terminal donde está corriendo Next.js</li>
        </ol>

        <h3 style={{ marginTop: '1rem' }}>🔗 Endpoints de Prueba:</h3>
        <ul>
          <li><a href="/api/test" target="_blank" style={{ color: '#0070f3' }}>/api/test</a> - Endpoint básico</li>
          <li><a href="/api/reservas/simple" target="_blank" style={{ color: '#0070f3' }}>/api/reservas/simple</a> - Reservas sin resOS</li>
          <li><a href="/api/reservas/test" target="_blank" style={{ color: '#0070f3' }}>/api/reservas/test</a> - Prueba del módulo resOS</li>
          <li><a href="/api/reservas" target="_blank" style={{ color: '#0070f3' }}>/api/reservas</a> - Sistema completo</li>
        </ul>

        <h3 style={{ marginTop: '1rem' }}>🔍 Páginas de Diagnóstico:</h3>
        <ul>
          <li><a href="/diagnostico-http" target="_blank" style={{ color: '#28a745' }}>/diagnostico-http</a> - Diagnóstico completo de métodos HTTP</li>
          <li><a href="/debug-formulario" target="_blank" style={{ color: '#dc3545' }}>/debug-formulario</a> - Debug detallado del hook y formulario</li>
          <li><a href="/instrucciones" target="_blank" style={{ color: '#6f42c1' }}>/instrucciones</a> - Guía completa para usar el formulario</li>
        </ul>

        <h3 style={{ marginTop: '1rem' }}>🔧 Solución al Error:</h3>

        <h4>Si ves &quot;Método no permitido. Use POST.&quot;:</h4>
        <ul>
          <li>❌ <strong>Estás accediendo directamente</strong> a `/api/reservas` desde el navegador</li>
          <li>✅ <strong>Solución</strong>: Usa el formulario de la página principal</li>
          <li>🔍 <strong>Diagnóstico</strong>: Ve a `/diagnostico-http` para probar métodos HTTP</li>
        </ul>

        <h4>Si ves &quot;text/html; charset=utf-8&quot;:</h4>
        <ul>
          <li>✅ <strong>API Básica funciona</strong> → Problema no está en Next.js</li>
          <li>✅ <strong>Reservas Simple funciona</strong> → Problema no está en el endpoint</li>
          <li>❌ <strong>Reservas Completa falla</strong> → Problema está en la importación del módulo resOS</li>
        </ul>

        <h4>Si ves &quot;no suitable table found&quot;:</h4>
        <ul>
          <li>✅ <strong>Los datos están correctos</strong> → Formato válido para resOS</li>
          <li>⚠️ <strong>Falta configuración</strong> → Configura mesas en resOS</li>
          <li>📞 <strong>Contacto</strong> → Configura tu cuenta de resOS</li>
        </ul>
      </div>
    </div>
  );
}
