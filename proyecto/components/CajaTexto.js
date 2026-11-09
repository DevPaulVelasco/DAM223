import { View, Text, StyleSheet } from 'react-native';
import { colores } from './tema';
export const CajaTexto = ({ etiqueta, texto, style }) => (
  <View style={[s.caja, style]}>
    {etiqueta ? <Text style={s.etiqueta}>{etiqueta}</Text> : null}
    <Text style={s.texto}>{texto}</Text>
  </View>
);
const s = StyleSheet.create({
  caja: { borderWidth: 1, borderColor: '#E4EAF2', borderRadius: 14, backgroundColor: '#fff', padding: 14, marginVertical: 10 },
  etiqueta: { alignSelf: 'flex-start', 
    backgroundColor: 'transparent',
    color: colores.marino, 
    fontSize: 10,
     fontWeight: '700',
     paddingHorizontal: 0,
      marginBottom: 8 },
  texto: { fontSize: 14, lineHeight: 21, color: colores.texto },
});
