import { useState } from 'react';
import { Alert, View } from 'react-native';
import { PantallaBase, Avatar, Campo, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function EditarUsuarioScreen() {
  const { reemplazar, cerrarSesion } = useNavigation();
  const { usuarioActual, guardarPerfil } = useAppData();
  const [nombre, setNombre] = useState(usuarioActual.name);
  const [edad, setEdad] = useState(usuarioActual.age);
  const [carrera, setCarrera] = useState(usuarioActual.degree);
  const [correo, setCorreo] = useState(usuarioActual.email);
  const [sobreMi, setSobreMi] = useState(usuarioActual.about);

  const guardar = async () => {
    if (!nombre.trim()) {
      Alert.alert('Falta el nombre', 'Escribe tu nombre para guardar el perfil.');
      return;
    }
    try {
      await guardarPerfil({ name: nombre.trim(), age: edad.trim(), degree: carrera.trim(), email: correo.trim(), about: sobreMi.trim() });
      reemplazar('PerfilScreen');
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase titulo="Editar perfil">
      <View style={{ backgroundColor: colores.blanco, borderRadius: 18, alignItems: 'center', paddingVertical: 16, marginBottom: 16 }}>
        <Avatar ancho={90} alto={90} />
      </View>
      <Campo placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <Campo placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" />
      <Campo placeholder="Carrera" value={carrera} onChangeText={setCarrera} />
      <Campo placeholder="Correo electronico" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" />
      <Campo placeholder="Sobre mi" value={sobreMi} onChangeText={setSobreMi} multiline textAlignVertical="top" style={{ minHeight: 100 }} />
      <Boton titulo="GUARDAR PERFIL" color={colores.verde} pill={false} onPress={guardar} />
      <Boton titulo="CERRAR SESION" color={colores.rojo} pill={false} onPress={cerrarSesion} />
    </PantallaBase>
  );
}
