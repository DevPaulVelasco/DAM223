import { Pressable, Text, View } from 'react-native';
import { PantallaBase, TarjetaServicio, EditarEliminar, Icono, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { confirmarAccion, mostrarError, useAppData } from '../appData';

const fechaBonita = (fecha) => {
  const date = new Date(`${fecha}T00:00:00`);
  return Number.isNaN(date.getTime()) ? fecha : date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function ServiciosScreen({ modo = 'mios', categoria }) {
  const { navegar } = useNavigation();
  const { datos, usuarioActual, eliminarServicio } = useAppData();
  const explorando = modo === 'explorar';
  const servicios = datos.services.filter((service) => service.active && (explorando
    ? service.ownerId !== datos.currentUserId && (!categoria || service.category === categoria)
    : service.ownerId === datos.currentUserId));

  const borrar = (id) => confirmarAccion('Eliminar servicio', 'El servicio dejara de aparecer y se cancelaran sus solicitudes pendientes.', async () => {
      try {
        await eliminarServicio(id);
      } catch (error) {
        mostrarError(error);
      }
    });

  return (
    <PantallaBase
      titulo={explorando ? 'Explorar servicios' : 'Mis servicios'}
      derecha={!explorando ? (
        <Pressable onPress={() => navegar('DarServicioScreen')} accessibilityRole="button" accessibilityLabel="Agregar servicio">
          <Icono nombre="mas" tam={28} />
        </Pressable>
      ) : null}
    >
      {explorando && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colores.blanco, padding: 14, borderRadius: 14, marginBottom: 10 }}>
          <Text style={{ color: colores.marino, fontWeight: '700' }}>Tu saldo: {usuarioActual.credits} creditos</Text>
          <Text style={{ color: '#75839A', fontSize: 12 }}>Intercambio de servicio por servicio · 1 a 1</Text>
        </View>
      )}
      {servicios.map((service) => (
        <View key={service.id} style={{ marginBottom: 8 }}>
          <TarjetaServicio
            fecha={`${fechaBonita(service.date)} · ${service.time}`}
            titulo={service.title}
            creditos={1}
            onPress={() => navegar('UsarServicioScreen', { serviceId: service.id })}
          />
          {explorando ? (
            <Text style={{ color: '#75839A', marginHorizontal: 8 }}>{service.category} · {datos.users.find((user) => user.id === service.ownerId)?.name}</Text>
          ) : (
            <EditarEliminar
              onEditar={() => navegar('DarServicioScreen', { serviceId: service.id })}
              onEliminar={() => borrar(service.id)}
            />
          )}
        </View>
      ))}
      {servicios.length === 0 && (
        <View style={{ backgroundColor: colores.blanco, padding: 18, borderRadius: 14, marginTop: 10 }}>
          <Text style={{ color: colores.marino, fontWeight: '700', textAlign: 'center' }}>
            {explorando ? 'No hay servicios disponibles en esta categoria.' : 'Todavia no has publicado servicios.'}
          </Text>
        </View>
      )}
      {!explorando && (
        <Boton titulo="PUBLICAR UN SERVICIO" onPress={() => navegar('DarServicioScreen')} />
      )}
    </PantallaBase>
  );
}
