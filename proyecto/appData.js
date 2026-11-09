import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'apak-local-data-v1';
const usuarioActual = 'john';
const fechaManana = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

const datosIniciales = () => ({
  currentUserId: usuarioActual,
  users: [
    { id: 'john', name: 'John Due', age: '34', degree: 'TIID', email: '', about: 'Me gusta aprender y compartir conocimientos.', credits: 1, reserved: 0 },
    { id: 'juan', name: 'Juan Perez', age: '23', degree: 'Desarrollo de software', email: '', about: 'Comparto lo que se de programacion.', credits: 1, reserved: 0 },
    { id: 'pedro', name: 'Pedro Lopez', age: '25', degree: 'Informatica', email: '', about: 'Aprendo y enseño tecnologia.', credits: 1, reserved: 0 },
  ],
  services: [
    { id: 'service-html', ownerId: 'john', title: 'Introduccion a HTML', description: 'Aprende las bases para crear paginas web.', category: 'CODING', date: fechaManana(), time: '10:00', place: 'En linea', active: true },
    { id: 'service-python', ownerId: 'juan', title: 'Curso de Python', description: 'Aprende las bases del lenguaje Python.', category: 'CODING', date: fechaManana(), time: '12:00', place: 'En linea', active: true },
    { id: 'service-js', ownerId: 'pedro', title: 'Introduccion a JavaScript', description: 'Practica conceptos basicos de JavaScript.', category: 'CODING', date: fechaManana(), time: '15:00', place: 'En linea', active: true },
  ],
  categories: [
    { id: 'category-coding', name: 'CODING', description: 'Programacion y tecnologia' },
    { id: 'category-maths', name: 'MATHS', description: 'Matematicas' },
    { id: 'category-etics', name: 'ETICS', description: 'Etica y sociedad' },
  ],
  skills: [
    { id: 'skill-html', ownerId: 'john', name: 'Manejo amplio de HTML', level: 'Amplio' },
    { id: 'skill-css', ownerId: 'john', name: 'Manejo amplio de CSS', level: 'Amplio' },
    { id: 'skill-python', ownerId: 'juan', name: 'Manejo amplio de Python', level: 'Amplio' },
  ],
  requests: [
    { id: 'request-demo', serviceId: 'service-html', requesterId: 'pedro', status: 'pending', createdAt: new Date().toISOString() },
  ],
  exchanges: [],
  favorites: ['service-python'],
  reviews: [],
  reports: [],
  transactions: [],
});

const DataContext = createContext(null);

