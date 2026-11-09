import { Text, View } from 'react-native';
import { PantallaBase, Avatar, Boton, CajaTexto, TarjetaServicio, colores } from '../components';
import { useNavigation } from '../navigation';
import { confirmarAccion, mostrarError, useAppData } from '../appData';

export default function GestionUsuarioScreen({ userId }) {
  const { reemplazar } = useNavigation();
  const { datos, cambiarEstadoServicio, eliminarServicioAdministrador, eliminarUsuario } = useAppData();
  const usuario = datos.users.find((item) => item.id === userId);
  const servicios = datos.services.filter((service) => service.ownerId === userId);

  if (!usuario) return <PantallaBase titulo="Usuario"><Text>Este usuario ya no existe.</Text></PantallaBase>;

  const cambiarEstado = async (id) => {
    try {
      await cambiarEstadoServicio(id);
    } catch (error) {
      mostrarError(error);
    }
  };

  const borrarServicio = (id) => confirmarAccion('Eliminar servicio', 'Se cancelaran solicitudes pendientes. Los intercambios activos deben terminar primero.', async () => {
      try {
        await eliminarServicioAdministrador(id);
      } catch (error) {
        mostrarError(error);
      }
    });

  const borrarUsuario = () => confirmarAccion('Eliminar usuario', `¿Eliminar la cuenta local de ${usuario.name}?`, async () => {
      try {
        await eliminarUsuario(usuario.id);
        reemplazar('GestionUsuariosScreen');
      } catch (error) {
        mostrarError(error);
      }
    });

  return (
    <PantallaBase titulo={usuario.name}>
      <View style={{ backgroundColor: colores.blanco, borderRadius: 16, alignItems: 'center', padding: 18 }}>
        <Avatar ancho={80} alto={80} />
        <Text style={{ color: colores.marino, fontWeight: '700', fontSize: 16, marginTop: 10 }}>{usuario.name}</Text>
      </View>
      <CajaTexto etiqueta="INFORMACION" texto={`Edad: ${usuario.age || 'No indicada'}\nCarrera: ${usuario.degree || 'No indicada'}\nCorreo: ${usuario.email || 'No indicado'}\nCreditos: ${usuario.credits}`} />
      <Text style={{ color: colores.marino, fontSize: 16, fontWeight: '700', marginVertical: 12 }}>Servicios</Text>
      {servicios.map((service) => (
        <View key={service.id} style={{ marginBottom: 8 }}>
          <TarjetaServicio fecha={`${service.date} · ${service.time}`} titulo={service.title} creditos={1} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Boton titulo={service.active ? 'SUSPENDER' : 'ACTIVAR'} color={service.active ? colores.amarillo : colores.verde} textoColor={colores.texto} onPress={() => cambiarEstado(service.id)} />
            <Boton titulo="ELIMINAR" color={colores.rojo} onPress={() => borrarServicio(service.id)} />
          </View>
        </View>
      ))}
      {servicios.length === 0 && <Text style={{ color: '#75839A' }}>Este usuario no tiene servicios.</Text>}
      {usuario.id !== datos.currentUserId && <Boton titulo="ELIMINAR USUARIO" color={colores.rojo} pill={false} onPress={borrarUsuario} />}
    </PantallaBase>
  );
}
