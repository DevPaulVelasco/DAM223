import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity } from 'react-native';

// Creamos un arreglo constante fuera del componente para las opciones del menú desplegable (Bottom Sheet)
const opciones = ['Compartir', 'Editar', 'Eliminar'];

export default function ModalBottomScreen() {
  // =========================================================================
  // BLOQUE 1: INTEGRANTE 1
  // Tema: Importaciones, Datos Iniciales, Estados y Estructura Base
  // =========================================================================

  // Inicializamos el estado 'modal' en null para controlar cuál ventana emergente se abre ('confirmacion', 'opciones' o null)
  const [modal, setModal] = useState(null);
  // Inicializamos un estado para mostrar retroalimentación visual al usuario en pantalla según sus acciones
  const [mensaje, setMensaje] = useState('Selecciona una opción');

  // Función helper que recibe la opción elegida, actualiza el texto del estado con template literals y cierra el modal
  const elegirOpcion = (opcion) => {
    setMensaje(`Opción: ${opcion}`);
    setModal(null);
  };

  return (
    // Contenedor principal que ocupa toda la pantalla y centra sus elementos internos
    <View style={styles.container}>
      {/* Texto estático que sirve como título principal de la práctica */}
      <Text style={styles.title}>Práctica: Modal & Bottom Sheet</Text>
      {/* Texto dinámico que proyecta en tiempo real el valor de la variable de estado 'mensaje' */}
      <Text style={styles.statusText}>Estado actual: {mensaje}</Text>

      {/* Contenedor agrupador para los botones principales con separación uniforme */}
      <View style={styles.buttons}>
        {/* Botón nativo que usa una función flecha para actualizar el estado del modal a 'confirmacion' */}
        <Button
          title="Abrir Modal (Confirmación)"
          onPress={() => setModal('confirmacion')}
          color="#1e88e5"
        />
        {/* Botón nativo que actualiza el estado del modal a 'opciones' para abrir el panel inferior */}
        <Button
          title="Opciones de Perfil (Bottom Sheet)"
          onPress={() => setModal('opciones')}
          color="#43a047"
        />
      </View>

      {/* =======================================================================
          BLOQUE 2: INTEGRANTE 2
          Tema: Modal de Confirmación Estándar (Centrado)
          ======================================================================= */}

      {/* Componente Modal nativo para mostrar alertas flotantes centradas */}
      <Modal
        // visible evalúa a true únicamente si la variable modal es estrictamente igual a 'confirmacion'
        visible={modal === 'confirmacion'}
        // Define el tipo de animación de entrada/salida como un desvanecimiento suave (fade)
        animationType="fade"
        // Prop booleana (true por defecto si se declara) que permite ver el fondo oscuro traslúcido
        transparent
        // Callback requerido en Android para manejar el botón físico de retroceso y cerrar el modal con null
        onRequestClose={() => setModal(null)}
      >
        {/* Capa translúcida oscura que cubre toda la pantalla y centra la tarjeta flotante */}
        <View style={styles.modalOverlay}>
          {/* Tarjeta blanca central que contiene la estructura del diálogo de alerta */}
          <View style={styles.modalCard}>
            {/* Título de la alerta con jerarquía tipográfica destacada */}
            <Text style={styles.modalTitle}>¿Eliminar elemento?</Text>
            {/* Texto descriptivo secundario que advierte sobre la acción */}
            <Text style={styles.modalBody}>Esta acción no se puede deshacer.</Text>
            {/* Contenedor horizontal para alinear los botones de acción al extremo derecho */}
            <View style={styles.modalActions}>
              {/* Botón para cancelar la acción asignando null al estado modal y cerrarlo */}
              <Button title="Cancelar" onPress={() => setModal(null)} color="#757575" />
              {/* Botón de confirmación con lógica múltiple: actualiza el mensaje y cierra el modal */}
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

      {/* =======================================================================
          BLOQUE 3: INTEGRANTE 3
          Tema: Modal tipo Bottom Sheet (Deslizable desde abajo) y Estilos
          ======================================================================= */}

      {/* Modal inferior deslizable para mostrar las opciones del perfil */}
      <Modal
        // visible evalúa a true solo si la variable modal es igual al string 'opciones'
        visible={modal === 'opciones'}
        // animationType en 'slide' hace que la ventana se deslice de abajo hacia arriba nativamente
        animationType="slide"
        // Permite ver el fondo oscurecido detrás del panel
        transparent
        // Cierra el modal de forma segura al presionar el botón de retroceso en Android
        onRequestClose={() => setModal(null)}
      >
        {/* TouchableOpacity como telón de fondo para cerrar el sheet al tocar fuera del menú */}
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setModal(null)}
        >
          {/* Contenedor principal del Bottom Sheet con bordes superiores redondeados */}
          <View style={styles.sheet}>
            {/* Pequeña barra visual indicadora que identifica al panel como deslizable */}
            <View style={styles.sheetHandle} />
            {/* Título de la sección dentro del menú inferior */}
            <Text style={styles.sheetTitle}>Opciones de Perfil</Text>
            {/* Método .map() para iterar dinámicamente sobre el arreglo 'opciones' y generar componentes */}
            {opciones.map((opcion) => (
              <TouchableOpacity
                // key es obligatorio en React al renderizar listas para dar identidad única a cada elemento virtual
                key={opcion}
                style={styles.sheetOption}
                // Al presionar cualquier opción, ejecuta la función helper pasando el nombre de la opción
                onPress={() => elegirOpcion(opcion)}
              >
                {/* Arreglo de estilos condicionales: aplica deleteText en rojo solo si la opción es 'Eliminar' */}
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

// Objeto StyleSheet.create para definir y optimizar los estilos visuales de toda la pantalla
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  statusText: { fontSize: 14, color: '#666', marginBottom: 30 },
  buttons: { width: '100%', paddingHorizontal: 20, gap: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalBody: { fontSize: 14, color: '#555', marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  sheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, minHeight: '35%' },
  sheetHandle: { width: 40, height: 5, backgroundColor: '#ccc', borderRadius: 3, alignSelf: 'center', marginBottom: 15 },
  sheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  sheetOption: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  optionText: { fontSize: 16 },
  deleteText: { color: '#d32f2f' },
});