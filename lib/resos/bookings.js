/**
 * Módulo de Reservas para la API de resOS
 * Maneja todas las operaciones relacionadas con reservas
 */

import { makeRequest } from './config';

/**
 * Estructura de datos para una reserva en resOS
 * @typedef {Object} ReservationData
 * @property {Object} guest - Información del huésped
 * @property {string} guest.name - Nombre completo
 * @property {string} guest.email - Correo electrónico
 * @property {string} guest.phone - Número de teléfono (con código de país)
 * @property {string} dateTime - Fecha y hora en formato ISO 8601
 * @property {number} people - Número de personas
 * @property {string} [status] - Estado de la reserva (por defecto: 'pending')
 * @property {string} [source] - Origen de la reserva (por defecto: 'website')
 * @property {Array} [tables] - Mesas asignadas (opcional)
 */

/**
 * Convierte los datos del formulario a formato de resOS
 * @param {Object} formData - Datos del formulario
 * @returns {ReservationData} Datos formateados para resOS
 */
function formatReservationData(formData) {
  const { nombre, telefono, fecha, hora, personas, email } = formData;

  // Crear fecha en zona horaria local y convertir a ISO 8601
  // resOS espera la fecha en UTC
  const localDateTime = new Date(`${fecha}T${hora}:00`);
  const dateTime = localDateTime.toISOString();

  // Asegurar que el teléfono tenga el código de país
  let phoneNumber = telefono;
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = `+56${phoneNumber}`; // Chile por defecto
  }

  // Usar email proporcionado o generar uno válido
  let guestEmail = email;
  if (!guestEmail || guestEmail.trim() === '') {
    // Generar un email válido basado en el nombre
    const cleanName = nombre.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);
    const timestamp = Date.now().toString().slice(-4); // Últimos 4 dígitos del timestamp
    guestEmail = `${cleanName}${timestamp}@placeholder.com`;
    console.log('📧 Email generado automáticamente:', guestEmail);
  }

  return {
    guest: {
      name: nombre.trim(),
      phone: phoneNumber,
      email: guestEmail,
      notificationEmail: true,
      notificationSms: true,
    },
    dateTime: dateTime,
    people: parseInt(personas, 10),
    source: 'website',
  };
}

/**
 * Valida los datos de la reserva antes de enviarlos
 * @param {Object} formData - Datos del formulario
 * @returns {Object} Resultado de validación
 */
function validateReservationData(formData) {
  const errors = [];
  const { nombre, telefono, fecha, hora, personas } = formData;

  if (!nombre || nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  if (!telefono || !/^\+?[\d\s\-\(\)]{8,}$/.test(telefono)) {
    errors.push('El teléfono debe tener un formato válido');
  }

  if (!fecha) {
    errors.push('La fecha es obligatoria');
  } else {
    const selectedDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.push('La fecha no puede ser anterior a hoy');
    }
  }

  if (!hora) {
    errors.push('La hora es obligatoria');
  }

  if (!personas || parseInt(personas, 10) < 1 || parseInt(personas, 10) > 12) {
    errors.push('El número de personas debe estar entre 1 y 12');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Crea una nueva reserva en resOS
 * @param {Object} formData - Datos del formulario
 * @returns {Promise<Object>} Respuesta de la API
 */
async function createReservation(formData) {
  try {
    // Validar datos antes de enviar
    const validation = validateReservationData(formData);
    if (!validation.isValid) {
      throw new Error(`Datos inválidos: ${validation.errors.join(', ')}`);
    }

    // Formatear datos para resOS
    const reservationData = formatReservationData(formData);

    console.log('Enviando reserva a resOS:', reservationData);

    // Crear reserva
    const response = await makeRequest('POST', '/bookings', reservationData);

    console.log('Reserva creada exitosamente:', response);
    return response;

  } catch (error) {
    console.error('Error al crear reserva:', error);
    throw new Error(`No se pudo crear la reserva: ${error.message}`);
  }
}

/**
 * Obtiene una reserva por ID
 * @param {string} bookingId - ID de la reserva
 * @returns {Promise<Object>} Datos de la reserva
 */
async function getReservation(bookingId) {
  try {
    const response = await makeRequest('GET', `/bookings/${bookingId}`);
    return response;
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    throw new Error(`No se pudo obtener la reserva: ${error.message}`);
  }
}

/**
 * Lista todas las reservas con filtros opcionales
 * @param {Object} filters - Filtros de búsqueda
 * @returns {Promise<Array>} Lista de reservas
 */
async function listReservations(filters = {}) {
  try {
    const params = {};

    if (filters.date) {
      params.customQuery = `dateTime:"${filters.date}"`;
    }

    if (filters.status) {
      params.customQuery = (params.customQuery ? `${params.customQuery},` : '') + `status:"${filters.status}"`;
    }

    if (filters.limit) {
      params.limit = filters.limit;
    }

    if (filters.skip) {
      params.skip = filters.skip;
    }

    const response = await makeRequest('GET', '/bookings', null, params);
    return response;
  } catch (error) {
    console.error('Error al listar reservas:', error);
    throw new Error(`No se pudieron obtener las reservas: ${error.message}`);
  }
}

/**
 * Actualiza una reserva existente
 * @param {string} bookingId - ID de la reserva
 * @param {Object} updateData - Datos a actualizar
 * @returns {Promise<Object>} Reserva actualizada
 */
async function updateReservation(bookingId, updateData) {
  try {
    const response = await makeRequest('PUT', `/bookings/${bookingId}`, updateData);
    return response;
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    throw new Error(`No se pudo actualizar la reserva: ${error.message}`);
  }
}

export {
  formatReservationData,
  validateReservationData,
  createReservation,
  getReservation,
  listReservations,
  updateReservation,
};
