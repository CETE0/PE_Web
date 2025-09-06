/**
 * Hook personalizado para manejar el formulario de reservas
 * Proporciona estado, validación y envío de datos a la API
 */

import { useState, useCallback } from 'react';

const initialFormData = {
  nombre: '',
  telefono: '',
  fecha: '',
  hora: '',
  personas: '',
  email: '',
};

const initialFormErrors = {
  nombre: '',
  telefono: '',
  fecha: '',
  hora: '',
  personas: '',
  email: '',
};

export function useReservation() {
  console.log('🔧 Hook useReservation inicializado');

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Actualiza el valor de un campo del formulario
   */
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  }, [errors]);

  /**
   * Valida un campo individual
   */
  const validateField = useCallback((field, value) => {
    let error = '';

    switch (field) {
      case 'nombre':
        if (!value || value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        }
        break;

      case 'telefono':
        if (!value) {
          error = 'El teléfono es obligatorio';
        } else if (!/^\+?[\d\s\-\(\)]{8,}$/.test(value)) {
          error = 'Formato de teléfono inválido';
        }
        break;

      case 'fecha':
        if (!value) {
          error = 'La fecha es obligatoria';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate < today) {
            error = 'La fecha no puede ser anterior a hoy';
          }
        }
        break;

      case 'hora':
        if (!value) {
          error = 'La hora es obligatoria';
        }
        break;

      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'El formato del email es inválido';
        }
        // Email es opcional, así que no hay error si está vacío
        break;

      case 'personas':
        const numPersonas = parseInt(value, 10);
        if (!value || isNaN(numPersonas) || numPersonas < 1 || numPersonas > 12) {
          error = 'El número de personas debe estar entre 1 y 12';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));

    return !error;
  }, []);

  /**
   * Valida todo el formulario
   */
  const validateForm = useCallback(() => {
    const newErrors = { ...initialFormErrors };
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const fieldValid = validateField(field, formData[field]);
      if (!fieldValid) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  /**
   * Envía el formulario a la API
   */
  const submitReservation = useCallback(async () => {
    console.log('🎯 submitReservation llamado desde el hook');
    console.log('📊 Estado actual del formulario:', {
      formData,
      isSubmitting,
      submitStatus
    });

    if (!validateForm()) {
      console.log('❌ Validación del formulario falló');
      setSubmitStatus('error');
      setSubmitMessage('Por favor, corrige los errores en el formulario.');
      return;
    }

    console.log('✅ Validación del formulario pasó');
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      console.log('🚀 Iniciando envío de reserva...');
      console.log('📦 Datos del formulario:', formData);
      console.log('📧 Email en formulario:', formData.email || 'NO PROPORCIONADO');
      console.log('🌐 Enviando petición POST a /api/reservas');

      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📡 Respuesta recibida:');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      // Verificar que la respuesta sea JSON antes de parsear
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Respuesta inesperada del servidor: ${contentType || 'tipo desconocido'}`);
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('¡Reserva creada exitosamente! Te contactaremos pronto para confirmar.');
        // Limpiar formulario después de éxito
        setFormData(initialFormData);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Ocurrió un error al crear la reserva.');

        // Mostrar errores específicos si existen
        if (data.errors) {
          setErrors(prev => ({
            ...prev,
            ...data.errors,
          }));
        }
      }
    } catch (error) {
      console.error('❌ Error al enviar reserva:', error);
      console.error('Stack trace:', error.stack);

      // Manejar errores específicos
      if (error.message.includes('Respuesta inesperada del servidor')) {
        console.log('🚨 Error de tipo de contenido - posible problema con el endpoint');
        setSubmitMessage('Error del servidor. Verifica que estés usando el formulario correctamente.');
      } else if (error.message.includes('fetch')) {
        console.log('🌐 Error de conexión de red');
        setSubmitMessage('Error de conexión. Verifica tu conexión a internet.');
      } else if (error.message.includes('JSON')) {
        console.log('📄 Error al parsear respuesta JSON');
        setSubmitMessage('Error al procesar la respuesta del servidor.');
      } else if (error.message.includes('405')) {
        console.log('🚫 Error 405 - Método HTTP incorrecto');
        setSubmitMessage('Error: método no permitido. El formulario debe enviar POST.');
      } else {
        console.log('❓ Error desconocido');
        setSubmitMessage('Ocurrió un error inesperado. Revisa la consola para más detalles.');
      }

      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  /**
   * Reinicia el formulario y estados
   */
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors(initialFormErrors);
    setIsSubmitting(false);
    setSubmitStatus(null);
    setSubmitMessage('');
  }, []);

  /**
   * Verifica si el formulario tiene errores
   */
  const hasErrors = useCallback(() => {
    return Object.values(errors).some(error => error !== '');
  }, [errors]);

  /**
   * Verifica si el formulario está completo
   */
  const isFormComplete = useCallback(() => {
    return Object.values(formData).every(value => value !== '');
  }, [formData]);

  return {
    // Estado del formulario
    formData,
    errors,

    // Estados de envío
    isSubmitting,
    submitStatus,
    submitMessage,

    // Funciones
    updateField,
    validateField,
    validateForm,
    submitReservation,
    resetForm,
    hasErrors,
    isFormComplete,
  };
}
