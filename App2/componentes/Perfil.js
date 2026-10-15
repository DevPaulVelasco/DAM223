import { Text } from 'react-native';
import { Button } from 'react-native';
import { useState } from 'react';
export const Perfil = ({ nombre, carrera, materia, cuatrimestre }) => {

  const[mostrar,setMostrar]=useState(false);
  return (
    <>
      <Text>{nombre}</Text>
      { mostrar &&
      <>
      <Text>{carrera}</Text>
      <Text>{materia}</Text>
      <Text>{cuatrimestre}</Text>
      </>
      }
      <Button title="ver Perfil" onPress={()=>setMostrar(!mostrar)}></Button>
    </>
  );
};