function createCandidate(uid, name, status, kitstatus) {
  // A post entry.
  var postData = {
    name: name,
    uid: uid,
    status: status,
    kitStatus: kitStatus
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/candidate/' + newPostKey] = postData;
  
  return firebase.database().ref().update(updates);
}
