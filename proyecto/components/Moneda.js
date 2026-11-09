import { View, Text } from 'react-native';
import { Icono } from './Icono';
export const Moneda = ({ valor, tam = 20 }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icono nombre="moneda" tam={tam} style={{ marginRight: 6 }} />
    <Text style={{ fontSize: tam, fontWeight: '900' }}>{valor}</Text>
  </View>
);
