import { View, Text, StyleSheet } from 'react-native';
import { PantallaBase, Logo, Moneda, Seccion, Ficha, colores, Icono } from '../components';

const servicios = [
  { id: 'html', title: 'Introduccion a HTML' },
  { id: 'python', title: 'Curso de Python' },
  { id: 'javascript', title: 'Introduccion a JavaScript' },
];

const categorias = ['CODING', 'MATHS', 'IDIOMAS'];
const accesos = [
  'Explorar servicios',
  'Mis servicios',
  'Categorias',
  'Mi perfil',
  'Mis creditos',
  'Favoritos',
  'Solicitudes',
  'Intercambios',
  'Administracion',
];

export default function HomeScreen() {
  const fila = { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' };

  return (
    <PantallaBase
      iconos={['home', 'lista', 'usuario']}
      titulo=""
      derecha={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Logo tam={30} />
          <Moneda valor={1} />
        </View>
      }
    >
      <View style={s.aviso}>
        <Text style={s.avisoTexto}>PANTALLAS DE MUESTRA · SERVICIOS EN LINEA</Text>
      </View>
      <Seccion titulo="Lo mas solicitado" icono="engrane" />
      <View style={fila}>
        {servicios.slice(0, 2).map((service) => (
          <View key={service.id}>
            <Ficha texto={service.title.length > 10 ? `${service.title.slice(0, 9)}…` : service.title} grande />
          </View>
        ))}
      </View>

      <Seccion titulo="Categorias" icono="engrane" />
      <View style={fila}>
        {categorias.map((category) => <View key={category}><Ficha texto={category} /></View>)}
      </View>
      <View style={s.resumen}>
        <Text style={{ fontSize: 12, fontWeight: '700', color: colores.marino, marginBottom: 4 }}>EXPLORAR TODOS LOS SERVICIOS</Text>
        {servicios.slice(0, 2).map((service) => (
          <Text key={service.id} style={{ fontSize: 12, color: '#66758B', marginTop: 3 }}>• {service.title} · En linea · Intercambio 1 a 1</Text>
        ))}
      </View>

      <Seccion titulo="Servicios en linea" icono="lupa" />
      <View style={fila}>
        {servicios.slice(1).map((service) => <View key={service.id}><Ficha texto={service.title.slice(0, 9)} /></View>)}
        <Icono nombre="mas" tam={26} style={{ marginLeft: 8 }} />
      </View>

      <View style={s.destacado}>
        <Text style={s.destacadoTitulo}>Encuentra tu próximo servicio</Text>
        <Text style={s.destacadoTexto}>Intercambia conocimientos en línea, de persona a persona.</Text>
      </View>

      <View style={s.seccion}>
        <Seccion titulo="Menú de interfaces" />
        <View style={s.lista}>
          {accesos.map((texto) => (
            <View key={texto} style={s.tarjeta}>
              <Text style={s.tarjetaTitulo}>{texto}</Text>
              <Text style={s.tarjetaDetalle}>Vista de muestra</Text>
              <Text style={s.flecha}>›</Text>
            </View>
          ))}
        </View>
      </View>
    </PantallaBase>
  );
}

const s = StyleSheet.create({
  aviso: { backgroundColor: '#E8F0FF', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, marginBottom: 8 },
  avisoTexto: { color: colores.marino, fontWeight: '700', fontSize: 10, textAlign: 'center', letterSpacing: 0.3 },
  resumen: { backgroundColor: colores.blanco, borderRadius: 14, padding: 14, marginTop: 12, alignSelf: 'center', width: '88%' },
  destacado: { backgroundColor: colores.marino, padding: 18, borderRadius: 16, marginTop: 22 },
  destacadoTitulo: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  destacadoTexto: { color: '#E8F0FF', fontSize: 13, lineHeight: 19, marginTop: 6 },
  seccion: { marginTop: 20 },
  lista: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tarjeta: { width: '48%', minHeight: 80, justifyContent: 'center', backgroundColor: colores.blanco, borderWidth: 1, borderColor: '#E5EBF3', borderRadius: 14, padding: 14, marginBottom: 10 },
  tarjetaTitulo: { color: colores.marino, fontWeight: '700', fontSize: 14, paddingRight: 12 },
  tarjetaDetalle: { color: '#75839A', fontSize: 11, marginTop: 5 },
  flecha: { color: colores.boton, fontSize: 24, position: 'absolute', right: 8, top: 4 },
});
