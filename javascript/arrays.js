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
const sortedArray = arrayOfMonths.slice(); //Slice method copy array without mutate original.
sortedArray.sort();
console.log(sortedArray);

// 3.c

let addElementsToArray = arrayOfMonths.slice();
addElementsToArray.unshift('First Element');
addElementsToArray.push('Last Element');
console.log(addElementsToArray);

// 3.d
let removeElementsFromArray = arrayOfMonths.slice();
removeElementsFromArray.shift();
removeElementsFromArray.pop();
console.log(removeElementsFromArray);

// 3.e
let reverseArray = arrayOfMonths.slice();
reverseArray.reverse();
console.log(reverseArray);

// 3.f

let arrayToString = arrayOfMonths.slice();
arrayToString = arrayToString.join(' - ');
console.log(arrayToString);

// 3.g

let copyOfArrray = arrayOfMonths.slice();
copyOfArrray = copyOfArrray.slice(4, copyOfArrray.length - 1);
console.log(copyOfArrray);
