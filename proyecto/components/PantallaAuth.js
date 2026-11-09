import { View, ScrollView, StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from './Logo';
import { colores } from './tema';
import { useNavigation } from '../navigation';

export const PantallaAuth = ({ children }) => {
  const { puedeRegresar, regresar } = useNavigation();

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <View style={s.tarjeta}>
        <ScrollView contentContainerStyle={s.contenido}>
          {puedeRegresar && (
            <Pressable onPress={regresar} accessibilityRole="button" style={s.volver}>
              <Text style={s.textoVolver}>‹  Regresar</Text>
            </Pressable>
          )}
          <View style={s.logo}><Logo tam={40} /></View>
          <View pointerEvents="none">{children}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colores.azulClaro, padding: 18 },
  tarjeta: { flex: 1, backgroundColor: '#fff', borderRadius: 24, elevation: 3, shadowColor: '#243B63', shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
  contenido: { flexGrow: 1, justifyContent: 'center', padding: 26, paddingTop: 34, paddingBottom: 32 },
  logo: { marginBottom: 28 },
  volver: { marginBottom: 14, alignSelf: 'flex-start', paddingVertical: 8, paddingRight: 16 },
  textoVolver: { color: colores.boton, fontWeight: 'bold', fontSize: 15 },
});
