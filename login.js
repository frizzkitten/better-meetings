const base_module = require('./firebase');

var signup = document.getElementById('signUpBtn');
var signin = document.getElementById('signInBtn');
var email = document.getElementById('email');
var password = document.getElementById('password');

signup.addEventListener('click', function() {
  base_module.fbApp.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  });
});

signin.addEventListener('click', function() {
  base_module.fbApp.auth().signInWithEmailAndPassword(email.value, password.value).then( function() {
    document.location.href = 'home.html';
  }).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  })
});
