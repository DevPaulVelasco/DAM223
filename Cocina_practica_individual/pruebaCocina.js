const cocina = require("./Cocina");

console.log(cocina.agregarProductos("Café", 35, 10));
console.log(cocina.agregarProductos("Té", 25, 8));

console.log("Productos:");
console.log(cocina.listarProductos());

console.log("Producto encontrado:");
console.log(cocina.buscarProductoPorId(1));

console.log("Producto editado:");
console.log(cocina.editarProductos(1, "Café Latte", 45, 6));

console.log("Producto eliminado:");
console.log(cocina.eliminarProductos(2));

console.log("Lista final:");
console.log(cocina.listarProductos());