// 5) For
// a) Crear un array que contenga 5 palabras y recorrer dicho array utilizando un bucle for de JavaScript para mostrar una alerta utilizando cada una de las palabras.
// b) Al array anterior convertir la primera letra de cada palabra en mayúscula y mostrar una alerta por cada palabra modificada.
// c) Crear una variable llamada “sentence” que tenga un string vacío, luego al array del punto a) recorrerlo con un bucle for para ir guardando cada palabra dentro de la variable sentence. Al final mostrar una única alerta con la cadena completa.
// d) Crear una array vacío y con un bucle for de 10 repeticiones llenar el array con el número de la repetición, es decir que al final de la ejecución del bucle for deberia haber 10 elementos dentro del array, desde el número 0 hasta al numero 9. Mostrar por la consola del navegador el al array final (utilizar console.log).

const arrayOfWords = ['one', 'two', 'three', 'four', 'five'];

// 5.a
for (let i = 0; i < arrayOfWords.length; i++) {
  console.log(arrayOfWords[i]);
}

// 5.b
for (let i = 0; i < arrayOfWords.length; i++) {
  console.log(
    arrayOfWords[i].substr(0, 1).toUpperCase() +
      arrayOfWords[i].substr(1, arrayOfWords[i].length)
  );
}

// 5.c
let sentence = [];

for (let i = 0; i < arrayOfWords.length; i++) {
  sentence.push(arrayOfWords[i]);
}

console.log(sentence);

// 5.d
let numbers = [];
for (let i = 1; i <= 10; i++) {
  numbers.push(i);
}

console.log(numbers);
