import { Pressable, Text, View } from 'react-native';
import { PantallaBase, Avatar, Dato, CajaTexto, Moneda, Boton, colores, Icono } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function UsarServicioScreen({ serviceId }) {
  const { navegar } = useNavigation();
  const { datos, usuarioActual, solicitarServicio, alternarFavorito } = useAppData();
  const servicio = datos.services.find((item) => item.id === serviceId) ||
    datos.services.find((item) => item.active && item.ownerId !== datos.currentUserId);
  const proveedor = servicio && datos.users.find((user) => user.id === servicio.ownerId);
  const esPropio = servicio?.ownerId === datos.currentUserId;
  const favorito = servicio && datos.favorites.includes(servicio.id);
  const solicitudActiva = servicio && datos.requests.some((request) =>
    request.serviceId === servicio.id && request.requesterId === datos.currentUserId && ['pending', 'accepted'].includes(request.status));

  if (!servicio || !proveedor) {
    return <PantallaBase titulo="Servicio no disponible"><Text>Este servicio ya no esta disponible.</Text></PantallaBase>;
  }

  const pedir = async () => {
    try {
      await solicitarServicio(servicio.id);
      navegar('SolicitudesScreen', { modo: 'enviadas' });
    } catch (error) {
      mostrarError(error);
    }
  };

  const favoritoPress = async () => {
    try {
      await alternarFavorito(servicio.id);
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase
      titulo={servicio.title}
      derecha={!esPropio ? (
        <Pressable onPress={favoritoPress} accessibilityRole="button" accessibilityLabel={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
          <Text style={{ color: favorito ? colores.rojo : colores.boton, fontSize: 24 }}>{favorito ? '♥' : '♡'}</Text>
        </Pressable>
      ) : null}
    >
      <Pressable onPress={() => navegar('PerfilOtrosScreen', { userId: proveedor.id })} style={{ backgroundColor: colores.blanco, borderRadius: 18, alignItems: 'center', paddingVertical: 16, marginBottom: 12 }}>
        <Avatar ancho={76} alto={76} />
        <Text style={{ color: colores.marino, fontWeight: '700', marginTop: 8 }}>{proveedor.name}</Text>
        <Text style={{ color: '#75839A', fontSize: 12 }}>Ver perfil del proveedor</Text>
      </Pressable>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Dato etiqueta="CATEGORIA" valor={servicio.category} grande />
        <View><Dato etiqueta="INTERCAMBIO" valor="1 a 1" /><Text style={{ color: '#75839A', fontSize: 12, marginTop: 4 }}>Un servicio por otro</Text></View>
      </View>
      <CajaTexto etiqueta="DESCRIPCION" texto={servicio.description} style={{ marginTop: 14 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Dato etiqueta="FECHA" valor={servicio.date} />
        <Dato etiqueta="HORA" valor={servicio.time} />
      </View>
      <Dato etiqueta="MODALIDAD" valor="En linea" style={{ marginTop: 12 }} />
      {esPropio
        ? <Text style={{ color: '#75839A', textAlign: 'center', marginVertical: 12 }}>Este es tu servicio publicado.</Text>
        : solicitudActiva
          ? <Text style={{ color: colores.verde, textAlign: 'center', fontWeight: '700', marginVertical: 12 }}>Ya tienes una solicitud pendiente para este servicio.</Text>
          : <Boton titulo="SOLICITAR SERVICIO" color={colores.verde} pill={false} onPress={pedir} />}
      {!esPropio && <Boton titulo="REPORTAR SERVICIO" color={colores.rojo} pill={false} onPress={() => navegar('CrearReporteScreen', { serviceId: servicio.id })} />}
      <Moneda valor={usuarioActual.credits} />
    </PantallaBase>
  );
}
