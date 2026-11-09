import { View, Text, StyleSheet } from 'react-native';
import { colores } from './tema';
import { Icono } from './Icono';

export const Seccion = ({ titulo, icono }) => (
  <View style={s.barra}>
    <Text style={s.texto}>{titulo}</Text>
    {icono ? <Icono nombre={icono} tam={20} /> : null}
  </View>
);
const s = StyleSheet.create({
  barra: { backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2, paddingVertical: 4, marginTop: 22, marginBottom: 10 },
  texto: { color: colores.marino,
     fontWeight: '800',
     fontSize: 16 },
});
