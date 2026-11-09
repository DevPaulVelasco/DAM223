import { useState } from 'react';
import { Alert } from 'react-native';
import { PantallaBase, Campo, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function CrearReporteScreen({ serviceId }) {
  const { reemplazar } = useNavigation();
  const { crearReporte } = useAppData();
  const [descripcion, setDescripcion] = useState('');

  const enviar = async () => {
    if (!descripcion.trim()) {
      Alert.alert('Describe el problema', 'Escribe por que quieres reportar este servicio.');
      return;
    }
    try {
      await crearReporte(serviceId, descripcion.trim());
      Alert.alert('Reporte enviado', 'El equipo de administracion lo revisara.');
      reemplazar('UsarServicioScreen', { serviceId });
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase titulo="Reportar servicio">
      <Campo placeholder="Describe el problema" value={descripcion} onChangeText={setDescripcion} multiline textAlignVertical="top" style={{ minHeight: 140 }} />
      <Boton titulo="ENVIAR REPORTE" color={colores.rojo} pill={false} onPress={enviar} />
    </PantallaBase>
  );
}
