// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQ40OPShvW_5LrnAQBtLvLWPVkL_Q4zVE",
  authDomain: "better-meetings-9f5bd.firebaseapp.com",
  databaseURL: "https://better-meetings-9f5bd.firebaseio.com",
  projectId: "better-meetings-9f5bd",
  storageBucket: "better-meetings-9f5bd.appspot.com",
  messagingSenderId: "510273713118"
};
firebase.initializeApp(config);


var signup = document.getElementById('signUpBtn');
var signin = document.getElementById('signInBtn');
var email = document.getElementById('email');
var password = document.getElementById('password');

var dbButton = document.getElementById('databaseBtn');

signup.addEventListener('click', function() {
  console.log('signup clicked');

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  });
});

signin.addEventListener('click', function() {
  console.log('signin clicked');

  firebase.auth().signInWithEmailAndPassword(email.value, password.value).then( function() {
    document.location.href = 'mainWindow.html';
  }).catch(function(err) {
    if (err != null) {
      console.log(err.message);
      return;
    }
  })
});
// dbButton.addEventListener('click', function() {
//   firebase.database().ref('/users/' + firebase.auth().currentUser.uid).set({
//     username: 'taco@trello.com',
//     email: 'taco@trello.com',
//   });
// });
