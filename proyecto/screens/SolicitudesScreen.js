import { Alert, Text, View } from 'react-native';
import { PantallaBase, Avatar, Boton, colores } from '../components';
import { mostrarError, useAppData } from '../appData';

export default function SolicitudesScreen({ modo }) {
  const { datos, responderSolicitud, cancelarSolicitud } = useAppData();
  const entrantes = datos.requests.filter((request) => {
    const service = datos.services.find((item) => item.id === request.serviceId);
    return service?.ownerId === datos.currentUserId && request.status === 'pending';
  });
  const enviadas = datos.requests.filter((request) => request.requesterId === datos.currentUserId && request.status === 'pending');
  const mostrarEntrantes = modo !== 'enviadas';
  const mostrarEnviadas = modo === 'enviadas' || !modo;

  const responder = async (id, aceptar) => {
    try {
      await responderSolicitud(id, aceptar);
      Alert.alert(aceptar ? 'Solicitud aceptada' : 'Solicitud rechazada', aceptar
        ? 'Se reservo 1 credito para el intercambio.'
        : 'No se descontaron creditos.');
    } catch (error) {
      mostrarError(error);
    }
  };

  const cancelar = async (id) => {
    try {
      await cancelarSolicitud(id);
    } catch (error) {
      mostrarError(error);
    }
  };

  const TarjetaSolicitud = ({ request, entrante }) => {
    const servicio = datos.services.find((item) => item.id === request.serviceId);
    const otroUsuarioId = entrante ? request.requesterId : servicio?.ownerId;
    const otroUsuario = datos.users.find((user) => user.id === otroUsuarioId);
    if (!servicio) return null;

    return (
      <View style={{ borderWidth: 1, borderColor: '#E5EBF3', backgroundColor: colores.blanco, borderRadius: 16, padding: 14, marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar ancho={36} alto={36} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={{ color: colores.marino, fontSize: 13, fontWeight: '700' }}>{entrante ? 'Solicitud de' : 'Proveedor'} · {otroUsuario?.name || 'Usuario'}</Text>
            <Text style={{ color: '#75839A', fontSize: 12, marginTop: 3 }}>{servicio.title}</Text>
          </View>
        </View>
        <Text style={{ color: colores.texto, fontSize: 13, marginTop: 12 }}>{servicio.date} · {servicio.time} · En linea</Text>
        <Text style={{ color: colores.boton, fontSize: 12, fontWeight: '700', marginTop: 6 }}>Intercambio de servicio por servicio · 1 a 1</Text>
        {entrante ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Boton titulo="Aceptar" color={colores.verde} pill={false} onPress={() => responder(request.id, true)} />
            <Boton titulo="Rechazar" color={colores.rojo} pill={false} onPress={() => responder(request.id, false)} />
          </View>
        ) : (
          <Boton titulo="Cancelar solicitud" color={colores.rojo} pill={false} onPress={() => cancelar(request.id)} />
        )}
      </View>
    );
  };

  return (
    <PantallaBase titulo="Solicitudes">
      {mostrarEntrantes && (
        <>
          <Text style={{ color: colores.marino, fontSize: 16, fontWeight: '700', marginBottom: 10 }}>Solicitudes recibidas</Text>
          {entrantes.map((request) => <TarjetaSolicitud key={request.id} request={request} entrante />)}
          {entrantes.length === 0 && <Text style={{ color: '#75839A', marginBottom: 18 }}>No tienes solicitudes pendientes de tus servicios.</Text>}
        </>
      )}
      {mostrarEnviadas && (
        <>
          <Text style={{ color: colores.marino, fontSize: 16, fontWeight: '700', marginTop: 14, marginBottom: 10 }}>Solicitudes enviadas</Text>
          {enviadas.map((request) => <TarjetaSolicitud key={request.id} request={request} entrante={false} />)}
          {enviadas.length === 0 && <Text style={{ color: '#75839A' }}>No tienes solicitudes pendientes.</Text>}
        </>
      )}
    </PantallaBase>
  );
}
