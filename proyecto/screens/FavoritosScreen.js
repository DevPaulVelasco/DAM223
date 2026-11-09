import { Fragment } from 'react';
import { Text } from 'react-native';
import { PantallaBase, TarjetaServicio, Boton, colores } from '../components';
import { useNavigation } from '../navigation';
import { mostrarError, useAppData } from '../appData';

export default function FavoritosScreen() {
  const { navegar } = useNavigation();
  const { datos, alternarFavorito } = useAppData();
  const favoritos = datos.services.filter((service) => datos.favorites.includes(service.id));

  const quitar = async (id) => {
    try {
      await alternarFavorito(id);
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <PantallaBase titulo="Mis favoritos">
      {favoritos.map((service) => (
        <Fragment key={service.id}>
          <TarjetaServicio fecha={`${service.date} · ${service.time}`} titulo={service.title} creditos={1} onPress={() => navegar('UsarServicioScreen', { serviceId: service.id })} />
          <Boton titulo="QUITAR DE FAVORITOS" color={colores.rojo} onPress={() => quitar(service.id)} />
        </Fragment>
      ))}
      {favoritos.length === 0 && <Text style={{ color: '#75839A', textAlign: 'center', marginTop: 24 }}>Aun no tienes servicios favoritos. Pulsa el corazon en un servicio para guardarlo.</Text>}
    </PantallaBase>
  );
}
