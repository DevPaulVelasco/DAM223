import { Text } from 'react-native';
import { colores } from './tema';
export const Encabezado = ({ texto, style }) => (
  <Text style={[{ fontSize: 21,
    fontWeight: '800',
    color: colores.marino,
    letterSpacing: 0.2 },
    style]}>{texto}</Text>
);
