// Zona de importaciones

import { StyleSheet, View } from 'react-native'; 


// Zona numero 2 "MAIN"
export default function PressableScreen() {
  return (
    <View style={styles.container}>
        <Text>Aqui va la practica 11</Text>
        <Text>Equipo Karen</Text>
  
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
