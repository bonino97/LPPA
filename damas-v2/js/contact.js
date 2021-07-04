function sendComment() {
  let fullName = document.getElementById('fullName').value;
  let email = document.getElementById('email').value;
  let comment = document.getElementById('comment').value;

  const data = {
    fullName,
    email,
    comment,
  };
  
  console.log(data);
  // Make a POST request
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.warn('Something went wrong.', error);
    });
}
