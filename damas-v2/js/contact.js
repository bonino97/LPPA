function sendComment() {
  let fullName = document.getElementById('fullName').value;
  let email = document.getElementById('email').value;
  let comment = document.getElementById('comment').value;
  validateCommentLength();
  validateEmail(email);
  window.location.href = `mailto:${email}?subject='Hey im ${fullName}'&body=${comment}`;
}

function validateCommentLength() {
  let comment = document.forms['contactForm']['comment'].value;

  if (comment.length <= 5) {
    alert('Comment need to have more than 5 characters.');
    return false;
  }

  if (comment.length <= 5) {
    alert('Comment need to have more than 5 characters.');
    return false;
  }
}

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert('You have entered an invalid email address!');
  return false;
}
