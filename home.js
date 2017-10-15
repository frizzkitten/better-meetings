const base_module = require('./firebase');

var meetingsRef = '/meetings/'
var groupsRef = '/groups/'
var signout = document.getElementById('signout');
var dbBtn = document.getElementById('databaseBtn');
var database = base_module.fbApp.database();

function addMeeting(name) {
  var key = database.ref().child('meetings').push().key;
  database.ref(meetingsRef + key).set({
    name: name,
    group: '',
    members: '',
    date: '',
    tags: []
  });

  return key;
};

// function updateMeetingInfo(meetingKey, memberUids, date, tags) {
//   var ref = database.ref(meetingsRef + meetingKey);
//   if (memberUids) {
//
//   }
//
//   // Trim to ignore if string empty OR whitespaces
//   if (date.trim()) {
//     meeting.update({
//
//     })
//   }
//
//
// };

function addGroup(name) {
  var key = database.ref().child('groups').push().key;
  database.ref(groupsRef + key).set({
    name: name,
    meetings: {}
  });

  return key;
};


function addMeetingToGroup(meetingKey, groupKey) {
  var meeting = database.ref(meetingsRef + meetingKey);
  console.log('this crap is asnyc u butt');
  var group = database.ref(groupsRef + groupKey);

  // Update db values with references to each other
  group.child('meetings/').update({
    [meetingKey]: true
  });

  meeting.update({
    group: groupKey
  });
};



/*
Events and async stuff
*/

signout.addEventListener('click', function() {
  console.log('signout clicked');
  base_module.fbApp.auth().signOut().then(function() {
    console.log('signed out');
    document.location.href = 'login.html';
  }, function(error) {
    console.error('sign out error', error);
})
});


dbBtn.addEventListener('click', function() {
  var meetingKey = addMeeting('meeting');
  addMeeting('meeting2');
  addMeeting('meeting3');
  var meetings = database.ref(meetingsRef);
  meetings.orderByChild('key').on('child_added', function(data) {
    console.log(data.val().name + ' ' + data.val());
  });

  var groupKey = addGroup('FunTimes');
  addMeetingToGroup(meetingKey, groupKey);
});
