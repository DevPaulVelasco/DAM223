import { Pressable, Text, View } from 'react-native';
import { PantallaBase, Seccion, colores, Icono, Boton } from '../components';
import { useNavigation } from '../navigation';
import { confirmarAccion, mostrarError, useAppData } from '../appData';

export default function CategoriasScreen() {
  const { navegar } = useNavigation();
  const { datos, eliminarCategoria } = useAppData();

  const borrar = (category) => confirmarAccion('Eliminar categoria', `Se eliminara "${category.name}". Los servicios pasaran a "Sin categoria".`, async () => {
      try {
        await eliminarCategoria(category.id);
      } catch (error) {
        mostrarError(error);
      }
    });

  return (
    <PantallaBase titulo="Categorias" derecha={
      <Pressable onPress={() => navegar('CategoriaFormScreen')} accessibilityRole="button" accessibilityLabel="Agregar categoria">
        <Icono nombre="mas" tam={28} />
      </Pressable>
    }>
      <Seccion titulo="Explorar por categoria" />
      {datos.categories.map((category) => {
        const total = datos.services.filter((service) => service.active && service.category === category.name).length;
        return (
          <View key={category.id} style={{ backgroundColor: colores.blanco, borderRadius: 14, padding: 14, marginBottom: 10 }}>
            <Pressable onPress={() => navegar('ServiciosScreen', { modo: 'explorar', categoria: category.name })}>
              <Text style={{ color: colores.marino, fontWeight: '700', fontSize: 16 }}>{category.name}</Text>
              <Text style={{ color: '#75839A', fontSize: 12, marginTop: 4 }}>{category.description || 'Sin descripcion'} · {total} servicios</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Boton titulo="EDITAR" onPress={() => navegar('CategoriaFormScreen', { categoryId: category.id })} />
              <Boton titulo="ELIMINAR" color={colores.rojo} onPress={() => borrar(category)} />
            </View>
          </View>
        );
      })}
      {datos.categories.length === 0 && <Text style={{ color: '#75839A' }}>No hay categorias. Agrega una para clasificar tus servicios.</Text>}
    </PantallaBase>
  );
}
