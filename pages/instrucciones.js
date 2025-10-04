/**
 * Página de instrucciones para usar correctamente el formulario de reservas
 * Acceder en: /instrucciones
 */

export default function Instrucciones() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ color: '#732621', textAlign: 'center', marginBottom: '2rem' }}>
        📋 INSTRUCCIONES PARA USAR EL FORMULARIO DE RESERVAS
      </h1>

      <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px' }}>
        <h2 style={{ color: '#856404', marginTop: 0 }}>🚨 ERROR COMÚN: &quot;Método no permitido. Use POST.&quot;</h2>
        <p style={{ marginBottom: '1rem' }}>
          <strong>¿Ves este error?</strong> Significa que estás intentando acceder al endpoint de la API directamente desde el navegador.
        </p>
        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
          <code style={{ color: '#721c24' }}>
            {`{"success":false,"message":"Método no permitido. Use POST."}`}
          </code>
        </div>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#732621' }}>✅ CÓMO USAR EL FORMULARIO CORRECTAMENTE</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>1. Ve a la página principal</h3>
          <p>Accede a la página principal de tu sitio web donde está el formulario de reservas.</p>
          <div style={{ backgroundColor: '#e8f4fd', padding: '0.5rem', borderRadius: '4px' }}>
            <strong>URL:</strong> <code>http://localhost:3000</code> (desarrollo) o tu dominio de producción
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>2. Completa el formulario</h3>
          <p>Llena todos los campos obligatorios:</p>
          <ul>
            <li>📝 <strong>Nombre:</strong> Tu nombre completo</li>
            <li>📞 <strong>Teléfono:</strong> Con código de país (+56 9 xxxx xxxx)</li>
            <li>📧 <strong>Email:</strong> <em>Opcional pero recomendado</em> - Recibirás confirmación y recordatorios</li>
            <li>📅 <strong>Fecha:</strong> Fecha futura</li>
            <li>🕐 <strong>Hora:</strong> Hora de reserva</li>
            <li>👥 <strong>Personas:</strong> Entre 1 y 12</li>
          </ul>

          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px' }}>
            <h4 style={{ marginTop: 0, color: '#856404' }}>💡 Sobre el campo Email:</h4>
            <ul style={{ margin: '0.5rem 0' }}>
              <li>Es <strong>opcional</strong> pero <strong>altamente recomendado</strong></li>
              <li>Si no lo proporcionas, el sistema funcionará igual</li>
              <li>Te permite recibir confirmaciones automáticas</li>
              <li>Facilita recordatorios y cambios en la reserva</li>
              <li>Si hay problemas, te contactaremos por teléfono</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>3. Envía la reserva</h3>
          <p>Haz clic en el botón &quot;RESERVAR AHORA&quot;. El formulario enviará automáticamente una petición POST.</p>
          <div style={{ backgroundColor: '#d4edda', padding: '0.5rem', borderRadius: '4px' }}>
            ✅ El formulario maneja automáticamente el método HTTP correcto
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#732621' }}>🔍 QUÉ HACER SI SIGUES TENIENDO PROBLEMAS</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>1. Página de Pruebas</h3>
          <p>Ve a la página de pruebas para verificar que todo funciona:</p>
          <div style={{ backgroundColor: '#e8f4fd', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.5rem' }}>
            <strong>URL:</strong> <code>http://localhost:3000/test-reservas</code>
          </div>
          <p>Haz clic en &quot;Reservas Completa&quot; para probar el sistema completo.</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>2. Diagnóstico HTTP</h3>
          <p>Si sospechas problemas con los métodos HTTP:</p>
          <div style={{ backgroundColor: '#e8f4fd', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.5rem' }}>
            <strong>URL:</strong> <code>http://localhost:3000/diagnostico-http</code>
          </div>
          <p>Esta página te permite probar diferentes métodos HTTP para identificar el problema.</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>3. Revisa la consola</h3>
          <p>Abre las herramientas de desarrollo del navegador (F12) y revisa:</p>
          <ul>
            <li>🔍 La pestaña <strong>Console</strong> para logs de JavaScript</li>
            <li>🌐 La pestaña <strong>Network</strong> para ver las peticiones HTTP</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#732621' }}>⚙️ CONFIGURACIÓN NECESARIA EN RESOS</h2>

        <p style={{ marginBottom: '1rem' }}>
          Si ves el error <strong>&quot;no suitable table found&quot;</strong>, significa que falta configurar tu cuenta de resOS:
        </p>

        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
          <h4>Configuración requerida:</h4>
          <ol>
            <li>Ingresa a tu panel de resOS</li>
            <li>Ve a <strong>Settings → Tables</strong></li>
            <li>Agrega al menos una mesa con:
              <ul>
                <li>Nombre: &quot;Mesa 1&quot;</li>
                <li>Capacidad mínima: 1</li>
                <li>Capacidad máxima: 12</li>
              </ul>
            </li>
            <li>Configura horarios de operación</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#732621' }}>🔧 COMANDOS DE DEBUG</h2>

        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
          <pre style={{ margin: 0, overflow: 'auto' }}>
{`# Ver procesos de Next.js
ps aux | grep &quot;next dev&quot;

# Ver logs del servidor
tail -f ~/.npm/_logs/*.log

# Reiniciar Next.js si es necesario
npm run dev`}
          </pre>
        </div>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '8px' }}>
        <h2 style={{ color: '#155724', marginTop: 0 }}>✅ RESULTADO ESPERADO</h2>
        <p style={{ marginBottom: '1rem' }}>
          Cuando todo funciona correctamente, deberías ver:
        </p>
        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
          <strong>✅ Mensaje de éxito:</strong> &quot;¡Reserva creada exitosamente! Te contactaremos pronto para confirmar.&quot;
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>¿Sigues teniendo problemas?</strong>
        </p>
        <p>
          Comparte los resultados de las páginas de diagnóstico y podremos resolverlo juntos.
        </p>
      </div>
    </div>
  );
}
