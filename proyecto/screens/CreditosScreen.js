import { Text, View } from 'react-native';
import { PantallaBase, Moneda, Seccion, colores } from '../components';
import { useAppData } from '../appData';

export default function CreditosScreen() {
  const { datos, usuarioActual } = useAppData();
  const movimientos = datos.transactions.filter((item) => item.userId === usuarioActual.id);

  return (
    <PantallaBase titulo="Mis creditos">
      <View style={{ backgroundColor: colores.blanco, borderRadius: 18, alignItems: 'center', padding: 22 }}>
        <Text style={{ fontSize: 12, fontWeight: '700', color: '#75839A', marginBottom: 8 }}>SALDO DISPONIBLE</Text>
        <Moneda valor={usuarioActual.credits} tam={34} />
        <Text style={{ color: '#75839A', fontSize: 12, marginTop: 10 }}>Creditos reservados: {usuarioActual.reserved}</Text>
        <Text style={{ color: colores.marino, fontSize: 12, marginTop: 6 }}>Cada persona tiene 1 credito para intercambiar un servicio por otro.</Text>
      </View>
      <Seccion titulo="Movimientos" />
      {movimientos.map((movement) => (
        <View key={movement.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colores.blanco, borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colores.marino }}>{movement.description}</Text>
            <Text style={{ fontSize: 11, color: '#75839A', marginTop: 4 }}>{new Date(movement.createdAt).toLocaleString('es-MX')}</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: '800', color: movement.amount > 0 ? colores.verde : movement.amount < 0 ? colores.rojo : colores.amarillo }}>
            {movement.status === 'reserved' ? 'Reservado' : movement.amount > 0 ? `+${movement.amount}` : movement.amount}
          </Text>
        </View>
      ))}
      {movimientos.length === 0 && <Text style={{ color: '#75839A' }}>Todavia no hay movimientos de creditos.</Text>}
    </PantallaBase>
  );
}
