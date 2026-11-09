import { Pressable, Text } from 'react-native';
import { PantallaBase, Avatar, colores } from '../components';
import { useNavigation } from '../navigation';
import { useAppData } from '../appData';

export default function GestionUsuariosScreen() {
  const { navegar } = useNavigation();
  const { datos } = useAppData();

  return (
    <PantallaBase titulo="Gestion de usuarios">
      {datos.users.map((user) => (
        <Pressable key={user.id} style={{ backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 14, flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 10 }} onPress={() => navegar('GestionUsuarioScreen', { userId: user.id })}>
          <Avatar ancho={44} alto={44} />
          <Text style={{ color: colores.marino, fontSize: 15, fontWeight: '700', marginLeft: 12, flex: 1 }}>{user.name}</Text>
          <Text style={{ color: '#75839A', fontSize: 12 }}>{user.credits} creditos ›</Text>
        </Pressable>
      ))}
    </PantallaBase>
  );
}
