// Zona de importaciones

import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuScreen from './screens/MenuScreen'


// Zona numero 2 "MAIN"
export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MenuScreen />
      </View>
    </SafeAreaProvider>
  );
}

// ZONA DE ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf7f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBoton: {
  color: 'black',
  fontSie: 18,
  fontWeight: 'bold',
  },

});
//hola hh