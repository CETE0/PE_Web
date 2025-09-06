/**
 * Configuración de la API de resOS
 * Documentación: https://api.resos.com/v1/
 */

const RESOS_API_CONFIG = {
  baseURL: 'https://api.resos.com/v1',
  apiKey: 'QroV6PLVsXGBVth2lg44YyDyhTCmTj-p7HwT7Sjfltk',
  timeout: 10000, // 10 segundos
};

/**
 * Genera el header de autenticación HTTP Basic Auth para resOS
 * @returns {string} Header Authorization
 */
function getAuthHeader() {
  const credentials = Buffer.from(`${RESOS_API_CONFIG.apiKey}:`, 'utf8').toString('base64');
  return `Basic ${credentials}`;
}

/**
 * Configuración completa para hacer requests a la API de resOS
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE)
 * @param {string} endpoint - Endpoint de la API (ej: '/bookings')
 * @param {object} data - Datos para enviar en el body (opcional)
 * @returns {object} Configuración para fetch
 */
function getRequestConfig(method, endpoint, data = null) {
  const config = {
    method,
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  return config;
}

/**
 * Construye la URL completa para un endpoint
 * @param {string} endpoint - Endpoint de la API
 * @param {object} params - Parámetros de query (opcional)
 * @returns {string} URL completa
 */
function buildURL(endpoint, params = null) {
  let url = `${RESOS_API_CONFIG.baseURL}${endpoint}`;

  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  return url;
}

/**
 * Realiza una petición HTTP a la API de resOS
 * @param {string} method - Método HTTP
 * @param {string} endpoint - Endpoint de la API
 * @param {object} data - Datos para enviar (opcional)
 * @param {object} params - Parámetros de query (opcional)
 * @returns {Promise<object>} Respuesta de la API
 */
async function makeRequest(method, endpoint, data = null, params = null) {
  const url = buildURL(endpoint, params);
  const config = getRequestConfig(method, endpoint, data);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      // Intentar obtener el mensaje de error del body si es JSON
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } else {
          // Si no es JSON, intentar obtener el texto del body
          const textResponse = await response.text();
          if (textResponse && textResponse.length < 500) { // Evitar logs muy largos
            errorMessage = `HTTP ${response.status}: ${textResponse.substring(0, 200)}...`;
          }
        }
      } catch (parseError) {
        // Si no se puede parsear el error, usar el mensaje por defecto
        console.warn('No se pudo parsear el mensaje de error:', parseError.message);
      }

      throw new Error(errorMessage);
    }

    // Verificar que la respuesta sea JSON antes de parsear
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`La API devolvió un tipo de contenido inesperado: ${contentType}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en petición a resOS API (${method} ${endpoint}):`, error);
    throw error;
  }
}

export {
  RESOS_API_CONFIG,
  getAuthHeader,
  getRequestConfig,
  buildURL,
  makeRequest,
};
