import { Text, View } from 'react-native';
import { PantallaBase, Avatar, colores, EditarEliminar } from '../components';
import { useNavigation } from '../navigation';
import { confirmarAccion, mostrarError, useAppData } from '../appData';

export default function CalificacionesScreen() {
  const { navegar } = useNavigation();
  const { datos, eliminarCalificacion } = useAppData();
  const reseñas = datos.reviews.filter((review) => {
    const service = datos.services.find((item) => item.id === review.serviceId);
    return service?.ownerId === datos.currentUserId;
  });
  const promedio = reseñas.length
    ? (reseñas.reduce((suma, review) => suma + review.rating, 0) / reseñas.length).toFixed(1)
    : '—';

  const borrar = (id) => confirmarAccion('Eliminar calificacion', '¿Quieres eliminar esta reseña?', async () => {
      try {
        await eliminarCalificacion(id);
      } catch (error) {
        mostrarError(error);
      }
    });

  return (
    <PantallaBase titulo="Calificaciones">
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colores.blanco, borderRadius: 16, padding: 16, marginBottom: 8 }}>
        <View><Text style={{ color: '#75839A', fontSize: 11 }}>PROMEDIO</Text><Text style={{ color: colores.marino, fontSize: 20, fontWeight: '700' }}>★ {promedio}</Text></View>
        <View><Text style={{ color: '#75839A', fontSize: 11 }}>TOTAL</Text><Text style={{ color: colores.marino, fontSize: 20, fontWeight: '700' }}>{reseñas.length}</Text></View>
      </View>
      {reseñas.map((review) => {
        const service = datos.services.find((item) => item.id === review.serviceId);
        const autor = datos.users.find((user) => user.id === review.reviewerId);
        return (
          <View key={review.id} style={{ borderWidth: 1, borderColor: '#E5EBF3', backgroundColor: colores.blanco, borderRadius: 16, padding: 14, marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar ancho={34} alto={34} />
              <Text style={{ flex: 1, color: colores.marino, fontSize: 12, fontWeight: '700', marginLeft: 8 }}>{service?.title || 'Servicio'} · {autor?.name || 'Usuario'}</Text>
              <Text style={{ color: colores.amarillo, fontWeight: 'bold' }}>★ {review.rating}/5</Text>
            </View>
            <Text style={{ color: colores.texto, fontSize: 14, lineHeight: 20, marginTop: 10 }}>{review.comment}</Text>
            {review.reviewerId === datos.currentUserId && (
              <EditarEliminar
                onEditar={() => navegar('CalificarScreen', { exchangeId: review.exchangeId })}
                onEliminar={() => borrar(review.id)}
              />
            )}
          </View>
        );
      })}
      {reseñas.length === 0 && <Text style={{ color: '#75839A', textAlign: 'center', marginTop: 20 }}>Las reseñas de tus servicios apareceran aqui cuando completes intercambios.</Text>}
    </PantallaBase>
  );
}
