import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { PantallaBase, Campo, Boton, colores, Seccion } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

const fechaPredeterminada = () => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 1);
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${año}-${mes}-${dia}`;
};

const fechaValida = (fecha, hora) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !/^\d{2}:\d{2}$/.test(hora)) return false;
  const [año, mes, dia] = fecha.split('-').map(Number);
  const [horas, minutos] = hora.split(':').map(Number);
  if (horas > 23 || minutos > 59) return false;
  const cita = new Date(año, mes - 1, dia, horas, minutos);
  if (cita.getFullYear() !== año || cita.getMonth() !== mes - 1 || cita.getDate() !== dia) return false;
  return !Number.isNaN(cita.getTime()) && cita > new Date();
};

export default function DarServicioScreen({ serviceId }) {
  const { reemplazar } = useNavigation();
  const { datos, agregarServicio, guardarServicio } = useAppData();
  const servicio = datos.services.find((item) => item.id === serviceId);
  const [titulo, setTitulo] = useState(servicio?.title || '');
  const [descripcion, setDescripcion] = useState(servicio?.description || '');
  const [categoria, setCategoria] = useState(servicio?.category || datos.categories[0]?.name || '');
  const [fecha, setFecha] = useState(servicio?.date || fechaPredeterminada());
  const [hora, setHora] = useState(servicio?.time || '10:00');

  const publicar = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert('Faltan datos', 'Completa el nombre y la descripcion.');
      return;
    }
    if (!fechaValida(fecha, hora)) {
      Alert.alert('Fecha u hora no valida', 'Usa YYYY-MM-DD y HH:MM; la cita debe ser futura.');
      return;
    }
    const cambios = { title: titulo.trim(), description: descripcion.trim(), category: categoria.trim() || 'Sin categoria', date: fecha, time: hora, place: 'En linea' };
    try {
      if (serviceId) await guardarServicio(serviceId, cambios);
      else await agregarServicio(cambios);
      Alert.alert('Servicio guardado', 'El intercambio es de un servicio por otro (1 a 1).');
      reemplazar('ServiciosScreen', { modo: 'mios' });
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase titulo={serviceId ? 'Editar servicio' : 'Proveer servicio'}>
      <Seccion titulo="Informacion del servicio" />
      <Campo placeholder="Nombre del servicio" value={titulo} onChangeText={setTitulo} />
      <Campo placeholder="Descripcion" value={descripcion} onChangeText={setDescripcion} multiline style={{ minHeight: 100, textAlignVertical: 'top' }} />
      <Campo placeholder="Categoria" value={categoria} onChangeText={setCategoria} />
      <Seccion titulo="Fecha y modalidad" />
      <Campo placeholder="Fecha (AAAA-MM-DD)" value={fecha} onChangeText={setFecha} />
      <Campo placeholder="Hora (HH:MM)" value={hora} onChangeText={setHora} />
      <View style={{ backgroundColor: colores.blanco, borderRadius: 14, padding: 14, marginBottom: 12 }}>
        <Text style={{ color: colores.marino, fontWeight: '700' }}>Modalidad: En linea</Text>
      </View>
      <View style={{ backgroundColor: colores.blanco, borderRadius: 14, padding: 14, marginBottom: 12 }}>
        <Text style={{ color: colores.marino, fontWeight: '700' }}>Duracion: 1 hora</Text>
        <Text style={{ color: colores.marino, marginTop: 4 }}>Intercambio: servicio por servicio (1 a 1)</Text>
      </View>
      <Boton titulo={serviceId ? 'GUARDAR CAMBIOS' : 'PUBLICAR SERVICIO'} color={colores.verde} pill={false} onPress={publicar} />
    </PantallaBase>
  );
}
