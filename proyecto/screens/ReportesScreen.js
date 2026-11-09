import { Text, View } from 'react-native';
import { PantallaBase, Avatar, Boton, colores } from '../components';
import { confirmarAccion, mostrarError, useAppData } from '../appData';

export default function ReportesScreen() {
  const { datos, actualizarReporte } = useAppData();

  const cambiar = async (id, estado) => {
    try {
      await actualizarReporte(id, estado);
    } catch (error) {
      mostrarError(error);
    }
  };

  const borrar = (id) => confirmarAccion('Eliminar reporte', 'Esta accion no se puede deshacer.', () => cambiar(id, 'deleted'));

  return (
    <PantallaBase titulo="Reportes">
      {datos.reports.map((report) => {
        const autor = datos.users.find((user) => user.id === report.reporterId);
        const servicio = datos.services.find((item) => item.id === report.serviceId);
        return (
          <View key={report.id} style={{ borderWidth: 1, borderColor: '#E5EBF3', backgroundColor: colores.blanco, borderRadius: 16, padding: 14, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar ancho={34} alto={34} />
              <Text style={{ color: colores.marino, fontSize: 12, fontWeight: '700', marginLeft: 8, flex: 1 }}>{autor?.name || 'Usuario'} · {servicio?.title || 'Servicio eliminado'}</Text>
              <Text style={{ color: report.status === 'pending' ? colores.amarillo : colores.verde, fontSize: 10, fontWeight: '700' }}>{report.status === 'pending' ? 'PENDIENTE' : 'REVISADO'}</Text>
            </View>
            <Text style={{ color: colores.texto, fontSize: 14, lineHeight: 20, marginTop: 12 }}>{report.description}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              {report.status === 'pending' && <Boton titulo="MARCAR REVISADO" color={colores.verde} onPress={() => cambiar(report.id, 'reviewed')} />}
              <Boton titulo="ELIMINAR" color={colores.rojo} onPress={() => borrar(report.id)} />
            </View>
          </View>
        );
      })}
      {datos.reports.length === 0 && <Text style={{ color: '#75839A', textAlign: 'center', marginTop: 20 }}>No hay reportes pendientes.</Text>}
    </PantallaBase>
  );
}
