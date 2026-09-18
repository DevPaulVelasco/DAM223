const productos = [];

function agregarProductos(nombre, precio, cantidad) {
  const producto = {
    id: productos.length + 1,
    nombre: nombre,
    precio: precio,
    cantidad: cantidad,
    disponible: true
  };

  productos.push(producto);
  return producto;
}

function listarProductos() {
  return productos;
}

function buscarProductoPorId(id) {
  return productos.find((producto) => producto.id === Number(id));
}

function editarProductos(id, nombre, precio, cantidad) {
  const posicion = productos.findIndex(
    (producto) => producto.id === Number(id)
  );

  if (posicion === -1) {
    return null;
  }

  productos[posicion].nombre = nombre;
  productos[posicion].precio = precio;
  productos[posicion].cantidad = cantidad;

  return productos[posicion];
}

function eliminarProductos(id) {
  const posicion = productos.findIndex(
    (producto) => producto.id === Number(id)
  );

  if (posicion === -1) {
    return null;
  }

  return productos.splice(posicion, 1)[0];
}

module.exports = {
  agregarProductos,
  listarProductos,
  buscarProductoPorId,
  editarProductos,
  eliminarProductos
};