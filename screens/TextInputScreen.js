// Zona de importaciones
import { StyleSheet, View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import { useState } from 'react';

const mostrarAlerta = (titulo, mensaje) => {
  if (Platform.OS === 'web') {
    window.alert(`${titulo} \n\n ${mensaje}`);
  } else {
    Alert.alert(titulo, mensaje);
  }
};

// Zona numero 2 "MAIN"
export default function TextInputScreen() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const registrar = () => {
    const faltantes = [];

    if (nombre.trim() === '') faltantes.push('Nombre');
    if (correo.trim() === '') faltantes.push('Correo');
    if (telefono.trim() === '') faltantes.push('Telefono');

    if (faltantes.length > 0) {
      mostrarAlerta('Faltan datos', 'Completa: ' + faltantes.join(', '));
      return;
    }

    if (!correo.includes('@')) {
      mostrarAlerta('Correo Invalido', 'El correo debe tener el formato correcto');
      return;
    }

    if (telefono.length !== 10) {
      mostrarAlerta('Telefono Invalido', 'Debe tener 10 digitos');
      return;
    }

    mostrarAlerta('Datos Registrados correctamente', `Nombre: ${nombre} \n Correo: ${correo} \n Telefono: ${telefono}`);
    setNombre('');
    setCorreo('');
    setTelefono('');
  };

  return(
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de datos</Text>
      <TextInput
      style={styles.input}  
      placeholder='Nombre'
      value={nombre}
      onChangeText={setNombre}
      />
      <TextInput
      style={styles.input}
      placeholder='Correo'
      value={correo}
      onChangeText={setCorreo}
      keyboardType='email-address'
      autoCapitalize='none'
      />
      <TextInput
      style={styles.input}
      placeholder='Telefono'
      value={telefono}
      onChangeText={setTelefono}
      keyboardType='numeric'
      maxLength={10}
      />

      <Button title='Registrar' onPress={registrar}/>

    </View>
  )

  
}

// ZONA DE ESTILOS
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    padding: 20,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center'
  },

  titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,

    },

    input:{
      borderWidth: 1,
      borderColor: "#ffffff",
      borderRadius: 15,
      padding: 10,
      marginBottom: 2,


    },

  
});
