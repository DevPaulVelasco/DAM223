import { Alert, Text, View } from 'react-native';
import { PantallaAuth, Campo, Boton, Enlace, Encabezado, colores } from '../components';
import { useNavigation } from '../navigation';

export default function RecuperarPassScreen() {
  const { regresar } = useNavigation();

  const enviar = () => Alert.alert(
    'Recuperacion no disponible',
    'Esta version guarda datos solo en este dispositivo y no tiene servidor de correo. El inicio de sesion de prueba no requiere contraseña.',
  );

  return (
    <PantallaAuth>
      <Encabezado texto="Recuperar contraseña" style={{ textAlign: 'center', marginBottom: 24 }} />
      <Campo placeholder="Correo electronico" keyboardType="email-address" autoCapitalize="none" />
      <View style={{ backgroundColor: colores.azulClaro, padding: 14, borderRadius: 12, marginTop: 4 }}>
        <Text style={{ color: colores.marino, fontSize: 13, lineHeight: 19 }}>
          Para enviar un correo de recuperacion se necesita conectar un servidor. En esta version puedes entrar sin contraseña.
        </Text>
      </View>
      <View style={{ marginTop: 22 }}>
        <Boton titulo="INFORMACION DE RECUPERACION" onPress={enviar} />
        <Enlace texto="Regresar al inicio de sesión" onPress={regresar} />
      </View>
    </PantallaAuth>
  );
}
