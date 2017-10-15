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
  }).then(function() {
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    //show user created message
    $('#userCreated').css({"visibility": "visible"});
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

// Press enter to login
$(document).keypress(function(e) {
  if (e.which == 13) {
    console.log('enter pressed');
    $('#signInBtn').click();
  }
})

//var working = false;
// $('#signInBtn').on('click', function(e) {
//   //actually logging in
//   base_module.fbApp.auth().signInWithEmailAndPassword(email.value, password.value).then( function() {
//       document.location.href = 'home.html';
//     }).catch(function(err) {
//       if (err != null) {
//         console.log(err.message);
//         return;
//       }
//     })
// });
