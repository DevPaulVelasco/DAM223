import { View } from 'react-native';
import { PantallaAuth, Campo, Boton, Enlace } from '../components';
import { useNavigation } from '../navigation';

export default function LoginScreen() {
  const { navegar, irAlInicio } = useNavigation();

  return (
    <PantallaAuth>
      <Campo placeholder="Gmail..." keyboardType="email-address" autoCapitalize="none" />
      <Campo placeholder="Contraseña..." secure />
      <Enlace texto="Recuperar contraseña" onPress={() => navegar('RecuperarPassScreen')} style={{ textAlign: 'left', fontSize: 12 }} />
      <View style={{ marginTop: 20 }}>
        <Boton titulo="INICIAR SESIÓN" onPress={irAlInicio} />
        <Enlace texto="Regístrate" onPress={() => navegar('RegistroScreen')} />
      </View>
    </PantallaAuth>
  );
}
