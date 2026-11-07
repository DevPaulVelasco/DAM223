import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, Platform, Switch, Text, StyleSheet } from 'react-native';

export default function ActivityIndicatorScreen() {
  const [cargando, setCargando] = useState(false);
  const [esGrande, setEsGrande] = useState(false);
  const [cambiarColor, setCambiarColor] = useState(false);

  const handleEnviar = () => {
    setCargando(true);
    setTimeout(() => setCargando(false), 2000); // Simula el proceso
  };

  return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <TextInput 
        placeholder="Escribe algo..." 
        style={styles.input} 
      />

      <View style={styles.actionContainer}>
        {cargando ? (
          <ActivityIndicator 
            size={esGrande ? "large" : "small"} 
            color={cambiarColor ? "#00bfff" : "#ff00fb"} 
          />
        ) : (
          <Button 
            title="Enviar" 
            onPress={handleEnviar} 
          />
        )}
      </View>

      {/* Cuadro contenedor para los switches */}
      <View style={styles.switchBox}>
        {/* Switch 1: Hacer más grande */}
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Hacer más grande</Text>
          <Switch 
            value={esGrande} 
            onValueChange={setEsGrande} 
          />
        </View>

        {/* Switch 2: Cambiar color */}
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Cambiar color</Text>
          <Switch 
            value={cambiarColor} 
            onValueChange={setCambiarColor} 
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-end', 
    padding: 20, 
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 20, 
    backgroundColor: '#fff',
  },
  action: {
    height: 40, 
    justifyContent: 'center', 
    marginBottom: 20,
  },
  switchBox: {
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 15, 
    backgroundColor: '#fff',
  },
  switchRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 15,
  },
  switchText: {
    fontSize: 16,
  },
});