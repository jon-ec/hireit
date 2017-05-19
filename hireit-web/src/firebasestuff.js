/*<script src="https://www.gstatic.com/firebasejs/4.0.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-IkA3gA2QVEdkwguWrRh7Be3PGWByzHU",
    authDomain: "hireit-cd86c.firebaseapp.com",
    databaseURL: "https://hireit-cd86c.firebaseio.com",
    projectId: "hireit-cd86c",
    storageBucket: "hireit-cd86c.appspot.com",
    messagingSenderId: "561745944632"
  };
  firebase.initializeApp(config);
</script>*/

function addCandidate(uid, name, email, status, startingDate, kitStatus) {
  // A post entry.
  var candidateData = {
    name: name,
    email: email,
    uid: uid,
    status: status,
    startingDate: startingDate,
    kitStatus: kitStatus
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('candidates').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/candidates/' + newPostKey] = candidateData;

  return firebase.database().ref().update(updates);
}


function startDatabaseQueries() {
  var candidatePostRef = firebase.database().ref('candidates').limitToLast(100);
  
  var fetchPosts = function(postsRef) {
    postsRef.on('child_added', function(data) {
      console.log("candidate data added " + data)
    });
    postsRef.on('child_changed', function(data) {	
      console.log("candidate data changed " + data)
    });
    postsRef.on('child_removed', function(data) {
        console.log("candidate data removed " + data)
    });
  };

  // Fetching and displaying all posts of each sections.
  fetchPosts(candidatePostRef);
  
  // Keep track of all Firebase refs we are listening to.
  listeningFirebaseRefs.push(candidatePostRef);
}
