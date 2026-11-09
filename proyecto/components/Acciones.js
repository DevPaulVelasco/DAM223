import { View, Text } from 'react-native';
import { Icono } from './Icono';
import { colores } from './tema';

export const Accion = ({ icono, texto, style }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
    <Icono nombre={icono} tam={18} />
    <Text style={{ fontSize: 12, 
      fontWeight: 'bold', 
      marginLeft: 6, 
      color: colores.texto }}>{texto}</Text>
  </View>
);

export const EditarEliminar = ({ style, onEditar, onEliminar }) => (
  <View style={[{ flexDirection: 'row', 
  alignSelf: 'flex-end',
   marginTop: 6 }, 
   style]}>
    <Accion icono="lapiz" texto="Editar" onPress={onEditar} />
    <Accion icono="basura" texto="Eliminar" onPress={onEliminar} style={{ marginLeft: 18 }} />
  </View>
);
