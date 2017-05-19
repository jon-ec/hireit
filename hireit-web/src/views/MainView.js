import React, { Component } from 'react';
import { Header } from '../components/header'
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB-IkA3gA2QVEdkwguWrRh7Be3PGWByzHU",
   authDomain: "hireit-cd86c.firebaseapp.com",
   databaseURL: "https://hireit-cd86c.firebaseio.com",
   projectId: "hireit-cd86c",
   storageBucket: "hireit-cd86c.appspot.com",
   messagingSenderId: "561745944632"
};

export class MainView extends Component {

  constructor() {
    super();
    this.state = {
      candidates: []
    };
  }

  componentWillMount () {
    firebase.initializeApp(config);
    this.listenToDB();
  }

  listenToDB = () => {
    const candidatesRef = firebase.database().ref('candidates');

    candidatesRef.on('value', (somestuff) => {
      console.log('bsvjbdasjkvnsdkjvdsv');
    });

    candidatesRef.once('value', (somestuff) => {
      console.log('bsvjbdasjkvnsdkjvdsv');
    });

    candidatesRef.on('child_added', function(data) {
      this.setState({ candidates: this.state.candidates.concat(data.val()) });
    });

    candidatesRef.on('child_changed', function(data) {
      //this.updateCandidate(data);
    });

    candidatesRef.on('child_removed', function(data) {
      this.deleteCandidate(data);
    });
  };

  deleteCandidate = (data) => {
    const existing = this.state.candidates;
    const candidates = [].concat(existing.splice(existing.findIndex(data.key), 1));
    this.setState({ candidates });
  };

  render() {
    return (
      <div>
        <Header/>
        <ul>
          {this.state.candidates && this.state.candidates.map((candidate) => {
            return <li key={candidate.uid}>{candidate.name}</li>
          })}
        </ul>
      </div>
    );
  }
};
