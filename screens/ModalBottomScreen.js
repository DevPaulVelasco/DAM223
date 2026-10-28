import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity } from 'react-native';

export default function ModalBottomScreen() {
  // Estados para controlar visibilidad
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Estado para demostrar cambio de datos
  const [mensaje, setMensaje] = useState('Selecciona una opción');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Práctica: Modal & Bottom Sheet</Text>
      <Text style={styles.statusText}>Estado actual: {mensaje}</Text>

      {/* Botones para disparar los componentes */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Abrir Modal (Confirmación)" 
          onPress={() => setIsModalVisible(true)} 
          color="#1e88e5"
        />
        
        <View style={styles.spacer} />

        <Button 
          title="Opciones de Perfil (Bottom Sheet)" 
          onPress={() => setIsBottomSheetVisible(true)} 
          color="#43a047"
        />
      </View>

      {/* ================================================= */}
      {/* 1. COMPONENTE MODAL (Alerta / Confirmación)       */}
      {/* ================================================= */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)} // Botón Atrás en Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>¿Eliminar elemento?</Text>
            <Text style={styles.modalBody}>Esta acción no se puede deshacer.</Text>

            <View style={styles.modalActions}>
              <Button 
                title="Cancelar" 
                onPress={() => setIsModalVisible(false)} 
                color="#757575"
              />
              <Button 
                title="Aceptar" 
                onPress={() => {
                  setMensaje('Elemento eliminado');
                  setIsModalVisible(false);
                }} 
                color="#d32f2f"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* ================================================= */}
      {/* 2. BOTTOM SHEET (Panel Inferior con deslizado)   */}
      {/* ================================================= */}
      <Modal
        visible={isBottomSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBottomSheetVisible(false)}
      >
        {/* Capa para cerrar al tocar fuera */}
        <TouchableOpacity 
          style={styles.sheetOverlay} 
          activeOpacity={1} 
          onPress={() => setIsBottomSheetVisible(false)}
        >
          {/* Contenido del Bottom Sheet */}
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Opciones de Perfil</Text>

            <TouchableOpacity 
              style={styles.sheetOption} 
              onPress={() => {
                setMensaje('Opción: Compartir');
                setIsBottomSheetVisible(false);
              }}
            >
              <Text style={styles.optionText}> Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sheetOption} 
              onPress={() => {
                setMensaje('Opción: Editar');
                setIsBottomSheetVisible(false);
              }}
            >
              <Text style={styles.optionText}> Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sheetOption} 
              onPress={() => {
                setMensaje('Opción: Eliminar');
                setIsBottomSheetVisible(false);
              }}
            >
              <Text style={[styles.optionText, { color: '#d32f2f' }]}> Eliminar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  spacer: {
    height: 15,
  },
  /* Estilos del Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  /* Estilos del Bottom Sheet */
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '35%',
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sheetOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
  },
});