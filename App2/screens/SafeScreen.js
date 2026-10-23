// Zona de importaciones

import { StyleSheet, View, Text } from 'react-native'; 


// Zona numero 2 "MAIN"
export default function SafeScreen() {
  return (
    <View style={styles.container}>
        <Text>Aqui va la practica 10</Text>
        <Texto>Equipo Dulce</Texto>
  
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
