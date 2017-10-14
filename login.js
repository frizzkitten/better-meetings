var fbApp = require('./firebase');

var signup = document.getElementById('signUpBtn');
var signin = document.getElementById('signInBtn');
var email = document.getElementById('email');
var password = document.getElementById('password');

var dbButton = document.getElementById('databaseBtn');

signup.addEventListener('click', function() {
  console.log('signup clicked');

  fbApp.firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  });
});

signin.addEventListener('click', function() {
  console.log('signin clicked');

  fbApp.firebase.auth().signInWithEmailAndPassword(email.value, password.value).then( function() {
    document.location.href = 'home.html';
  }).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  })
});
