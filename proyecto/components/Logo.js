import { View } from 'react-native';
import { Icono } from './Icono';
export const Logo = ({ tam = 36 }) => (
  <View style={{ alignItems: 'center' }}>
    <Icono nombre="logo" ancho={tam * 6} alto={tam * 2} />
  </View>
);
