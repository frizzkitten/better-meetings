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

module.exports.fbApp = firebase;
