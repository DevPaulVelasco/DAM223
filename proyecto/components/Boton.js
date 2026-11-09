import { View, Text, StyleSheet } from 'react-native';
import { colores } from './tema';
export const Boton = ({ titulo, color = colores.boton, textoColor = '#fff', pill = true, style }) => (
  <View style={[s.b, { backgroundColor: color, borderRadius: pill ? 14 : 10 }, style]}>
    <Text style={[s.t, { color: textoColor }]}>{titulo}</Text>
  </View>
);
const s = StyleSheet.create({
  b: { minHeight: 48, paddingVertical: 13, paddingHorizontal: 24, alignSelf: 'center', justifyContent: 'center', marginVertical: 8, elevation: 2, shadowColor: '#243B63', shadowOpacity: 0.12, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  t: { fontWeight: '700', fontSize: 14, textAlign: 'center', letterSpacing: 0.2 },
});
