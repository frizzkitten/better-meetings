const base_module = require('./firebase');

const electron = require('electron');
const {ipcRenderer} = electron;

var meetingsRef = '/meetings/';
var groupsRef = '/groups/';
var questionsRef = '/questions/';
var signout = document.getElementById('signout');
var dbBtn = document.getElementById('databaseBtn');
var database = base_module.fbApp.database();


//fetching functions
function fetchAllGroups() {
  // fake data
  return [
    {
      "Name": "Scrum Meetings",
      "Key": 12345,
      "MeetingKeyNames: " : [
        { "Key": 9999, "Name": "Sprint 1 Day 1" },
        { "Key": 8888, "Name": "Sprint 1 Day 2" },
        { "Key": 7777, "Name": "Sprint 1 Day 3" }
      ]
    },
    {
      "Name": "Misc",
      "Key": 98765,
      "MeetingKeyNames: " : [
        { "Key": 9999, "Name": "The Rat Problem" },
        { "Key": 8888, "Name": "How Should We Spell Hannukah???" },
        { "Key": 7777, "Name": "Dude, Where's My Car?" }
      ]
    }
  ];
}

function fetchMeetingFromKey(key) {
  // fake data
  return {
    "Name": "Sprint 1 Day 1",
    "Key": 9999,
    "Members": [
      { "Key": 1212, "Name": "Austin Meyer" },
      { "Key": 2323, "Name": "Kevin Quinn" },
      { "Key": 3434, "Name": "Joe McKee (RIP)" }
    ],
    "Questions": [
      {
        "Key": "1100",
        "Question": "Problems?",
        "Details": "Kevin has a weird problem with his face. Otherwise we're all good."
      },
      {
        "Key": "1100",
        "Question": "Any new development ideas?",
        "Details": "If we could have those reports by Thursday that'd be greaaaaat."
      },
    ]
  }
}

//end fetching functions










function addMeeting(name) {
  var key = database.ref().child('meetings').push().key;
  database.ref(meetingsRef + key).set({
    name: name,
    group: '',
    members: '',
    date: '',
    tags: '',
    questions: ''
  });

  return key;
};


function getMeetingQuestions(meetingKey) {
  var ref = database.ref(meetingsRef + meetingKey + 'questions');
  var questions = ref.limitToLast(10);
  console.log('questions' );
  // This doesn't work as expected
  console.log(questions);
};


function addQuestion(meetingKey, question, details) {
  var key = database.ref().child('questions').push().key;
  database.ref(questionsRef + key).set({
    question: question,
    details: details,
    meeting: meetingKey
  });

  // Add question to meeting limit
  var ref = database.ref(meetingsRef + meetingKey);
  ref.child('questions').update({
    [key]: true
  });
};


function updateMeetingInfo(meetingKey, memberUids, date, tags) {
  var ref = database.ref(meetingsRef + meetingKey);
  if (memberUids) {
    for (uid in memberUids) {
      ref.child('members').update({
        [memberUids[uid]]: true
      });
    }
  }
  // Trim to ignore if string empty OR whitespaces
  if (date.trim()) {
    ref.update({
      date: date
    });
  }
  if (tags) {
    for (tag in tags) {
      ref.child('tags/').update({
        [tags[tag]]: true
      });
    }
  }
};


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
  var tags = ['taco', 'burrito', 'girls'];
  var date = '1010203';
  var uids = ['123', '456'];
  updateMeetingInfo(meetingKey, uids, date, tags);
  addQuestion(meetingKey, 'question and answer', 'deails');
  getMeetingQuestions(meetingKey);
});
