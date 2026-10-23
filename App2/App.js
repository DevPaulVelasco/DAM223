// Zona de importaciones

import { StyleSheet, View } from 'react-native'; 
import MenuScreen from './screens/MenuScreen'


// Zona numero 2 "MAIN"
export default function App() {
  return (
    <View style={styles.container}>
      <MenuScreen></MenuScreen>
  
    </View>
  );
}

// ZONA DE ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
