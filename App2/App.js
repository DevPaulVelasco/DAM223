//Zona de importaciones

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, } from 'react-native';
import {Saludo} from './componentes/Saludo';
import { Saludo2 } from './componentes/Saludo2';


//Zona numero 2 "MAIN"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola Mundo React Native</Text>
      <Image source={require('./assets/favicon.png')}></Image>
      <Saludo></Saludo>
      <StatusBar style="auto" />
    </View>
  );
}

//ZONA DE ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
