// Zona de importaciones
import { StyleSheet, View, Text, Button } from 'react-native'; 
import { useState } from 'react';
import SafeScreen from './SafeScreen';
import PressableScreen from './PressableScreen'; 
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackScreen  from './ImageBackScreen';
import ModalScreen from './ModalBottomScreen';




// Zona numero 2 "MAIN"
export default function MenuScreen() {
    const [screen, setscreen] = useState('menu');

    switch(screen) {
        case 'safe':
            return <SafeScreen />;
        case 'press':
            return <PressableScreen />;
        case 'tarjetas': 
            return <TarjetasScreen />;
        case 'text':
            return <TextScreen />;
        case 'flat':
            return <FlatListScreen />;
        case 'image': 
            return <ImageBackScreen />;
        case 'modal': 
            return <ModalBottomScreen/>;
        case 'activity':
            return <ActivityIndicatorScreen/>;
        case 'menu':
        default:
            return (
                <View style={styles.container}>
                    <Text style={{ color: '#fff' }}>Menu de Practicas</Text>
                    
                    <Button title="Practica Tarjetas" onPress={() => setscreen('tarjetas')} />
                    
                    <Button title="Practica SafeAreaView" onPress={() => setscreen('safe')} />
                    
                    <Button title="Practica Pressable" onPress={() => setscreen('press')} />

                    <Button title="Practica ActivityIndicator" onPress={() => setscreen('activity')}/>
                    
                    <Button title="Practica FlatList" onPress={() => setscreen('flatList')} />
                    
                    <Button title="Practica ImageBack" onPress={() => setscreen('imageback')} />
                    
                    <Button title="Practica Modal Bottom" onPress={() => setscreen('modal')} />
                    
                    <Button title="Practica TextInput" onpPress={() => setscreen(text)}/>

                </View>
            );
    }
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
