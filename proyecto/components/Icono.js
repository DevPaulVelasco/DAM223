import { Image } from 'react-native';

export const imagenes = {
  home: require('../assets/iconos/home.png'),
  volver: require('../assets/iconos/volver.png'),
  usuario: require('../assets/iconos/usuario.png'),
  usuarios: require('../assets/iconos/usuarios.png'),
  avatar: require('../assets/iconos/avatar.png'),
  corazon: require('../assets/iconos/corazon.png'),
  puerta: require('../assets/iconos/puerta.png'),
  lista: require('../assets/iconos/lista.png'),
  lapiz: require('../assets/iconos/lapiz.png'),
  basura: require('../assets/iconos/basura.png'),
  mas: require('../assets/iconos/mas.png'),
  menos: require('../assets/iconos/menos.png'),
  ojo: require('../assets/iconos/ojo.png'),
  nota: require('../assets/iconos/nota.png'),
  reloj: require('../assets/iconos/reloj.png'),
  engrane: require('../assets/iconos/engrane.png'),
  lupa: require('../assets/iconos/lupa.png'),
  java: require('../assets/iconos/java.png'),
  python: require('../assets/iconos/python.png'),
  calculadora: require('../assets/iconos/calculadora.png'),
  js: require('../assets/iconos/js.png'),
  html: require('../assets/iconos/html.png'),
  flecha_izq: require('../assets/iconos/flecha_izq.png'),
  flecha_der: require('../assets/iconos/flecha_der.png'),
  moneda: require('../assets/iconos/moneda.png'),
  logo: require('../assets/iconos/logo.png'),
};

export const Icono = ({ nombre, tam = 24, ancho, alto, style }) => (
  <Image
    source={imagenes[nombre]}
    style={[{ width: ancho ?? tam, height: alto ?? tam, resizeMode: 'contain' }, style]}
  />
);
