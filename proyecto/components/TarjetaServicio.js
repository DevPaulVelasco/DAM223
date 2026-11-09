import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colores } from './tema';
export const TarjetaServicio = ({ fecha, titulo, creditos = 2, style, onPress }) => {
  const contenido = (
    <>
      <Text style={s.fecha}>{fecha} <Text style={{ color: colores.amarillo }}>●</Text></Text>
      <Text style={s.titulo}>{titulo}</Text>
      <Text style={s.creditos}>{creditos} {creditos === 1 ? 'credito' : 'creditos'}</Text>
    </>
  );

  return onPress ? (
    <Pressable onPress={onPress} accessibilityRole="button" style={[s.tarjeta, style]}>{contenido}</Pressable>
  ) : (
    <View style={[s.tarjeta, style]}>{contenido}</View>
  );
};
const s = StyleSheet.create({
  tarjeta: { backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 16, padding: 16, marginVertical: 7, elevation: 1, shadowColor: '#243B63', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  fecha: { fontSize: 12, color: '#75839A', fontWeight: '600' },
  titulo: { fontSize: 16, color: colores.marino, fontWeight: '700', marginTop: 7 },
  creditos: { fontSize: 12, color: colores.boton, fontWeight: '700', alignSelf: 'flex-end', marginTop: 8 },
});
