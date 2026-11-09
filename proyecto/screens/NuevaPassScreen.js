import { Text } from 'react-native';
import { PantallaAuth, Boton, colores } from '../components';
import { useNavigation } from '../navigation';

export default function NuevaPassScreen() {
  const { cerrarSesion } = useNavigation();

  return (
    <PantallaAuth>
      <Text style={{ color: colores.marino, fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 14 }}>Cambio de contraseña</Text>
      <Text style={{ color: '#75839A', fontSize: 14, lineHeight: 21, textAlign: 'center' }}>
        La app de prueba no valida ni guarda contraseñas. Para habilitar un cambio real se necesita conectar autenticacion.
      </Text>
      <Boton titulo="VOLVER AL INICIO DE SESION" onPress={cerrarSesion} />
    </PantallaAuth>
  );
}
