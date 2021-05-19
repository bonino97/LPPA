// 2) Strings
// a) Crear una variable de tipo string con al menos 10 caracteres y convertir todo el texto en mayúscula (utilizar toUpperCase).
// b) Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo string con los primeros 5 caracteres guardando el resultado en una nueva variable (utilizar substring).
// c) Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo string con los últimos 3 caracteres guardando el resultado en una nueva variable (utilizar substring).
// d) Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo string con la primera letra en mayúscula y las demás en minúscula. Guardar el resultado en una nueva variable (utilizar substring, toUpperCase, toLowerCase y el operador +).
// e) Crear una variable de tipo string con al menos 10 caracteres y algún espacio en blanco. Encontrar la posición del primer espacio en blanco y guardarla en una variable (utilizar indexOf).
// f) Crear una variable de tipo string con al menos 2 palabras largas (10 caracteres y algún espacio entre medio). Utilizar los métodos de los ejercicios anteriores para generar un nuevo string que tenga la primera letra de ambas palabras en mayúscula y las demás letras en minúscula (utilizar indexOf, substring, toUpperCase, toLowerCase y el operador +).

// 2.a

const stringExample = 'string exercises with at least ten characters.';
console.log(stringExample.toUpperCase());

// 2.b
const startOfString = stringExample.substr(0, 5);
console.log(startOfString);

// 2.c
const endOfString = stringExample.substr(stringExample.length - 3, 3);
console.log(endOfString);

// 2.d
const formattedString =
  stringExample.substr(0, 1).toUpperCase() +
  stringExample.substr(1, stringExample.length - 1).toLowerCase();
console.log(formattedString);

// 2.e
const blankSpacePosition = stringExample.indexOf(' ');
console.log(blankSpacePosition);

// 2.f
const weirdString =
  stringExample.substr(0, 1).toUpperCase() +
  stringExample.substr(1, blankSpacePosition).toLowerCase() +
  stringExample.substr(blankSpacePosition + 1, 1).toUpperCase() +
  stringExample
    .substr(blankSpacePosition + 2, stringExample.length)
    .toLowerCase();
console.log(weirdString);
