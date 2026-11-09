import { Text, View } from 'react-native';
import { PantallaBase, Avatar, colores } from '../components';
import { useAppData } from '../appData';

export default function ResenasScreen() {
  const { datos } = useAppData();
  const reseñas = datos.reviews.filter((review) => {
    const service = datos.services.find((item) => item.id === review.serviceId);
    return review.reviewerId === datos.currentUserId || service?.ownerId === datos.currentUserId;
  });

  return (
    <PantallaBase titulo="Reseñas">
      {reseñas.map((review) => {
        const service = datos.services.find((item) => item.id === review.serviceId);
        const reviewer = datos.users.find((user) => user.id === review.reviewerId);
        return (
          <View key={review.id} style={{ borderWidth: 1, borderColor: '#E5EBF3', backgroundColor: colores.blanco, borderRadius: 16, padding: 14, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar ancho={34} alto={34} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={{ color: colores.marino, fontWeight: '700' }}>{service?.title || 'Servicio eliminado'}</Text>
                <Text style={{ color: '#75839A', fontSize: 12, marginTop: 3 }}>{reviewer?.name || 'Usuario'}</Text>
              </View>
              <Text style={{ color: colores.amarillo, fontWeight: '700' }}>★ {review.rating}/5</Text>
            </View>
            <Text style={{ color: colores.texto, fontSize: 14, lineHeight: 21, marginTop: 12 }}>{review.comment}</Text>
          </View>
        );
      })}
      {reseñas.length === 0 && <Text style={{ color: '#75839A', textAlign: 'center', marginTop: 20 }}>Aun no hay reseñas.</Text>}
    </PantallaBase>
  );
}
