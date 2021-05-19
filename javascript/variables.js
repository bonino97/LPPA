// 1) Variables y Operadores
// a) Crear dos variables numéricas y utilizar el operador suma para guardar el valor de la suma de ambos números en una 3er variable.
// b) Crear dos variables de tipo String y concatenarlas guardando el resultado en una 3er variable.
// c) Crear dos variables de tipo String y sumar el largo de cada variable (cantidad de letras del string) guardando el resultado la suma una 3er variable (utilizar length).

// 1.a

let numberOne = 10;
let numberTwo = 20;
const sum = numberOne + numberTwo;
console.log(sum);

// 1.b

let stringOne = 'Hello';
let stringTwo = 'World!';
const concatString = stringOne + ' ' + stringTwo;
console.log(concatString);

// 1.c

const concatStringValue = stringOne.length + stringTwo.length;
console.log(concatStringValue);
