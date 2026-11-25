import { Tabs } from "expo-router";
export default function TabsLayout(){
    return(
    <Tabs>
        <Tabs.Screen
            name= "index"
            options={{title:"Inicio", href: null}}
        />
        <Tabs.Screen
            name= "alta" //Nombre de los archivos
            options={{title:"Formulario "}} //Nombre que debe de salir en la etiqueta
        />
        <Tabs.Screen
            name= "consulta"
            options={{title:"Listado"}}
        />
    </Tabs>
    );
}