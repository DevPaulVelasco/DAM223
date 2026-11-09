import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colores } from '../components';
import { useNavigation } from '../navigation';
import { grupos } from './grupos';

export default function MenuScreen() {
  const { navegar } = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo}>Menú de interfaces</Text>
        <Text style={styles.subtitulo}>Selecciona una vista para mostrarla</Text>
        {grupos.map(([nombre, items]) => (
          <View key={nombre} style={styles.grupo}>
            <Text style={styles.seccion}>{nombre}</Text>
            {items.map(([texto, pantalla]) => (
              <Pressable
                key={pantalla}
                accessibilityRole="button"
                onPress={() => navegar(pantalla, parametrosDeMuestra[pantalla] || {})}
                style={({ pressed }) => [styles.opcion, pressed && styles.opcionPresionada]}
              >
                <Text style={styles.textoOpcion}>{texto}</Text>
                <Text style={styles.flecha}>›</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const parametrosDeMuestra = {
  GestionUsuarioScreen: { userId: 'john' },
  PerfilOtrosScreen: { userId: 'juan' },
  HabilidadesOtrosScreen: { userId: 'juan' },
  UsarServicioScreen: { serviceId: 'service-python' },
  CrearReporteScreen: { serviceId: 'service-python' },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colores.azulClaro },
  contenido: { padding: 20, paddingBottom: 32 },
  titulo: { color: colores.marino, fontSize: 25, fontWeight: '800', marginTop: 10 },
  subtitulo: { color: '#75839A', fontSize: 14, marginTop: 6, marginBottom: 8 },
  grupo: { marginTop: 18 },
  seccion: { color: colores.marino, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  opcion: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 12, paddingHorizontal: 14, marginBottom: 8 },
  opcionPresionada: { opacity: 0.75 },
  textoOpcion: { color: colores.texto, fontSize: 14, fontWeight: '600' },
  flecha: { color: colores.boton, fontSize: 24 },
});