import { mockCandidates } from './mock-candidates'
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB-IkA3gA2QVEdkwguWrRh7Be3PGWByzHU",
   authDomain: "hireit-cd86c.firebaseapp.com",
   databaseURL: "https://hireit-cd86c.firebaseio.com",
   projectId: "hireit-cd86c",
   storageBucket: "hireit-cd86c.appspot.com",
   messagingSenderId: "561745944632"
};
firebase.initializeApp(config);

var candidatesRef = firebase.ref('candidates');

candidatesRef.on('child_added', function(data) {
  addCommentElement(postElement, data.key, data.val().text, data.val().author);
});

candidatesRef.on('child_changed', function(data) {
  setCommentValues(postElement, data.key, data.val().text, data.val().author);
});

candidatesRef.on('child_removed', function(data) {
  deleteComment(postElement, data.key);
});

return {

};
export firebase;
