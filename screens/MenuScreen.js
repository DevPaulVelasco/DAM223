import { StyleSheet, View, Text, Button } from 'react-native'; 
import { useState } from 'react';
import SafeScreen from './SafeScreen';
import PressableScreen from './PressableScreen'; 
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackScreen  from './ImageBackScreen';
import ModalScreen from './ModalBottomScreen';
import TextInputScreen from './TextInputScreen'; 

export default function MenuScreen() {
    const [screen, setscreen] = useState('menu');

    const regresarAlMenu = () => setscreen('menu');

    switch(screen) {
        case 'safe':
            return <SafeScreen />;
        case 'press':
            return <PressableScreen />;
        case 'tarjetas': 
            return <Text style={{color: '#fff'}}>Pantalla Tarjetas</Text>; 
        case 'text':
            return (
              <View style={{ flex: 1, width: '100%' }}>
                
                <TextInputScreen />
              </View>
            );
        case 'flat':
            return <FlatListScreen />;
        case 'image': 
            return <ImageBackScreen />;
        case 'modal': 
            return <ModalScreen/>;
        case 'activity':
            return <ActivityIndicatorScreen/>;
        case 'menu':
        default:
            return (
                <View style={styles.container}>
                    <Text style={styles.tituloMenu}>Menu de Practicas</Text>
                    
                    <Button title="Practica Tarjetas" onPress={() => setscreen('tarjetas')} />
                    
                    <Button title="Practica SafeAreaView" onPress={() => setscreen('safe')} />
                    
                    <Button title="Practica Pressable" onPress={() => setscreen('press')} />

                    <Button title="Practica ActivityIndicator" onPress={() => setscreen('activity')}/>
                    
                    <Button title="Practica FlatList" onPress={() => setscreen('flat')} />
                    
                    <Button title="Practica ImageBack" onPress={() => setscreen('image')} />
                    
                    <Button title="Practica Modal Bottom" onPress={() => setscreen('modal')} />
                    
                    <Button title="Practica TextInput" onPress={() => setscreen('text')}/>

                </View>
            );
    }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  tituloMenu: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  }
});
