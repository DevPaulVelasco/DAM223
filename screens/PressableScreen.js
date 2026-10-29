// Zona de importaciones
import { useState} from 'react'
import { StyleSheet, View, Text, Switch, Pressable } from 'react-native'; 


// Zona numero 2 "MAIN"
export default function PressableScreen() {
    const [encendido, setEncendido] =useState(false);
    const [contador, setContador] = useState(0);

    return(
      <View style = {styles.container}>
        <Text style = {styles.titulo}>Practica Switch y Pressable</Text>
        <Switch
        value={encendido}
        onValueChange={(valor) => setEncendido(valor)}
        
        />

        <Text style={styles.texto}>El Switch esta: {encendido ?'Encendido' : 'Apagado'}</Text>
        
        <Pressable style = {styles.boton} onPress={()=> setContador(contador + 1)}>
          

        </Pressable>
        <Text style = {styles.textoBoton}>Presioname</Text>
        <Text style = {styles.texto}>Veces Precionado: {contador}</Text>
        


      </View>
    );

};

// ZONA DE ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4299f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:40,

  },

  texto:{
    fontSize: 18,
    marginVertical: 15,

  },

  boton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,


  },
  
});
