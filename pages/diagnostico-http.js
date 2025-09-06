/**
 * Página de diagnóstico HTTP para identificar problemas de métodos
 * Acceder en: /diagnostico-http
 */

import { useState } from 'react';

export default function DiagnosticoHttp() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const testMethod = async (method, endpoint) => {
    const key = `${method}-${endpoint}`;
    setLoading(prev => ({ ...prev, [key]: true }));

    try {
      console.log(`🧪 Probando ${method} ${endpoint}`);

      const config = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Solo agregar body para métodos que lo permitan
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        config.body = JSON.stringify({
          nombre: 'Juan Pérez',
          telefono: '+56987654321',
          fecha: '2024-12-25',
          hora: '19:30',
          personas: '4',
          email: 'juan.perez@example.com' // Campo email agregado
        });
      }

      const response = await fetch(endpoint, config);

      console.log(`📡 Respuesta de ${method} ${endpoint}:`);
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('✅ Datos JSON:', data);
      } else {
        const textData = await response.text();
        console.log('📄 Datos de texto:', textData.substring(0, 200));
        data = textData;
      }

      setResults(prev => ({
        ...prev,
        [key]: {
          success: true,
          status: response.status,
          contentType,
          data,
          headers: Object.fromEntries(response.headers.entries())
        }
      }));

    } catch (error) {
      console.error(`❌ Error en ${method} ${endpoint}:`, error);
      setResults(prev => ({
        ...prev,
        [key]: {
          success: false,
          error: error.message,
          stack: error.stack
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const endpoints = [
    '/api/reservas',
    '/api/test',
    '/api/reservas/simple',
  ];

  const methods = ['GET', 'POST', 'PUT', 'DELETE'];

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🔍 DIAGNÓSTICO DE MÉTODOS HTTP</h1>

      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
        <h3>📋 Instrucciones:</h3>
        <ol>
          <li>Haz clic en los botones para probar diferentes combinaciones de método + endpoint</li>
          <li>Revisa la consola del navegador (F12) para logs detallados</li>
          <li>Los logs del servidor aparecerán en la terminal de Next.js</li>
          <li>Busca respuestas con status 405 (Method Not Allowed)</li>
        </ol>

        <h3>🎯 Objetivo:</h3>
        <p>Identificar por qué se está enviando un método incorrecto al endpoint.</p>
      </div>

      {endpoints.map(endpoint => (
        <div key={endpoint} style={{ marginBottom: '2rem', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>{endpoint}</h2>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {methods.map(method => {
              const key = `${method}-${endpoint}`;
              const isLoading = loading[key];
              const result = results[key];

              return (
                <button
                  key={method}
                  onClick={() => testMethod(method, endpoint)}
                  disabled={isLoading}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    backgroundColor: isLoading ? '#ccc' : '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? '⏳' : '🚀'} {method}
                </button>
              );
            })}
          </div>

          {(() => {
            const key = `POST-${endpoint}`; // Mostrar resultado de POST por defecto
            const result = results[key];

            if (!result) return null;

            return (
              <div style={{
                padding: '1rem',
                borderRadius: '4px',
                backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
                color: result.success ? '#155724' : '#721c24'
              }}>
                <h3 style={{ marginTop: 0 }}>
                  📊 Resultado de POST:
                </h3>

                {result.success ? (
                  <>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Content-Type:</strong> {result.contentType}</p>

                    <details>
                      <summary style={{ cursor: 'pointer' }}>📄 Respuesta completa</summary>
                      <pre style={{
                        background: '#f8f9fa',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        marginTop: '0.5rem',
                        overflow: 'auto',
                        fontSize: '0.8rem'
                      }}>
                        {typeof result.data === 'string'
                          ? result.data
                          : JSON.stringify(result.data, null, 2)
                        }
                      </pre>
                    </details>
                  </>
                ) : (
                  <>
                    <p><strong>Error:</strong> {result.error}</p>
                    {result.stack && (
                      <details>
                        <summary style={{ cursor: 'pointer' }}>🔍 Stack Trace</summary>
                        <pre style={{
                          background: '#f8f9fa',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          marginTop: '0.5rem',
                          overflow: 'auto',
                          fontSize: '0.8rem'
                        }}>
                          {result.stack}
                        </pre>
                      </details>
                    )}
                  </>
                )}
              </div>
            );
          })()}
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
        <h3>🔧 Comandos de Debug:</h3>
        <pre style={{ background: '#fff', padding: '0.5rem', borderRadius: '4px' }}>
{`# Ver logs del servidor Next.js
tail -f ~/.npm/_logs/*.log

# Ver procesos de Next.js
ps aux | grep "next dev"

# Reiniciar Next.js si es necesario
npm run dev`}
        </pre>
      </div>
    </div>
  );
}
