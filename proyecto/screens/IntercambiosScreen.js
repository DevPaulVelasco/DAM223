import { Text, View } from 'react-native';
import { PantallaBase, Moneda, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { confirmarAccion, mostrarError, useAppData } from '../appData';

export default function IntercambiosScreen() {
  const { navegar } = useNavigation();
  const { datos, completarIntercambio, cancelarIntercambio } = useAppData();
  const intercambios = datos.exchanges.filter((exchange) =>
    exchange.requesterId === datos.currentUserId || exchange.providerId === datos.currentUserId);

  const completar = async (id) => {
    try {
      await completarIntercambio(id);
      navegar('CalificarScreen', { exchangeId: id });
    } catch (error) {
      mostrarError(error);
    }
  };

  const cancelar = (id) => confirmarAccion('Cancelar intercambio', 'El credito reservado sera devuelto al solicitante.', async () => {
      try {
        await cancelarIntercambio(id);
      } catch (error) {
        mostrarError(error);
      }
    }, 'Cancelar intercambio');

  return (
    <PantallaBase titulo="Intercambios">
      {intercambios.map((exchange) => {
        const service = datos.services.find((item) => item.id === exchange.serviceId);
        const otherUserId = exchange.requesterId === datos.currentUserId ? exchange.providerId : exchange.requesterId;
        const otherUser = datos.users.find((user) => user.id === otherUserId);
        const calificacion = datos.reviews.find((review) => review.exchangeId === exchange.id && review.reviewerId === datos.currentUserId);
        const estado = exchange.status === 'accepted' ? 'PENDIENTE' : exchange.status === 'completed' ? 'COMPLETADO' : 'CANCELADO';

        return (
          <View key={exchange.id} style={{ backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 16, padding: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: exchange.status === 'accepted' ? colores.amarillo : colores.verde }}>{estado}</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colores.marino, marginTop: 8 }}>{service?.title || 'Servicio eliminado'}</Text>
            <Text style={{ fontSize: 12, color: '#75839A', marginTop: 6 }}>{exchange.status === 'accepted' ? 'Con' : 'Intercambio con'} {otherUser?.name || 'Usuario'} · En linea · 1 a 1</Text>
            <View style={{ alignSelf: 'flex-end', marginTop: 8 }}><Moneda valor="1" tam={14} /></View>
            {exchange.status === 'accepted' && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Boton titulo="Completar" color={colores.verde} pill={false} onPress={() => completar(exchange.id)} />
                <Boton titulo="Cancelar" color={colores.rojo} pill={false} onPress={() => cancelar(exchange.id)} />
              </View>
            )}
            {exchange.status === 'completed' && !calificacion && (
              <Boton titulo="Calificar intercambio" color={colores.boton} pill={false} onPress={() => navegar('CalificarScreen', { exchangeId: exchange.id })} />
            )}
            {calificacion && <Text style={{ color: colores.marino, marginTop: 6 }}>Tu calificacion: {calificacion.rating}/5</Text>}
          </View>
        );
      })}
      {intercambios.length === 0 && <Text style={{ color: '#75839A', textAlign: 'center', marginTop: 20 }}>Aun no tienes intercambios. Cuando acepten una solicitud, aparecera aqui.</Text>}
    </PantallaBase>
  );
}
