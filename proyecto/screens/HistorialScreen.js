import { Text, View } from 'react-native';
import { PantallaBase, Avatar, Moneda, TarjetaServicio, colores } from '../components';
import { useAppData } from '../appData';
import { useNavigation } from '../navigation';

export default function HistorialScreen({ userId }) {
  const { navegar } = useNavigation();
  const { datos } = useAppData();
  const usuario = datos.users.find((item) => item.id === userId) || datos.users.find((item) => item.id === datos.currentUserId);
  const intercambios = datos.exchanges.filter((exchange) =>
    exchange.status === 'completed' && (exchange.requesterId === usuario?.id || exchange.providerId === usuario?.id));

  if (!usuario) return <PantallaBase titulo="Historial"><Text>Este usuario ya no existe.</Text></PantallaBase>;

  return (
    <PantallaBase titulo="Historial de usuario">
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colores.blanco, borderRadius: 16, padding: 14 }}>
        <Avatar ancho={60} alto={60} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ fontWeight: '800', fontSize: 15, color: colores.marino }}>{usuario.name}{'\n'}{usuario.age} AÑOS</Text>
          <View style={{ marginTop: 6 }}><Moneda valor={usuario.credits} tam={14} /></View>
        </View>
      </View>
      <Text style={{ fontSize: 12, fontWeight: '700', marginTop: 20, color: colores.marino }}>INTERCAMBIOS COMPLETADOS</Text>
      {intercambios.map((exchange) => {
        const service = datos.services.find((item) => item.id === exchange.serviceId);
        return (
          <TarjetaServicio
            key={exchange.id}
            fecha={new Date(exchange.completedAt).toLocaleDateString('es-MX')}
            titulo={service?.title || 'Servicio eliminado'}
            creditos={1}
            onPress={() => navegar('IntercambiosScreen')}
          />
        );
      })}
      {intercambios.length === 0 && <Text style={{ color: '#75839A', marginTop: 12 }}>Aun no hay intercambios completados.</Text>}
    </PantallaBase>
  );
}
