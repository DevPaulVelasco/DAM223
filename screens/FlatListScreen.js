import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SectionList,
  Pressable,
  StyleSheet,
} from "react-native";

const TAREAS_INICIALES = [
  { id: "1", nombre: "Estudiar React Native" },
  { id: "2", nombre: "Practicar JavaScript" },
  { id: "3", nombre: "Preparar la exposición" },
];

const CONTACTOS = [
  {
    title: "A",
    data: [
      { id: "c1", nombre: "Ana", telefono: "555-1001" },
      { id: "c2", nombre: "Andrés", telefono: "555-1002" },
    ],
  },
  {
    title: "B",
    data: [
      { id: "c3", nombre: "Brenda", telefono: "555-1003" },
      { id: "c4", nombre: "Bruno", telefono: "555-1004" },
    ],
  },
  { title: "C", data: [{ id: "c5", nombre: "Carlos", telefono: "555-1005" }] },
];

const Separador = () => <View style={styles.separador} />;

// ---------- FlatList + estados ----------
function PantallaTareas() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [texto, setTexto] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const agregarTarea = () => {
    if (!texto.trim()) return;
    setTareas((anteriores) => [
      ...anteriores,
      { id: String(Date.now()), nombre: texto.trim() },
    ]);
    setTexto("");
  };

  const actualizar = () => {
    setRefreshing(true);
    setTimeout(() => {
      setTareas(TAREAS_INICIALES);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.pantalla}>
      <TextInput
        style={styles.input}
        placeholder="Nueva tarea"
        value={texto}
        onChangeText={setTexto}
      />
      <View style={styles.fila}>
        <Button title="Agregar" onPress={agregarTarea} />
        <Button title="Vaciar" onPress={() => setTareas([])} />
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        extraData={seleccionado}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSeleccionado(item.id)}
            style={[
              styles.item,
              item.id === seleccionado && styles.seleccionado,
            ]}
          >
            <Text>{item.nombre}</Text>
          </Pressable>
        )}
        ListHeaderComponent={
          <Text style={styles.titulo}>Tareas ({tareas.length})</Text>
        }
        ListFooterComponent={<Text style={styles.pie}>Fin de la lista</Text>}
        ItemSeparatorComponent={Separador}
        ListEmptyComponent={<Text style={styles.vacio}>No hay tareas.</Text>}
        refreshing={refreshing}
        onRefresh={actualizar}
        initialNumToRender={10}
      />
    </View>
  );
}

// ---------- SectionList + estados ----------
function PantallaContactos() {
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  const alternarFavorito = (id) =>
    setFavoritos((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((f) => f !== id)
        : [...anteriores, id],
    );

  // El estado 'busqueda' determina qué secciones y contactos se muestran
  const secciones = CONTACTOS.map((s) => ({
    ...s,
    data: s.data.filter((c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()),
    ),
  })).filter((s) => s.data.length > 0);

  return (
    <View style={styles.pantalla}>
      <TextInput
        style={styles.input}
        placeholder="Buscar contacto"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <SectionList
        sections={secciones}
        keyExtractor={(item) => item.id}
        extraData={favoritos}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => alternarFavorito(item.id)}
            style={styles.item}
          >
            <Text>
              {favoritos.includes(item.id) ? "★ " : "☆ "}
              {item.nombre} · {item.telefono}
            </Text>
          </Pressable>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.encabezado}>{section.title}</Text>
        )}
        renderSectionFooter={({ section }) => (
          <Text style={styles.pie}>{section.data.length} contacto(s)</Text>
        )}
        ItemSeparatorComponent={Separador}
        SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
        stickySectionHeadersEnabled
        ListEmptyComponent={<Text style={styles.vacio}>Sin resultados.</Text>}
      />
    </View>
  );
}

// ---------- App ----------
export default function ScreenPract() {
  const [pantalla, setPantalla] = useState("tareas");

  return (
    <View style={styles.contenedor}>
      <View style={styles.fila}>
        <Button title="FlatList" onPress={() => setPantalla("tareas")} />
        <Button title="SectionList" onPress={() => setPantalla("contactos")} />
      </View>
      {pantalla === "tareas" ? <PantallaTareas /> : <PantallaContactos />}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  pantalla: { flex: 1 },
  fila: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },
  titulo: { fontSize: 22, fontWeight: "bold", paddingVertical: 12 },
  encabezado: {
    backgroundColor: "#eeeeee",
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  item: { padding: 14 },
  seleccionado: { backgroundColor: "#d0e8ff" },
  separador: { height: 1, backgroundColor: "#cccccc" },
  pie: { padding: 8, color: "#666666" },
  vacio: { padding: 16, textAlign: "center" },
});