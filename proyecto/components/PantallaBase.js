import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Encabezado } from './Encabezado';
import { BarraInferior } from './BarraInferior';
import { Icono } from './Icono';
import { colores } from './tema';
import { useNavigation } from '../navigation';

export const PantallaBase = ({ titulo, derecha, iconos, children }) => {
  const { puedeRegresar, regresar } = useNavigation();

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      {titulo || derecha || puedeRegresar ? (
        <View style={s.header}>
          <View style={[s.titulo, !(titulo || puedeRegresar) && s.tituloVacio]}>
            {puedeRegresar && (
              <Pressable onPress={regresar} accessibilityRole="button" accessibilityLabel="Regresar" style={s.volver}>
                <Icono nombre="volver" tam={24} />
              </Pressable>
            )}
            {titulo ? <Encabezado texto={titulo} /> : null}
          </View>
          <View pointerEvents="none">{derecha}</View>
        </View>
      ) : null}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.contenido} showsVerticalScrollIndicator={false}>
        <View pointerEvents="none">{children}</View>
      </ScrollView>
      <BarraInferior iconos={iconos} />
    </SafeAreaView>
  );
};
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colores.azulClaro },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 68, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10, backgroundColor: colores.azulClaro },
  titulo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  tituloVacio: { flex: 0 },
  volver: { padding: 8, marginLeft: -8, marginRight: 8, backgroundColor: colores.blanco, borderRadius: 14 },
  contenido: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 28 },
});
