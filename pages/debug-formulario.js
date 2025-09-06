/**
 * Página de debug para el formulario de reservas
 * Acceder en: /debug-formulario
 */

import { useState } from 'react';
import { useReservation } from '@/hooks/useReservation';

export default function DebugFormulario() {
  const [debugLogs, setDebugLogs] = useState([]);

  const addLog = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      timestamp,
      message,
      data
    };
    console.log(`[${timestamp}] ${message}`, data);
    setDebugLogs(prev => [logEntry, ...prev]);
  };

  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    updateField,
    submitReservation,
    resetForm,
    hasErrors,
    isFormComplete,
  } = useReservation();

  const testHook = () => {
    addLog('🧪 Probando hook useReservation', {
      formData,
      errors,
      isSubmitting,
      submitStatus,
      hasErrors: hasErrors(),
      isFormComplete: isFormComplete()
    });
  };

  const testUpdateField = () => {
    addLog('📝 Probando updateField');
    updateField('nombre', 'Juan Pérez Test');
    addLog('✅ Campo nombre actualizado');
  };

  const testSubmitReservation = async () => {
    addLog('🚀 Probando submitReservation');
    try {
      await submitReservation();
      addLog('✅ submitReservation completado');
    } catch (error) {
      addLog('❌ Error en submitReservation', error.message);
    }
  };

  const testFetchDirect = async () => {
    addLog('🌐 Probando fetch directo');
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      addLog('✅ Fetch directo exitoso', data);
    } catch (error) {
      addLog('❌ Error en fetch directo', error.message);
    }
  };

  const clearLogs = () => {
    setDebugLogs([]);
    addLog('🧹 Logs limpiados');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🔧 DEBUG DEL FORMULARIO DE RESERVAS</h1>

      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
        <h3>📋 Información del Hook</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h4>Estado del Formulario:</h4>
            <pre style={{
              background: '#f8f9fa',
              padding: '0.5rem',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>

          <div>
            <h4>Errores:</h4>
            <pre style={{
              background: '#f8f9fa',
              padding: '0.5rem',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {JSON.stringify(errors, null, 2)}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <strong>Estado:</strong>
          <span style={{ marginLeft: '1rem' }}>
            isSubmitting: {isSubmitting ? '✅' : '❌'} |
            submitStatus: {submitStatus || 'null'} |
            hasErrors: {hasErrors() ? '✅' : '❌'} |
            isFormComplete: {isFormComplete() ? '✅' : '❌'}
          </span>
        </div>

        {submitMessage && (
          <div style={{
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: submitStatus === 'success' ? '#d4edda' : '#f8d7da',
            borderRadius: '4px'
          }}>
            <strong>Mensaje:</strong> {submitMessage}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>🧪 Pruebas del Hook</h3>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button
            onClick={testHook}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🧪 Probar Hook
          </button>

          <button
            onClick={testUpdateField}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📝 Probar updateField
          </button>

          <button
            onClick={testSubmitReservation}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🚀 Probar submitReservation
          </button>

          <button
            onClick={testFetchDirect}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🌐 Probar Fetch Directo
          </button>

          <button
            onClick={clearLogs}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🧹 Limpiar Logs
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>📜 Logs de Debug</h3>
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          {debugLogs.length === 0 ? (
            <div style={{ padding: '1rem', color: '#6c757d' }}>
              No hay logs aún. Haz clic en los botones de arriba para generar logs.
            </div>
          ) : (
            debugLogs.map((log, index) => (
              <div key={index} style={{
                padding: '0.5rem',
                borderBottom: index < debugLogs.length - 1 ? '1px solid #dee2e6' : 'none',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#6c757d', marginRight: '1rem' }}>
                  [{log.timestamp}]
                </span>
                <span>{log.message}</span>
                {log.data && (
                  <pre style={{
                    margin: '0.5rem 0 0 0',
                    padding: '0.5rem',
                    background: '#fff',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    overflow: 'auto'
                  }}>
                    {typeof log.data === 'string' ? log.data : JSON.stringify(log.data, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ padding: '1rem', backgroundColor: '#e8f4fd', border: '1px solid #b8daff', borderRadius: '4px' }}>
        <h3>🔍 ¿Qué hacer si ves errores?</h3>
        <ol>
          <li>Revisa la consola del navegador (F12) para errores de JavaScript</li>
          <li>Compara los logs aquí con los de la consola</li>
          <li>Si el hook no se inicializa, hay un problema de importación</li>
          <li>Si updateField no funciona, hay un problema con el estado</li>
          <li>Si submitReservation falla, hay un problema con la API</li>
          <li>Si fetch directo falla, hay un problema con Next.js</li>
        </ol>
      </div>
    </div>
  );
}
