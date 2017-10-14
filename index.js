var render = require('./render');

var signup = document.getElementById('signUpBtn');
var signin = document.getElementById('signInBtn');
var email = document.getElementById('email');
var password = document.getElementById('password');

var dbButton = document.getElementById('databaseBtn');

signup.addEventListener('click', function() {
  console.log('signup clicked');

  render.firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  });
});

signin.addEventListener('click', function() {
  console.log('signin clicked');

  render.firebase.auth().signInWithEmailAndPassword(email.value, password.value).then( function() {
    document.location.href = 'mainWindow.html';
  }).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  })
});
