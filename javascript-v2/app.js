'use strict';

/* --------------------------EJERCICIO 1-------------------------- */

var num1 = 5;
var num2 = 8;

if (num1 < num2) {
  console.log('num1 no es mayor que num2');
}
if (num2 > 0) {
  console.log('num2 es positivo');
}
if (num1 < 0) {
  console.log('num1 es negativo o distinto de cero');
}
if (num1 + 10 > num2) {
  console.log(
    'Incrementar en 1 unidad el valor de num1 lo hace mayor que num2'
  );
}

/* --------------------------EJERCICIO 2-------------------------- */

let fruits = ['Manzana', 'Banana', 'Frutilla'];

for (let i = 0; i < fruits.length; i++) {
  let fruit = fruits[i];
  console.log(fruit);
}

/* --------------------------EJERCICIO 3-------------------------- */

fruits.sort();
console.log(fruits);

fruits.push('Durazno');
fruits.unshift('Tomate');
console.log(fruits);

fruits.reverse();
console.log(fruits);

let i = 0;
let stringVar = '';
while (i < fruits.length) {
  stringVar += fruits[i].toString() + ' ';
  i++;
}
console.log(stringVar);

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i].toUpperCase());
}

/* --------------------------EJERCICIO 4-------------------------- */

let textValue = 'La Manzana es Verde';

console.log(textValue.toLowerCase());
console.log(textValue.substr(textValue.length - 4));
console.log(textValue.substr(3, 3));
let wordsArray = textValue.split(' ');
console.log(wordsArray);

/* --------------------------EJERCICIO 5-------------------------- */

let textValueFive = 'testing exercise with a lot of words to upper in function';

function receiveString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let receiveStringValue = receiveString(textValueFive);
console.log(receiveStringValue);

/* --------------------------EJERCICIO 6-------------------------- */

function receiveAndModifyString(string) {
  let modifiedString = '';
  let wordsArray = string.split(' ');
  for (let i = 0; i < wordsArray.length; i++) {
    modifiedString +=
      wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1) + ' ';
  }
  return modifiedString;
}

let receiveAndModifyStringValue = receiveAndModifyString(textValueFive);
console.log(receiveAndModifyStringValue);

/* --------------------------EJERCICIO 7-------------------------- */

function countVowels(string) {
  let counted = 0;
  for (let i = 0; i < string.length; i++) {
    if (
      string.charAt(i).toLowerCase() === 'a' ||
      string.charAt(i).toLowerCase() === 'e' ||
      string.charAt(i).toLowerCase() === 'i' ||
      string.charAt(i).toLowerCase() === 'o' ||
      string.charAt(i).toLowerCase() === 'u'
    ) {
      counted++;
    }
  }
  return counted;
}

let countedVowelsValue = countVowels(textValueFive);
console.log(countedVowelsValue);

/* --------------------------EJERCICIO 8-------------------------- */

// miNumero = 16;
// miArray = array de 4 elementos sin el 5 del final.
