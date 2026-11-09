import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colores } from './tema';
import { Icono } from './Icono';

export const FilaLista = ({ titulo, detalle, acciones = ['lapiz', 'basura'], onPress }) => {
  const contenido = (
    <>
      <View style={{ flex: 1 }}>
        <Text style={s.titulo}>{titulo}</Text>
        {detalle ? <Text style={s.detalle}>{detalle}</Text> : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {acciones.map((a, i) => <Icono key={i} nombre={a} tam={26} style={{ marginLeft: 14 }} />)}
      </View>
    </>
  );

  return onPress
    ? <Pressable style={s.fila} onPress={onPress} accessibilityRole="button">{contenido}</Pressable>
    : <View style={s.fila}>{contenido}</View>;
};
const s = StyleSheet.create({
  fila: { backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15, marginBottom: 10 },
  titulo: { color: colores.marino, fontSize: 15, fontWeight: '700' },
  detalle: { color: '#75839A', fontSize: 12, fontWeight: '600', marginTop: 5 },
});
