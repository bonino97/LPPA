// 4) If Else
// a) Crear un número aleatorio entre 0 y 1 utilizando la función Math.random(), si el valor es mayor o igual que 0,5 mostrar una alerta con el mensaje “Greater than 0,5” y sino un alerta con el mensaje “Lower than 0,5”
// b) Crear una variable “Age” que contenga un número entero entre 0 y 100 y muestre los siguientes mensajes de alerta:
// i) “Bebe” si la edad es menor a 2 años
// ii) “Nino” si la edad es entre 2 y 12 años
// iii) “Adolecente” si la edad es entre 13 y 19 años
// iv) “Joven” si la edad está entre 20 y 30 años
// v) “Adulto” entre 31 y 60 años
// vi) “Adulto mayor” entre 61 y 75 años
// vii) “Anciano” si es mayor a 75 años

// 4.a

let randomNumber = Math.random();
console.log(randomNumber);

if (randomNumber > 0.5) console.log('Greater than 0,5');
else console.log('Lower than 0,5');

// 4.b

let age = 75;

if (age < 2) console.log('Bebe');
else if (age >= 2 && age <= 12) console.log('Niño');
else if (age >= 13 && age <= 19) console.log('Adolescente');
else if (age >= 20 && age <= 30) console.log('Joven');
else if (age >= 31 && age <= 60) console.log('Adulto');
else if (age >= 61 && age < 75) console.log('Adulto mayor');
else if (age >= 75) console.log('Anciano');