const crearId = (tipo) => `${tipo}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
const usuarioPorId = (datos, id) => datos.users.find((user) => user.id === id);
const servicioPorId = (datos, id) => datos.services.find((service) => service.id === id);
const validarHorario = (datos, ownerId, date, time, excluirId) => {
  const ocupado = datos.services.some((service) =>
    service.id !== excluirId && service.ownerId === ownerId && service.active && service.date === date && service.time === time);
  if (ocupado) throw new Error('Ya tienes un servicio publicado para esa fecha y hora.');
};
const registrarMovimiento = (datos, usuarioId, amount, description, status = 'completed') => {
  datos.transactions.unshift({
    id: crearId('transaction'),
    userId: usuarioId,
    amount,
    description,
    status,
    createdAt: new Date().toISOString(),
  });
};

export const LocalDataProvider = ({ children }) => {
  const [datos, setDatos] = useState(datosIniciales);
  const [cargando, setCargando] = useState(true);
  const datosRef = useRef(datos);

  useEffect(() => {
    let activo = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((guardado) => {
        if (guardado && activo) {
          const recuperado = JSON.parse(guardado);
          if (!recuperado || !Array.isArray(recuperado.users) || !Array.isArray(recuperado.services)) {
            throw new Error('Los datos guardados no tienen el formato esperado.');
          }
          datosRef.current = recuperado;
          setDatos(recuperado);
        }
      })
      .catch((error) => {
        Alert.alert('No se pudieron cargar los datos', error.message || 'Se usaran datos temporales.');
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => { activo = false; };
  }, []);

  const actualizar = useCallback(async (cambiar) => {
    const siguiente = cambiar(datosRef.current);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(siguiente));
    datosRef.current = siguiente;
    setDatos(siguiente);
    return siguiente;
  }, []);

  const agregarServicio = useCallback((servicio) => actualizar((actual) => {
    validarHorario(actual, actual.currentUserId, servicio.date, servicio.time);
    return {
      ...actual,
      services: [{ ...servicio, id: crearId('service'), ownerId: actual.currentUserId, active: true }, ...actual.services],
    };
  }), [actualizar]);

  const guardarServicio = useCallback((id, cambios) => actualizar((actual) => {
    const existente = actual.services.find((service) => service.id === id && service.ownerId === actual.currentUserId);
    if (!existente) throw new Error('No se encontro el servicio que quieres editar.');
    validarHorario(actual, actual.currentUserId, cambios.date, cambios.time, id);
    return {
      ...actual,
      services: actual.services.map((service) => service.id === id ? { ...service, ...cambios } : service),
    };
  }), [actualizar]);

  const eliminarServicio = useCallback((id) => actualizar((actual) => {
    const tieneIntercambio = actual.exchanges.some((exchange) => exchange.serviceId === id && exchange.status === 'accepted');
    if (tieneIntercambio) throw new Error('No puedes eliminar un servicio con un intercambio pendiente.');
    return {
      ...actual,
      services: actual.services.filter((service) => !(service.id === id && service.ownerId === actual.currentUserId)),
      requests: actual.requests.map((request) => request.serviceId === id && request.status === 'pending'
        ? { ...request, status: 'cancelled' }
        : request),
      favorites: actual.favorites.filter((serviceId) => serviceId !== id),
    };
  }), [actualizar]);

  const eliminarServicioAdministrador = useCallback((id) => actualizar((actual) => {
    const tieneIntercambio = actual.exchanges.some((exchange) => exchange.serviceId === id && exchange.status === 'accepted');
    if (tieneIntercambio) throw new Error('No puedes eliminar un servicio con un intercambio pendiente.');
    return {
      ...actual,
      services: actual.services.filter((service) => service.id !== id),
      requests: actual.requests.map((request) => request.serviceId === id && request.status === 'pending'
        ? { ...request, status: 'cancelled' }
        : request),
      favorites: actual.favorites.filter((serviceId) => serviceId !== id),
    };
  }), [actualizar]);

  const cambiarEstadoServicio = useCallback((id) => actualizar((actual) => {
    const servicio = servicioPorId(actual, id);
    if (!servicio) throw new Error('No se encontro el servicio.');
    if (!servicio.active) validarHorario(actual, servicio.ownerId, servicio.date, servicio.time, id);
    return {
      ...actual,
      services: actual.services.map((item) => item.id === id ? { ...item, active: !item.active } : item),
    };
  }), [actualizar]);

  const solicitarServicio = useCallback((servicioId) => actualizar((actual) => {
    const servicio = servicioPorId(actual, servicioId);
    if (!servicio || !servicio.active) throw new Error('Este servicio ya no esta disponible.');
    if (servicio.ownerId === actual.currentUserId) throw new Error('No puedes solicitar tu propio servicio.');
    const solicitante = usuarioPorId(actual, actual.currentUserId);
    if (!solicitante || solicitante.credits < 1) throw new Error('Necesitas al menos 1 credito disponible para solicitar este servicio.');
    if (actual.exchanges.some((exchange) => exchange.serviceId === servicioId && exchange.status === 'accepted')) {
      throw new Error('Este horario ya esta reservado.');
    }
    if (actual.requests.some((request) => request.serviceId === servicioId && request.requesterId === actual.currentUserId && ['pending', 'accepted'].includes(request.status))) {
      throw new Error('Ya tienes una solicitud activa para este servicio.');
    }
    return {
      ...actual,
      requests: [{ id: crearId('request'), serviceId: servicioId, requesterId: actual.currentUserId, status: 'pending', createdAt: new Date().toISOString() }, ...actual.requests],
    };
  }), [actualizar]);

  const cancelarSolicitud = useCallback((requestId) => actualizar((actual) => {
    const request = actual.requests.find((item) => item.id === requestId);
    if (!request || request.requesterId !== actual.currentUserId || request.status !== 'pending') {
      throw new Error('Solo puedes cancelar solicitudes que aun no han sido aceptadas.');
    }
    return {
      ...actual,
      requests: actual.requests.map((item) => item.id === requestId ? { ...item, status: 'cancelled' } : item),
    };
  }), [actualizar]);

  const responderSolicitud = useCallback((requestId, aceptar) => actualizar((actual) => {
    const request = actual.requests.find((item) => item.id === requestId);
    const servicio = request && servicioPorId(actual, request.serviceId);
    if (!request || !servicio || request.status !== 'pending' || servicio.ownerId !== actual.currentUserId) {
      throw new Error('La solicitud ya no esta disponible.');
    }
    if (!aceptar) {
      return { ...actual, requests: actual.requests.map((item) => item.id === requestId ? { ...item, status: 'rejected' } : item) };
    }

    const requester = usuarioPorId(actual, request.requesterId);
    if (!requester || requester.credits < 1) throw new Error('El solicitante no tiene creditos suficientes.');
    if (actual.exchanges.some((exchange) => {
      if (exchange.status !== 'accepted') return false;
      const reservado = servicioPorId(actual, exchange.serviceId);
      return reservado?.ownerId === servicio.ownerId && reservado.date === servicio.date && reservado.time === servicio.time;
    })) {
      throw new Error('Este horario ya fue reservado por otra solicitud.');
    }

    const siguiente = {
      ...actual,
      users: actual.users.map((user) => user.id === requester.id
        ? { ...user, credits: user.credits - 1, reserved: user.reserved + 1 }
        : user),
      requests: actual.requests.map((item) => item.id === requestId ? { ...item, status: 'accepted' } : item),
      exchanges: [{ id: crearId('exchange'), requestId, serviceId: servicio.id, requesterId: requester.id, providerId: servicio.ownerId, status: 'accepted', createdAt: new Date().toISOString() }, ...actual.exchanges],
    };
    registrarMovimiento(siguiente, requester.id, 0, `1 credito reservado: ${servicio.title}`, 'reserved');
    return siguiente;
  }), [actualizar]);

  const cancelarIntercambio = useCallback((exchangeId) => actualizar((actual) => {
    const exchange = actual.exchanges.find((item) => item.id === exchangeId);
    if (!exchange || exchange.status !== 'accepted') throw new Error('El intercambio ya no esta activo.');
    const servicio = servicioPorId(actual, exchange.serviceId);
    const siguiente = {
      ...actual,
      users: actual.users.map((user) => user.id === exchange.requesterId
        ? { ...user, credits: user.credits + 1, reserved: Math.max(0, user.reserved - 1) }
        : user),
      exchanges: actual.exchanges.map((item) => item.id === exchangeId ? { ...item, status: 'cancelled' } : item),
      requests: actual.requests.map((item) => item.id === exchange.requestId ? { ...item, status: 'cancelled' } : item),
    };
    registrarMovimiento(siguiente, exchange.requesterId, 1, `Credito devuelto: ${servicio?.title || 'intercambio'}`);
    return siguiente;
  }), [actualizar]);

  const completarIntercambio = useCallback((exchangeId) => actualizar((actual) => {
    const exchange = actual.exchanges.find((item) => item.id === exchangeId);
    if (!exchange || exchange.status !== 'accepted') throw new Error('El intercambio ya no esta activo.');
    const servicio = servicioPorId(actual, exchange.serviceId);
    const siguiente = {
      ...actual,
      users: actual.users.map((user) => {
        if (user.id === exchange.requesterId) return { ...user, reserved: Math.max(0, user.reserved - 1) };
        if (user.id === exchange.providerId) return { ...user, credits: user.credits + 1 };
        return user;
      }),
      exchanges: actual.exchanges.map((item) => item.id === exchangeId ? { ...item, status: 'completed', completedAt: new Date().toISOString() } : item),
    };
    registrarMovimiento(siguiente, exchange.requesterId, -1, `Intercambio completado: ${servicio?.title || 'servicio'}`);
    registrarMovimiento(siguiente, exchange.providerId, 1, `Credito recibido: ${servicio?.title || 'servicio'}`);
    return siguiente;
  }), [actualizar]);

  const guardarPerfil = useCallback((cambios) => actualizar((actual) => ({
    ...actual,
    users: actual.users.map((user) => user.id === actual.currentUserId ? { ...user, ...cambios } : user),
  })), [actualizar]);

  const guardarCategoria = useCallback((id, categoria) => actualizar((actual) => id
    ? { ...actual, categories: actual.categories.map((item) => item.id === id ? { ...item, ...categoria } : item) }
    : { ...actual, categories: [...actual.categories, { ...categoria, id: crearId('category') }] }), [actualizar]);

  const eliminarCategoria = useCallback((id) => actualizar((actual) => {
    const categoria = actual.categories.find((item) => item.id === id);
    return {
      ...actual,
      categories: actual.categories.filter((item) => item.id !== id),
      services: actual.services.map((service) => service.category === categoria?.name ? { ...service, category: 'Sin categoria' } : service),
    };
  }), [actualizar]);

  const guardarHabilidad = useCallback((id, habilidad) => actualizar((actual) => id
    ? { ...actual, skills: actual.skills.map((item) => item.id === id && item.ownerId === actual.currentUserId ? { ...item, ...habilidad } : item) }
    : { ...actual, skills: [...actual.skills, { ...habilidad, id: crearId('skill'), ownerId: actual.currentUserId }] }), [actualizar]);

  const eliminarHabilidad = useCallback((id) => actualizar((actual) => ({
    ...actual,
    skills: actual.skills.filter((item) => !(item.id === id && item.ownerId === actual.currentUserId)),
  })), [actualizar]);

  const alternarFavorito = useCallback((serviceId) => actualizar((actual) => ({
    ...actual,
    favorites: actual.favorites.includes(serviceId)
      ? actual.favorites.filter((id) => id !== serviceId)
      : [serviceId, ...actual.favorites],
  })), [actualizar]);

  const guardarCalificacion = useCallback((exchangeId, rating, comment) => actualizar((actual) => {
    const exchange = actual.exchanges.find((item) => item.id === exchangeId);
    if (!exchange || exchange.status !== 'completed') throw new Error('Solo puedes calificar intercambios completados.');
    const existente = actual.reviews.find((review) => review.exchangeId === exchangeId && review.reviewerId === actual.currentUserId);
    const review = { id: existente?.id || crearId('review'), exchangeId, serviceId: exchange.serviceId, reviewerId: actual.currentUserId, rating, comment, createdAt: new Date().toISOString() };
    return { ...actual, reviews: existente
      ? actual.reviews.map((item) => item.id === existente.id ? review : item)
      : [review, ...actual.reviews] };
  }), [actualizar]);

  const eliminarCalificacion = useCallback((id) => actualizar((actual) => ({
    ...actual,
    reviews: actual.reviews.filter((item) => item.id !== id || item.reviewerId !== actual.currentUserId),
  })), [actualizar]);

  const crearReporte = useCallback((serviceId, description) => actualizar((actual) => ({
    ...actual,
    reports: [{ id: crearId('report'), serviceId, reporterId: actual.currentUserId, description, status: 'pending', createdAt: new Date().toISOString() }, ...actual.reports],
  })), [actualizar]);

  const actualizarReporte = useCallback((id, status) => actualizar((actual) => ({
    ...actual,
    reports: status === 'deleted'
      ? actual.reports.filter((item) => item.id !== id)
      : actual.reports.map((item) => item.id === id ? { ...item, status } : item),
  })), [actualizar]);

  const eliminarUsuario = useCallback((id) => actualizar((actual) => {
    if (id === actual.currentUserId) throw new Error('No puedes eliminar la cuenta activa desde la vista de administracion.');
    if (actual.exchanges.some((exchange) => exchange.status === 'accepted' && (exchange.requesterId === id || exchange.providerId === id))) {
      throw new Error('No puedes eliminar un usuario con un intercambio pendiente.');
    }
    const serviciosUsuario = actual.services.filter((service) => service.ownerId === id).map((service) => service.id);
    return {
      ...actual,
      users: actual.users.filter((user) => user.id !== id),
      services: actual.services.filter((service) => service.ownerId !== id),
      requests: actual.requests.map((request) => serviciosUsuario.includes(request.serviceId) && request.status === 'pending'
        ? { ...request, status: 'cancelled' }
        : request),
      favorites: actual.favorites.filter((serviceId) => !serviciosUsuario.includes(serviceId)),
    };
  }), [actualizar]);

  const value = {
    datos,
    cargando,
    usuarioActual: usuarioPorId(datos, datos.currentUserId),
    agregarServicio,
    guardarServicio,
    eliminarServicio,
    eliminarServicioAdministrador,
    cambiarEstadoServicio,
    solicitarServicio,
    cancelarSolicitud,
    responderSolicitud,
    cancelarIntercambio,
    completarIntercambio,
    guardarPerfil,
    guardarCategoria,
    eliminarCategoria,
    guardarHabilidad,
    eliminarHabilidad,
    alternarFavorito,
    guardarCalificacion,
    eliminarCalificacion,
    crearReporte,
    actualizarReporte,
    eliminarUsuario,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useAppData = () => {
  const data = useContext(DataContext);
  if (!data) throw new Error('useAppData debe usarse dentro de LocalDataProvider.');
  return data;
};

export const mostrarError = (error) => {
  Alert.alert('No se pudo completar la accion', error.message || 'Intenta de nuevo.');
};

export const confirmarAccion = (titulo, mensaje, confirmar, textoConfirmar = 'Eliminar') => {
  if (Platform.OS === 'web') {
    if (globalThis.confirm(`${titulo}\n\n${mensaje}`)) confirmar();
    return;
  }

  Alert.alert(titulo, mensaje, [
    { text: 'Cancelar', style: 'cancel' },
    { text: textoConfirmar, style: 'destructive', onPress: confirmar },
  ]);
};
