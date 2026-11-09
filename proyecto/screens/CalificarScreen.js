import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { PantallaBase, Avatar, Campo, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function CalificarScreen({ exchangeId }) {
  const { reemplazar } = useNavigation();
  const { datos, guardarCalificacion } = useAppData();
  const intercambio = datos.exchanges.find((item) => item.id === exchangeId) ||
    datos.exchanges.find((item) => item.status === 'completed' && item.requesterId === datos.currentUserId);
  const servicio = intercambio && datos.services.find((item) => item.id === intercambio.serviceId);
  const calificacionExistente = intercambio && datos.reviews.find((review) => review.exchangeId === intercambio.id && review.reviewerId === datos.currentUserId);
  const [puntuacion, setPuntuacion] = useState(calificacionExistente?.rating || 5);
  const [comentario, setComentario] = useState(calificacionExistente?.comment || '');

  const guardar = async () => {
    if (!intercambio) {
      Alert.alert('No hay intercambio para calificar', 'Completa un intercambio antes de dejar una reseña.');
      return;
    }
    if (!comentario.trim()) {
      Alert.alert('Escribe una reseña', 'Cuéntale a la comunidad cómo fue el servicio.');
      return;
    }
    try {
      await guardarCalificacion(intercambio.id, puntuacion, comentario.trim());
      Alert.alert('Reseña guardada', 'Gracias por compartir tu experiencia.');
      reemplazar('IntercambiosScreen');
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase titulo="Calificar servicio">
      {intercambio && (
        <View style={{ backgroundColor: colores.blanco, borderRadius: 16, alignItems: 'center', padding: 18, marginBottom: 14 }}>
          <Avatar ancho={68} alto={68} />
          <Text style={{ color: colores.marino, fontWeight: '700', fontSize: 16, marginTop: 10 }}>{servicio?.title || 'Servicio'}</Text>
          <Text style={{ color: '#75839A', fontSize: 12, marginTop: 4 }}>Intercambio en linea · 1 a 1</Text>
        </View>
      )}
      <Text style={{ color: colores.marino, fontWeight: '700', fontSize: 15, marginBottom: 10 }}>¿Como calificas la experiencia?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 18 }}>
        {[1, 2, 3, 4, 5].map((valor) => (
          <Pressable key={valor} onPress={() => setPuntuacion(valor)} accessibilityRole="button" accessibilityLabel={`${valor} estrellas`} style={{ padding: 8 }}>
            <Text style={{ color: valor <= puntuacion ? colores.amarillo : '#C9D1DD', fontSize: 34 }}>★</Text>
          </Pressable>
        ))}
      </View>
      <Campo
        placeholder="Escribe tu reseña..."
        value={comentario}
        onChangeText={setComentario}
        multiline
        textAlignVertical="top"
        style={{ minHeight: 140 }}
      />
      <Boton titulo={calificacionExistente ? 'ACTUALIZAR RESEÑA' : 'PUBLICAR RESEÑA'} color={colores.verde} pill={false} onPress={guardar} />
    </PantallaBase>
  );
}
