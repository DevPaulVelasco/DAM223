import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Pantallas from './screens';
import MenuScreen from './screens/MenuScreen';
import { NavigationProvider } from './navigation';
import { LocalDataProvider, useAppData } from './appData';

const pantallas = { ...Pantallas, MenuScreen };

export default function App() {
  return (
    <SafeAreaProvider>
      <LocalDataProvider>
        <Navegacion />
      </LocalDataProvider>
    </SafeAreaProvider>
  );
}

function Navegacion() {
  const [historial, setHistorial] = useState([{ pantalla: 'MenuScreen', parametros: {} }]);
  const { cargando } = useAppData();
  const rutaActual = historial[historial.length - 1];
  const Pantalla = pantallas[rutaActual.pantalla];

  const navegar = (pantalla, parametros = {}) => {
    if (rutaActual.pantalla !== 'MenuScreen' || !pantallas[pantalla]) return;
    setHistorial((actual) => [...actual, { pantalla, parametros }]);
  };
  const regresar = () => {
    setHistorial([{ pantalla: 'MenuScreen', parametros: {} }]);
  };
  const cerrarSesion = regresar;
  const irAlInicio = () => setHistorial([{ pantalla: 'MenuScreen', parametros: {} }]);

  if (cargando) return null;

  return (
    <NavigationProvider value={{
      navegar,
      reemplazar: navegar,
      regresar,
      cerrarSesion,
      irAlInicio,
      puedeRegresar: historial.length > 1,
      pantallaActual: rutaActual.pantalla,
    }}>
      <Pantalla {...rutaActual.parametros} />
    </NavigationProvider>
  );
}
