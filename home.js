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
let navtabContent = $('#nav-tabContent');

let groups = []


//fetching functions


let meeting1 = {
  "Name": "Sprint 1 Day 1",
  "Key": 9999,
  "Members": [
    { "Key": 1212, "Name": "Austin Meyer" },
    { "Key": 2323, "Name": "Kevin Quinn" },
    { "Key": 3434, "Name": "Joe McKee" }
  ],
  "Tags": [
    { "Key": 1029, "Name": "Dev" },
    { "Key": 1929, "Name": "Prof Dev" }
  ],
  "Questions": [
    {
      "Key": 110243363240,
      "Question": "Problems?",
      "Details": "Worried about profits next term."
    },
    {
      "Key": 114578800,
      "Question": "Questions for the boss?",
      "Details": "What does the last quarter mean for our benefits?"
    },
  ]
}
let meeting2 = {
  "Name": "Sprint 1 Day 2",
  "Key": 9912345899,
  "Members": [
    { "Key": 1213457463452, "Name": "Remus Lupin" },
    { "Key": 2334575323, "Name": "Kevin Quinn" },
    { "Key": 323467456434, "Name": "Austin Klisch" }
  ],
  "Tags": [
    { "Key": 10456729, "Name": "Routine" },
    { "Key": 19262229, "Name": "Prof Dev" }
  ],
  "Questions": [
    {
      "Key": 110450987654,
      "Question": "Problems?",
      "Details": "None today."
    },
    {
      "Key": 15610206456,
      "Question": "Any new development ideas?",
      "Details": "If we could have those reports by Thursday that'd be greaaaaat."
    },
  ]
}
let meeting3 = {
  "Name": "Sprint 1 Day 3",
  "Key": 99121267885899,
  "Members": [
    { "Key": 12134574623453452, "Name": "Harry Potter" },
    { "Key": 23345723455323, "Name": "Draco Malfoy" },
  ],
  "Tags": [
    { "Key": 104562345729, "Name": "Marketing" },
    { "Key": 192622345229, "Name": "Dev" },
    { "Key": 192622345229, "Name": "QA" }
  ],
  "Questions": [
    {
      "Key": 110455555,
      "Question": "Problems?",
      "Details": "Lots of them."
    },
    {
      "Key": 123453450,
      "Question": "What time is it?",
      "Details": "Not the ideal one."
    },
  ]
}
let meeting4 = {
  "Name": "Dude, Where's my Car?",
  "Key": 9999,
  "Members": [
    { "Key": 1212, "Name": "Austin Meyer" },
    { "Key": 2323, "Name": "Kevin Quinn" },
    { "Key": 3434, "Name": "Joe McKee" }
  ],
  "Tags": [
    { "Key": 1029, "Name": "Dev" },
    { "Key": 1929, "Name": "Prof Dev" }
  ],
  "Questions": [
    {
      "Key": 110243363240,
      "Question": "Problems?",
      "Details": "Worried about profits next term."
    },
    {
      "Key": 114578800,
      "Question": "Questions for the boss?",
      "Details": "What does the last quarter mean for our benefits?"
    },
  ]
}
let meeting5 = {
  "Name": "Does Tina Even Lift?",
  "Key": 99123234545899,
  "Members": [
    { "Key": 12123453457463452, "Name": "Ron Weasley" },
    { "Key": 23342345575323, "Name": "Hermione Grainger" },
    { "Key": 3234234567456434, "Name": "Lucius Malfoy" }
  ],
  "Tags": [
    { "Key": 104562345729, "Name": "Routine" },
    { "Key": 192623452229, "Name": "Dev" }
  ],
  "Questions": [
    {
      "Key": 110453450987654,
      "Question": "How much longer do we need until we're in the black?",
      "Details": "Between 10 days and 13 years."
    },
    {
      "Key": 156102334506456,
      "Question": "Any new development ideas?",
      "Details": "Mars on the Moon 2065."
    },
  ]
}
let meeting6 = {
  "Name": "The Implications of McDungle",
  "Key": 991212673456885899,
  "Members": [
    { "Key": 12134534574623453452, "Name": "Cumberbatch Wiggins" },
    { "Key": 233345645723455323, "Name": "Jernerthern Merclerber" },
  ],
  "Tags": [
    { "Key": 1045623345729, "Name": "Marketing" },
    { "Key": 19262234345229, "Name": "Dev" },
    { "Key": 1926223345229, "Name": "QA" }
  ],
  "Questions": [
    {
      "Key": 1104523455555,
      "Question": "How could we do better next time?",
      "Details": "Better commmunication."
    },
    {
      "Key": 1234543253450,
      "Question": "Yellow Is the New Gray",
      "Details": "Meh, Tournament of Chairs is better."
    },
  ]
}



function fetchAllGroups() {
  // fake data
  groups =  [
    {
      "Name": "Scrum Meetings",
      "Key": 12345,
      "MeetingKeyNames" : [
        meeting1,
        meeting2,
        meeting3
      ]
    },
    {
      "Name": "Misc",
      "Key": 98765,
      "MeetingKeyNames" : [
        meeting4,
        meeting5,
        meeting6
      ]
    }
  ];
  return groups;
}

function fetchMeetingFromKey(key) {
  // fake data
  return {
    "Name": "Sprint 1 Day 1",
    "Key": 9999,
    "Members": [
      { "Key": 1212, "Name": "Austin Meyer" },
      { "Key": 2323, "Name": "Kevin Quinn" },
      { "Key": 3434, "Name": "Joe McKee" }
    ],
    "Tags": [
      { "Key": 1029, "Name": "Dev" },
      { "Key": 1929, "Name": "Prof Dev" }
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
  groups = fetchAllGroups();
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
  insertHTML = "";

  for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
    let group = groups[groupIdx];
    for (let meetingIdx = 0; meetingIdx < group.MeetingKeyNames.length; meetingIdx++) {
      let meeting = group.MeetingKeyNames[meetingIdx];

      insertHTML = insertHTML + "<div class='tab-pane fade show active' id='list-" + meeting.Key + "' role='tabpanel' aria-labelledby='list-" + meeting.Key + "-list'>" +
        "<h3 class='meeting-name'>" + meeting.Name + "</h3></div>";
    }
  }

  navtabContent.append(insertHTML);
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
  var ref = database.ref(meetingsRef + meetingKey + '/questions');
  ref.limitToLast(10).on('child_added', function(snapshot) {
    console.log(snapshot.key + snapshot.child('details').key);
  });
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
//   getMeetingQuestions(meetingKey);
// });
