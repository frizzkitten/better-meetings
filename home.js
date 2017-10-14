const base_module = require('./firebase');

var signout = document.getElementById('signout');


signout.addEventListener('click', function() {
  console.log('signout clicked');
  base_module.fbApp.auth().signOut().then(function() {
    console.log('signed out');
    document.location.href = 'login.html';
  }, function(error) {
    console.error('sign out error', error);
})
});
