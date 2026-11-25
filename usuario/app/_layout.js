import {Stack} from "expo-router";
export default function RootLayout(){
    return (
        
        <Stack>
        <Stack.Screen
            name="(tabs)"
            Options={{headerShown:false}}
        />
        
        <Stack.Screen
            name="detalle"
            Options={{title:"Detalle de usuario"}}
        />
        
        <Stack.Screen
            name="actualiza"
            Options={{title:"Cambios del usuario"}}
        />

        </Stack>
    );
    
}