// Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native'; 
import { Perfil } from './componentes/Perfil';

// Zona numero 2 "MAIN"
export default function App() {
  return (
    <View style={styles.container}>
  
      <Perfil nombre="Paul" carrera="TIID" materia="APPS MOVILES" cuatrimestre="4to Cuatrimestre" style={styles.tarjeta1}></Perfil>
      <Perfil nombre="Miguel" carrera="TIID" materia="APPS MOVILES" cuatrimestre="4to Cuatrimestre" style={styles.tarjeta2}></Perfil>
      <Perfil nombre="Iancarlo" carrera="TIID" materia="PROGRAMACIÓN" cuatrimestre="4to Cuatrimestre" style={styles.tarjeta3}></Perfil>
      <StatusBar style="auto" />
    </View>
  );
}

// ZONA DE ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4e4d4d',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tarjeta1: { 
    backgroundColor: 'pink' 
  },
  tarjeta2: { 
    backgroundColor: 'orange' 
  },
  tarjeta3: { 
    backgroundColor: 'green' 
  }
});
