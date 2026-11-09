import { View, Text, Pressable } from 'react-native';
import { PantallaBase, Avatar, Moneda, Dato, CajaTexto, Seccion, TarjetaServicio, colores, Icono, Accion } from '../components';
import { useNavigation } from '../navigation';
import { useAppData } from '../appData';

export default function PerfilScreen() {
  const { navegar } = useNavigation();
  const { datos, usuarioActual } = useAppData();
  const servicios = datos.services.filter((service) => service.ownerId === usuarioActual.id && service.active);

  return (
    <PantallaBase titulo="Mi perfil" derecha={
      <Pressable onPress={() => navegar('EditarUsuarioScreen')} accessibilityRole="button" accessibilityLabel="Editar perfil">
        <Icono nombre="lapiz" tam={24} />
      </Pressable>
    } iconos={['puerta', 'lista', 'volver']}>
      <View style={{ backgroundColor: colores.blanco, borderRadius: 18, alignItems: 'center', paddingVertical: 16 }}>
        <Avatar ancho={90} alto={80} />
        <Pressable onPress={() => navegar('EditarUsuarioScreen')} accessibilityRole="button" accessibilityLabel="Editar foto de perfil" style={{ position: 'absolute', right: 6, top: 4 }}>
          <Icono nombre="lapiz" tam={26} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
        <Pressable onPress={() => navegar('EditarUsuarioScreen')} accessibilityRole="button" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: colores.marino }}>{usuarioActual.name}{'\n'}{usuarioActual.age} AÑOS</Text>
          <Icono nombre="lapiz" tam={20} style={{ marginLeft: 8 }} />
        </Pressable>
        <Pressable onPress={() => navegar('CreditosScreen')} accessibilityRole="button">
          <Moneda valor={usuarioActual.credits} tam={16} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable onPress={() => navegar('CalificacionesScreen')}>
          <Dato etiqueta="CALIFICACION:" valor="★ 4" />
        </Pressable>
        <Pressable onPress={() => navegar('ResenasScreen')}>
          <Dato etiqueta="VER RESEÑAS:" valor={<Icono nombre="ojo" tam={26} />} />
        </Pressable>
      </View>
      <CajaTexto etiqueta="SOBRE MI:" texto={usuarioActual.about || 'Aun no agregas informacion sobre ti.'} />
      <Accion icono="lista" texto="Ver mis habilidades" style={{ marginTop: 12 }} onPress={() => navegar('HabilidadesScreen')} />
      <Seccion titulo="Mis Servicios" />
      {servicios.slice(0, 3).map((service) => (
        <TarjetaServicio key={service.id} fecha={`${service.date} · ${service.time}`} titulo={service.title} creditos={1} onPress={() => navegar('DarServicioScreen', { serviceId: service.id })} />
      ))}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Accion icono="mas" texto="Agregar Servicio" onPress={() => navegar('DarServicioScreen')} />
          <Accion icono="lista" texto="Gestionar servicios" onPress={() => navegar('ServiciosScreen')} />
      </View>
    </PantallaBase>
  );
}
