import React, { Component } from 'react';
import { Header } from '../components/header'
import { getCandidates } from '../services/candidate-service';
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

export class MainView extends Component {

  constructor() {
    super();
    this.state = {
      candidates: []
    };
  }

  componentWillMount () {
    getCandidates().then((candidates) =>{
      this.setState({ candidates });
    });
  }

  listenToDB() {
    var candidatesRef = firebase.ref('candidates');

    candidatesRef.on('child_added', function(data) {
      this.setState({ candidates: candidates.concat(data.val()) });
    });

    candidatesRef.on('child_changed', function(data) {
      this.updateCandidate(data);
    });

    candidatesRef.on('child_removed', function(data) {
      this.deleteCandidate(data);
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <ul>
          {this.state.candidates && this.state.candidates.map((candidate) => {
            return <li key={candidate.name}>{candidate.name}</li>
          })}
        </ul>
      </div>
    );
  }
};
