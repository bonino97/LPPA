// 3) Arrays
// a) Dado el siguiente array: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] mostrar por consola los meses 5 y 11 (utilizar console.log)
// b) Ordenar el array de meses alfabéticamente y mostrarlo por consola (utilizar sort).
// c) Agregar un elemento al principio y al final del array (utilizar unshift y push).
// d) Quitar un elemento del principio y del final del array (utilizar shift y pop).
// e) Invertir el orden del array (utilizar reverse)
// f) Unir todos los elementos del array en un único string donde cada mes este separado por un guión - (utilizar join).
// g) Crear una copia del array de meses que contenga desde Mayo hasta Noviembre (utilizar slice).

const arrayOfMonths = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

// 3.a
let monthFive = arrayOfMonths[4];
let monthEleven = arrayOfMonths[10];
console.log(monthFive);
console.log(monthEleven);

// 3.b
const sortedArray = arrayOfMonths.sort();
console.log(sortedArray);

// 3.c

let addElementsToArray = arrayOfMonths;
addElementsToArray.unshift('First Element');
addElementsToArray.push('Last Element');
console.log(addElementsToArray);
