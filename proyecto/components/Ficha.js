import { View, Text, StyleSheet } from 'react-native';
import { colores } from './tema';
import { Icono } from './Icono';

export const Ficha = ({ texto, icono, grande }) => (
  <View style={[s.ficha, grande && { width: 90, height: 64 }]}>
    {icono ? <Icono nombre={icono} tam={34} /> : null}
    {texto ? <Text style={[s.texto, icono && { marginTop: 3 }]}>{texto}</Text> : null}
  </View>
);
const s = StyleSheet.create({
  ficha: { width: 76, height: 72, backgroundColor: colores.blanco, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginHorizontal: 6, elevation: 1, shadowColor: '#243B63', shadowOpacity: 0.06, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  texto: { color: colores.marino, fontWeight: '700', fontSize: 11, letterSpacing: 0.4 },
});
