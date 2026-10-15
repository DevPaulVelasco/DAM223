import { useState } from 'react';
import { View, Button, Text, Image } from 'react-native';

export const Saludo2= ()=>{
    const [saludo, setSaludo] = useState('');

    return (
        <View>
        <Text>Hola React Native desde un componente propio compuesto</Text>
        <Image source={require('../assets/wave.png')} />
        <Button title="Presiona aquí para saludar" onPress={() => setSaludo('Hola Mundo React Native')} />
        {saludo ? <Text>{saludo}</Text> : null}
        </View>
    );
}