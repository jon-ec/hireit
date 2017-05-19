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
      candidates: {}
    };
  }

  componentWillMount () {
    firebase.initializeApp(config);
    this.listenToDB();
  }

  listenToDB = () => {
    const candidatesRef = firebase.database().ref('candidates');

    candidatesRef.once('value', (data) => {
      const candidates = data.val();
      this.setState({ candidates });
    });

    candidatesRef.on('child_added', (data) => {
      const candidate = data.val();
      const candidates = this.state.candidates;
      if (!candidates[candidate.uid]) {
        candidates[candidate.uid] = candidate;
        this.setState({candidates});
      }
    });

    candidatesRef.on('child_changed', (data) => {
      //this.updateCandidate(data);
    });

    candidatesRef.on('child_removed', (data) => {
      this.deleteCandidate(data);
    });
  };

  deleteCandidate = (data) => {
    const existing = this.state.candidates;
    const candidates = [].concat(existing.splice(existing.findIndex(data.uid), 1));
    this.setState({ candidates });
  };

  render() {
    return (
      <div>
        <Header/>
        <ul>
          {Reflect.ownKeys(this.state.candidates).map((key) => {
            const candidate = this.state.candidates[key];
            console.log(`getting ${candidate.lastName} ${key}`);
            return <li key={key}>{candidate.lastName}</li>
          })}
        </ul>
      </div>
    );
  }
};
