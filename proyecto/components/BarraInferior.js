import { View, Text, StyleSheet } from 'react-native';
import { Icono } from './Icono';
import { colores } from './tema';

export const BarraInferior = ({ iconos = ['home', 'volver'] }) => {
  return (
    <View style={s.barra}>
      {iconos.map((nombre, i) => (
        <View key={`${nombre}-${i}`} style={s.boton}>
          <Icono nombre={nombre} tam={24} />
          <Text style={s.etiqueta}>
            {nombre === 'home' ? 'Menú' : nombre === 'volver' ? 'Volver' : nombre === 'puerta' ? 'Salir' : nombre === 'usuario' ? 'Perfil' : nombre === 'corazon' ? 'Favoritos' : 'Servicios'}
          </Text>
        </View>
      ))}
    </View>
  );
};
const s = StyleSheet.create({
  barra: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10, paddingBottom: 8, backgroundColor: colores.blanco, borderTopWidth: 1, borderTopColor: '#E7ECF3' },
  boton: { minWidth: 56, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 12 },
  etiqueta: { color: colores.marino, fontSize: 10, fontWeight: '600', marginTop: 3 },
});
