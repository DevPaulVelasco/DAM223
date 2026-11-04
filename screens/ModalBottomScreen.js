import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity } from 'react-native';

const opciones = ['Compartir', 'Editar', 'Eliminar'];

export default function ModalBottomScreen() {
  const [modal, setModal] = useState(null);
  const [mensaje, setMensaje] = useState('Selecciona una opción');

  const elegirOpcion = (opcion) => {
    setMensaje(`Opción: ${opcion}`);
    setModal(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Práctica: Modal & Bottom Sheet</Text>
      <Text style={styles.statusText}>Estado actual: {mensaje}</Text>

      <View style={styles.buttons}>
        <Button
          title="Abrir Modal (Confirmación)"
          onPress={() => setModal('confirmacion')}
          color="#1e88e5"
        />
        <Button
          title="Opciones de Perfil (Bottom Sheet)"
          onPress={() => setModal('opciones')}
          color="#43a047"
        />
      </View>

      <Modal
        visible={modal === 'confirmacion'}
        animationType="fade"
        transparent
        onRequestClose={() => setModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>¿Eliminar elemento?</Text>
            <Text style={styles.modalBody}>Esta acción no se puede deshacer.</Text>
            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={() => setModal(null)} color="#757575" />
              <Button
                title="Aceptar"
                onPress={() => {
                  setMensaje('Elemento eliminado');
                  setModal(null);
                }}
                color="#d32f2f"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modal === 'opciones'}
        animationType="slide"
        transparent
        onRequestClose={() => setModal(null)}
      >
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setModal(null)}
        >
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Opciones de Perfil</Text>
            {opciones.map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={styles.sheetOption}
                onPress={() => elegirOpcion(opcion)}
              >
                <Text style={[styles.optionText, opcion === 'Eliminar' && styles.deleteText]}>
                  {opcion}
                </Text>
              </TouchableOpacity>
            ))}
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  statusText: { fontSize: 14, color: '#666', marginBottom: 30 },
  buttons: { width: '100%', paddingHorizontal: 20, gap: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalBody: { fontSize: 14, color: '#555', marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  sheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
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
  sheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  sheetOption: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  optionText: { fontSize: 16 },
  deleteText: { color: '#d32f2f' },
});
