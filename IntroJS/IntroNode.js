console.log("Hola mundo NODE")

let edad = 20;
let edad2 = 21;
console.log("Edad Promedio: ");
console.log((edad+edad2)/2);

console.log("Medidor de Procesos");

console.time('miProceso');

 for(let i=0; i<1000000000; i++){}

console.timeEnd('miProceso');

