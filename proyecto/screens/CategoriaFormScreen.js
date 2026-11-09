import { useState } from 'react';
import { Alert } from 'react-native';
import { PantallaBase, Campo, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function CategoriaFormScreen({ categoryId }) {
  const { reemplazar } = useNavigation();
  const { datos, guardarCategoria } = useAppData();
  const original = datos.categories.find((item) => item.id === categoryId);
  const [nombre, setNombre] = useState(original?.name || '');
  const [descripcion, setDescripcion] = useState(original?.description || '');

  const guardar = async () => {
    if (!nombre.trim()) {
      Alert.alert('Falta el nombre', 'Escribe un nombre para la categoria.');
      return;
    }
    if (datos.categories.some((item) => item.id !== categoryId && item.name.toLowerCase() === nombre.trim().toLowerCase())) {
      Alert.alert('Categoria duplicada', 'Ya existe una categoria con ese nombre.');
      return;
    }
    try {
      await guardarCategoria(categoryId, { name: nombre.trim(), description: descripcion.trim() });
      reemplazar('CategoriasScreen');
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase titulo={categoryId ? 'Editar categoria' : 'Nueva categoria'}>
      <Campo placeholder="Nombre de la categoria" value={nombre} onChangeText={setNombre} />
      <Campo placeholder="Descripcion" value={descripcion} onChangeText={setDescripcion} multiline style={{ minHeight: 100, textAlignVertical: 'top' }} />
      <Boton titulo="GUARDAR CATEGORIA" color={colores.verde} pill={false} onPress={guardar} />
    </PantallaBase>
  );
}
