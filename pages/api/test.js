/**
 * Endpoint de prueba simple para verificar que Next.js funciona correctamente
 */

export default async function handler(req, res) {
  console.log('🧪 Endpoint de prueba llamado');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.status(200).json({
      success: true,
      message: 'Endpoint de prueba funcionando correctamente',
      timestamp: new Date().toISOString(),
      method: req.method,
      headers: {
        'content-type': req.headers['content-type'] || 'none',
        'user-agent': req.headers['user-agent'] || 'none',
      }
    });
  } catch (error) {
    console.error('Error en endpoint de prueba:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en endpoint de prueba',
      error: error.message
    });
  }
}
