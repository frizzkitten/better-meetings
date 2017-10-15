const base_module = require('./firebase');

const electron = require('electron');
const {ipcRenderer} = electron;

var meetingsRef = '/meetings/';
var groupsRef = '/groups/';
var questionsRef = '/questions/';
var signout = document.getElementById('signout');
var dbBtn = document.getElementById('databaseBtn');
var database = base_module.fbApp.database();

let accordion = $('#accordion');


//fetching functions
function fetchAllGroups() {
  // fake data
  return [
    {
      "Name": "Scrum Meetings",
      "Key": 12345,
      "MeetingKeyNames" : [
        { "Key": 9999, "Name": "Sprint 1 Day 1" },
        { "Key": 8888, "Name": "Sprint 1 Day 2" },
        { "Key": 7777, "Name": "Sprint 1 Day 3" }
      ]
    },
    {
      "Name": "Misc",
      "Key": 98765,
      "MeetingKeyNames" : [
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

// end fetching functions

// putting into DOM
function putGroupsInDOM() {
  let groups = fetchAllGroups();
  console.log(groups);

  for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
    let group = groups[groupIdx];

    let groupHTML = "";

    let groupPreNameHTML = "<div class='card'>" +
      "<div class='card-header' role='tab' id='heading" + group.Key + "'>" +
        "<h5 class='mb-0'>" +
          "<a data-toggle='collapse' href='#collapse" + group.Key + "' aria-expanded='true' aria-controls='collapse" + group.Key + "'>"

    let groupMiddleHTML = "</a></h5></div>" +
        "<div id='collapse" + group.Key + "' class='collapse' role='tabpanel' aria-labelledby='heading" + group.Key + "' data-parent='#accordion'>" +
          "<div class='card-body'><div class='row'><div class='col-4' style='max-width:100%; flex:0 0 100%'>" +
                "<div class='list-group' id='list-tab' role='tablist'>"

    let currGroupMeetingsHTML = "";

    console.log(group);

    for (let meetingIdx = 0; meetingIdx < group.MeetingKeyNames.length; meetingIdx++) {
      let meeting = group.MeetingKeyNames[meetingIdx];
      let meetingHTML = "<a class='list-group-item list-group-item-action active' id='list-" + meeting.Key + "-list' data-toggle='list' href='#list-" + meeting.Key + "' role='tab' aria-controls='" + meeting.Key + "'>" + meeting.Name + "</a>";
      currGroupMeetingsHTML = currGroupMeetingsHTML + meetingHTML;
    }

    let groupEndHTML = "</div></div></div></div></div></div>"

    // add the group to the list
    groupHTML= groupPreNameHTML + group.Name + groupMiddleHTML + currGroupMeetingsHTML + groupEndHTML;

    accordion.append(groupHTML);
  }
}

function putMeetingsInDOM() {

}

putGroupsInDOM();
putMeetingsInDOM();


// end putting into DOM

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
  console.log('getting meeting questions')
  var questions = [];
  var query = database.ref(meetingsRef + meetingKey + '/questions');
  query.once('value').then(function(snapshot){
    snapshot.forEach(function(childsnapshot) {
      console.log(childsnapshot.key);
      console.log(childsnapshot.val());
    })
  });
    // questions.push({
    //   meetingKey:,
    //   question:;
    //   details:
    // });
//  });
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


// dbBtn.addEventListener('click', function() {
//   var meetingKey = addMeeting('meeting');
//   addMeeting('meeting2');
//   addMeeting('meeting3');
//   var meetings = database.ref(meetingsRef);
//   meetings.orderByChild('key').on('child_added', function(data) {
//     console.log(data.val().name + ' ' + data.val());
//   });
//
//   var groupKey = addGroup('FunTimes');
//   addMeetingToGroup(meetingKey, groupKey);
//   var tags = ['taco', 'burrito', 'girls'];
//   var date = '1010203';
//   var uids = ['123', '456'];
//   updateMeetingInfo(meetingKey, uids, date, tags);
//   addQuestion(meetingKey, 'question and answer', 'deails');
//   addQuestion(meetingKey, 'second question', 'stuff here');
//   getMeetingQuestions(meetingKey);
// });
