// Validate form.

const inputs = document.querySelectorAll('form .field input');
const textarea = document.getElementById('comment');
// Listener in inputs.
// Dont forget to use on register.

inputs.forEach((input) => {
  input.addEventListener('blur', validateInput);
});

inputs.forEach((input) => {
  input.addEventListener('input', validateInput);
});

textarea?.addEventListener('blur', validateInput);
textarea?.addEventListener('input', validateInput);

function validateInput(e) {
  const status = ['valid', 'invalid'];

  let classStatus;

  if (e.target.value.length === 0) {
    classStatus = status[1];
  } else {
    classStatus = status[0];
  }

  e.target.classList.remove(...status);
  e.target.nextElementSibling.classList.remove(...status);

  e.target.classList.add(classStatus);
  e.target.nextElementSibling.classList.add(classStatus);

  // Inject dinamically div with error.

  if (classStatus === status[1]) {
    if (e.target.parentElement.nextElementSibling.classList[0] !== 'alert') {
      // Error msg.
      const divError = document.createElement('div');
      divError.appendChild(document.createTextNode('Required field.'));
      divError.classList.add('alert');
      // Insert error.
      e.target.parentElement.parentElement.insertBefore(
        divError,
        e.target.parentElement.nextElementSibling
      );
    }
  } else {
    if (e.target.parentElement.nextElementSibling.classList[0] === 'alert') {
      e.target.parentElement.nextElementSibling.remove();
    }
  }
}
