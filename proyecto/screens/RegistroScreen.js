import { useState } from 'react';
import { Alert, View } from 'react-native';
import { PantallaAuth, Campo, Boton, Enlace } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function RegistroScreen() {
  const { irAlInicio, regresar } = useNavigation();
  const { guardarPerfil } = useAppData();
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [carrera, setCarrera] = useState('');
  const [correo, setCorreo] = useState('');
  const [sobreMi, setSobreMi] = useState('');

  const registrar = async () => {
    if (!nombre.trim() || !correo.trim()) {
      Alert.alert('Faltan datos', 'Agrega tu nombre y correo para crear el perfil.');
      return;
    }
    try {
      await guardarPerfil({ name: nombre.trim(), age: edad.trim(), degree: carrera.trim(), email: correo.trim(), about: sobreMi.trim() });
      irAlInicio();
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaAuth>
      <Campo placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <Campo placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" />
      <Campo placeholder="Carrera" value={carrera} onChangeText={setCarrera} />
      <Campo placeholder="Correo electronico" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" />
      <Campo placeholder="Sobre mi" value={sobreMi} onChangeText={setSobreMi} multiline />
      <View style={{ marginTop: 16 }}>
        <Boton titulo="GUARDAR PERFIL" onPress={registrar} />
        <Enlace texto="Regresar al inicio de sesión" onPress={regresar} />
      </View>
    </PantallaAuth>
  );
}
