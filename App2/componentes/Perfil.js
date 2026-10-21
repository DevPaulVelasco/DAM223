import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'; 


export const Perfil = ({ nombre, carrera, materia, cuatrimestre, style }) => {
  const [mostrar, setMostrar] = useState(false);

  return (

    <View style={[styles.tarjeta, style]}>
      <Text style={styles.nombres}>{nombre}</Text>
      
      {mostrar && (
        <>
          <Text style={styles.carrera}>{carrera}</Text>
          <Text style={styles.carrera}>{materia}</Text>
          <Text style={styles.otroTexto}>{cuatrimestre}</Text>
        </>
      )}
      
      <Button 
        title={mostrar ? "Ocultar Perfil" : "Ver Perfil"} 
        onPress={() => setMostrar(!mostrar)} 
        color="#0f87f0" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nombres: {
    fontSize: 24,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'white',
  },
  carrera: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: 'white',
  },
  otroTexto: {
    fontSize: 20,
    fontFamily: 'Courier',
    color: 'white',
    fontStyle: 'italic',
  },
  tarjeta: {
    borderWidth: 4,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    backgroundColor: '#d41616', 
  },
});
