import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PantallaBase, colores, Icono } from '../components';
import { useNavigation } from '../navigation';
import { useAppData } from '../appData';

export default function DashboardScreen() {
  const { navegar } = useNavigation();
  const { datos } = useAppData();
  const barras = [datos.users.length, datos.services.filter((service) => service.active).length, datos.requests.filter((request) => request.status === 'pending').length, datos.exchanges.filter((exchange) => exchange.status === 'completed').length];
  const maxBarra = Math.max(...barras, 1);

  return (
    <PantallaBase titulo="Dashboard" iconos={['usuario', 'lista', 'puerta']}>
      <Pressable onPress={() => navegar('GestionUsuariosScreen')} style={s.tarjeta}>
        <View>
          <Text style={s.t1}>TOTAL USUARIOS</Text>
          <Text style={s.t1}>USUARIOS REGISTRADOS <Text style={s.num}>{datos.users.length}</Text></Text>
        </View>
        <Icono nombre="usuarios" tam={44} />
      </Pressable>
      <Pressable onPress={() => navegar('ServiciosScreen')} style={s.tarjeta}>
        <View>
          <Text style={s.t1}>TOTAL SERVICIOS</Text>
          <Text style={s.t1}>SERVICIOS ACTIVOS <Text style={s.num}>{datos.services.filter((service) => service.active).length}</Text></Text>
        </View>
        <Icono nombre="nota" tam={44} />
      </Pressable>
      <Pressable onPress={() => navegar('ReportesScreen')}>
        <Text style={s.grafTitulo}>GRAFICA DE REPORTES</Text>
        <View style={s.grafica}>
        {barras.map((valor, i) => <View key={i} style={[s.barra, { height: Math.max(12, (valor / maxBarra) * 120) }]} />)}
        </View>
      </Pressable>
    </PantallaBase>
  );
}
const s = StyleSheet.create({
  tarjeta: { backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, marginBottom: 12 },
  t1: { color: colores.marino, fontWeight: '700', fontSize: 14 },
  num: { color: colores.verde, fontSize: 20, fontWeight: '800' },
  grafTitulo: { color: colores.marino, fontSize: 15, fontWeight: '700', marginTop: 16, marginBottom: 10 },
  grafica: { height: 170, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 16, backgroundColor: colores.blanco, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', padding: 16 },
  barra: { width: 28, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: colores.boton },
});
