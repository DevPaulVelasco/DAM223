import { View, Text, Pressable } from 'react-native';
import { PantallaBase, Avatar, Moneda, Dato, CajaTexto, Seccion, TarjetaServicio, colores, Icono } from '../components';
import { useNavigation } from '../navigation';
import { useAppData } from '../appData';

export default function PerfilOtrosScreen({ userId }) {
  const { navegar } = useNavigation();
  const { datos } = useAppData();
  const usuario = datos.users.find((item) => item.id === userId) ||
    datos.users.find((item) => item.id !== datos.currentUserId);
  const servicios = datos.services.filter((service) => service.ownerId === usuario?.id && service.active);
  const calificaciones = datos.reviews.filter((review) => servicios.some((service) => service.id === review.serviceId));
  const promedio = calificaciones.length
    ? (calificaciones.reduce((suma, review) => suma + review.rating, 0) / calificaciones.length).toFixed(1)
    : 'Sin calificaciones';

  if (!usuario) return <PantallaBase titulo="Perfil"><Text>Este perfil ya no esta disponible.</Text></PantallaBase>;

  return (
    <PantallaBase titulo={`Perfil de ${usuario.name}`}>
      <View style={{ backgroundColor: colores.blanco, borderRadius: 18, alignItems: 'center', paddingVertical: 16 }}>
        <Avatar ancho={90} alto={90} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 }}>
        <Text style={{ fontSize: 15, fontWeight: '800', color: colores.marino }}>{usuario.name}{'\n'}{usuario.age} AÑOS</Text>
        <Moneda valor={usuario.credits} tam={16} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Dato etiqueta="CALIFICACION" valor={`★ ${promedio}`} />
        <Pressable onPress={() => navegar('HabilidadesOtrosScreen', { userId: usuario.id })}>
          <Dato etiqueta="HABILIDADES" valor={<Icono nombre="lista" tam={26} />} />
        </Pressable>
      </View>
      <CajaTexto etiqueta="SOBRE MI" texto={usuario.about || 'Este usuario aun no ha agregado informacion.'} />
      <Seccion titulo="Servicios disponibles" />
      {servicios.map((service) => (
        <TarjetaServicio key={service.id} fecha={`${service.date} · ${service.time}`} titulo={service.title} creditos={1} onPress={() => navegar('UsarServicioScreen', { serviceId: service.id })} />
      ))}
      {servicios.length === 0 && <Text style={{ color: '#75839A' }}>No hay servicios disponibles en este momento.</Text>}
    </PantallaBase>
  );
}
