import { Image } from 'react-native';
import { imagenes } from './Icono';
export const Avatar = ({ ancho = 70, alto = 70 }) => (
  <Image source={imagenes.avatar} style={{ width: ancho, height: alto, resizeMode: 'cover', borderRadius: Math.min(ancho, alto) / 2 }} />
);
