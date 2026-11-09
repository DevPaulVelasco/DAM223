import { useState } from 'react';
import { Alert } from 'react-native';
import { PantallaBase, Campo, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function HabilidadFormScreen({ skillId }) {
  const { reemplazar } = useNavigation();
  const { datos, guardarHabilidad, eliminarHabilidad } = useAppData();
  const original = datos.skills.find((item) => item.id === skillId);
  const [nombre, setNombre] = useState(original?.name || '');
  const [nivel, setNivel] = useState(original?.level || 'Basico');

  const guardar = async () => {
    if (!nombre.trim() || !nivel.trim()) {
      Alert.alert('Faltan datos', 'Escribe la habilidad y su nivel.');
      return;
    }
    try {
      await guardarHabilidad(skillId, { name: nombre.trim(), level: nivel.trim() });
      reemplazar('HabilidadesScreen');
    } catch (error) {
      mostrarError(error);
    }
  };

  const borrar = async () => {
    try {
      await eliminarHabilidad(skillId);
      reemplazar('HabilidadesScreen');
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase titulo={skillId ? 'Editar habilidad' : 'Agregar habilidad'}>
      <Campo placeholder="Habilidad" value={nombre} onChangeText={setNombre} />
      <Campo placeholder="Nivel (Basico, Medio, Amplio)" value={nivel} onChangeText={setNivel} />
      <Boton titulo="GUARDAR" color={colores.verde} pill={false} onPress={guardar} />
      {skillId && <Boton titulo="ELIMINAR HABILIDAD" color={colores.rojo} pill={false} onPress={borrar} />}
    </PantallaBase>
  );
}
