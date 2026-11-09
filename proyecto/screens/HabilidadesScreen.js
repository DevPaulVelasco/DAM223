import { Pressable, Text, View } from 'react-native';
import { PantallaBase, colores, Boton } from '../components';
import { useNavigation } from '../navigation';
import { confirmarAccion, mostrarError, useAppData } from '../appData';

export default function HabilidadesScreen({ otros = false, userId }) {
  const { navegar } = useNavigation();
  const { datos, eliminarHabilidad } = useAppData();
  const ownerId = otros ? userId : datos.currentUserId;
  const lista = datos.skills.filter((skill) => skill.ownerId === ownerId);

  const borrar = (id) => confirmarAccion('Eliminar habilidad', '¿Quieres eliminar esta habilidad de tu perfil?', async () => {
      try {
        await eliminarHabilidad(id);
      } catch (error) {
        mostrarError(error);
      }
    });

  return (
    <PantallaBase titulo={otros ? 'Habilidades' : 'Mis habilidades'}>
      {lista.map((skill) => (
        <View key={skill.id} style={{ backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <Text style={{ color: colores.marino, fontWeight: '700', fontSize: 15 }}>{skill.name}</Text>
          <Text style={{ color: '#75839A', fontSize: 12, marginTop: 5 }}>Nivel: {skill.level}</Text>
          {!otros && (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Boton titulo="EDITAR" onPress={() => navegar('HabilidadFormScreen', { skillId: skill.id })} />
              <Boton titulo="ELIMINAR" color={colores.rojo} onPress={() => borrar(skill.id)} />
            </View>
          )}
        </View>
      ))}
      {!otros && <Boton titulo="AGREGAR HABILIDAD" onPress={() => navegar('HabilidadFormScreen')} />}
      {lista.length === 0 && <Text style={{ color: '#75839A', textAlign: 'center', marginTop: 16 }}>Todavia no hay habilidades registradas.</Text>}
    </PantallaBase>
  );
}
