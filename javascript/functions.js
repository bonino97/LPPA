// 6) Funciones
// a) Crear una función suma que reciba dos valores numéricos y retorne el resultado. Ejecutar la función y guardar el resultado en una variable, mostrando el valor de dicha variable en la consola del navegador.
// b) A la función suma anterior, agregarle una validación para controlar si alguno de los parámetros no es un número, mostrar una alerta aclarando que uno de los parámetros tiene error y retornar el valor NaN como resultado.
// c) Crear una función validate integer que reciba un número como parámetro y devuelva verdadero si es un número entero.
// d) A la función suma del ejercicio 6b) agregarle una llamada que valide que los números sean enteros. En caso que haya decimales mostrar un alerta con el error y retorna el número convertido a entero (redondeado).
// e) Convertir la validación del ejercicio 6b) en una función separada y llamarla dentro de la función suma probando que todo siga funcionando igual.

// 6.a
const sumOfNumbers = (numberOne, numberTwo) => {
  return numberOne + numberTwo;
};

let sumResult = sumOfNumbers(1, 2);
console.log(sumResult);

// 6.b
const sumOfNumbersWithValidation = (numberOne, numberTwo) => {
  if (typeof numberOne === 'number' && typeof numberTwo === 'number')
    return numberOne + numberTwo;
  console.log('Some of the numbers is not a type of Number');
  return NaN;
};

let sumResultWithValidation = sumOfNumbersWithValidation(10, 1.5);
console.log(sumResultWithValidation);

// 6.c

const validateInteger = (number) => {
  if (Number.isInteger(number)) return true;
  return false;
};

let validatedInt = validateInteger(1.5);
console.log(validatedInt);

// 6.e

const validateSumOfIntegers = (numberOne, numberTwo) => {
  if (!Number.isInteger(numberOne) || !Number.isInteger(numberTwo)) {
    console.log('Some of the numbers is not Integer');
    return Math.round(numberOne) + Math.round(numberTwo);
  }
};

// 6.d

const sumOfNumbersWithIntValidation = (numberOne, numberTwo) => {
  if (typeof numberOne === 'number' && typeof numberTwo === 'number') {
    return validateSumOfIntegers(numberOne, numberTwo);
  }

  console.log('Some of the numbers is not a type of Number');
  return NaN;
};

let sumResultWithIntValidation = sumOfNumbersWithIntValidation(10, 1.5);
console.log(sumResultWithIntValidation);
