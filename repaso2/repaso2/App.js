import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image
} from 'react-native';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const agregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    setCargando(true);

    setTimeout(() => {
      setCargando(false);

      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo,
        autor: autor,
        genero: genero,
      };

      setLibros([...libros, nuevoLibro]);
      setTitulo('');
      setAutor('');
      setGenero('');

      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' }}
          style={styles.splashIcon}
        />
        <Text style={styles.splashText}>Repaso 2</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop' }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Catálogo de Libros</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            placeholderTextColor="#888"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#888"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            placeholderTextColor="#888"
            value={genero}
            onChangeText={setGenero}
          />

          <Pressable style={styles.button} onPress={agregarLibro}>
            <Text style={styles.buttonText}>Agregar Libro</Text>
          </Pressable>
        </View>

        {cargando && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Guardando...</Text>
          </View>
        )}

        <Text style={styles.counterText}>Total de libros: {libros.length}</Text>

        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookCard}>
              <Text style={styles.bookTitle}>{item.titulo}</Text>
              <Text style={styles.bookDetails}>Autor: {item.autor}</Text>
              <Text style={styles.bookDetails}>Género: {item.genero}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashIcon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  splashText: {
    color: '#1d3557',
    fontSize: 28,
    fontWeight: 'bold',
  },
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, padding: 20, backgroundColor: 'rgba(0,0,0,0.4)' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 15 },
  formContainer: { marginBottom: 10 },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1d3557',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loadingContainer: { marginVertical: 10, alignItems: 'center' },
  loadingText: { color: '#fff', marginTop: 5, fontSize: 14, fontWeight: '600' },
  counterText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  bookCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  bookDetails: { fontSize: 14, color: '#666', marginTop: 2 },
});