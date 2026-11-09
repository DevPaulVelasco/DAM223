import { Pressable, Text } from 'react-native';
import { colores } from './tema';
export const Enlace = ({ texto, style, onPress }) => (
  <Pressable onPress={onPress} accessibilityRole="button">
    <Text style={[{ color: colores.boton,
    fontWeight: 'bold', 
    fontSize: 14, 
    textAlign: 'center', 
    marginVertical: 6 }, style]}>{texto}</Text>
  </Pressable>
);
