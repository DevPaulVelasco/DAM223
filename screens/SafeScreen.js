// Zona de importaciones
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaEjemplo from '../componentes/SafeAreaEjemplo';
import ScrollViewEjemplo from '../componentes/ScrollViewEjemplo';
import { StyleSheet, Text } from 'react-native';


// Zona numero 2 "MAIN"
export default function SafeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'bottom', 'left']}>
        <Text>Aqui va la practica 10</Text>
        <Text>Equipo Dulce</Text>
        <SafeAreaEjemplo />
        <ScrollViewEjemplo />
    </SafeAreaView>
  );
}

// ZONA DE ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
