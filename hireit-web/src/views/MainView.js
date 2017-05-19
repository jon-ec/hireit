import React, { Component } from 'react';
import { Header } from '../components/header'
import * as firebase from 'firebase';
import './MainView.css';

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
      if (!candidates[candidate.id]) {
        candidates[candidate.id] = candidate;
        this.setState({candidates});
      }
    });

    candidatesRef.on('child_changed', (data) => {
      this.updateCandidate(data);
    });

    candidatesRef.on('child_removed', (data) => {
      this.deleteCandidate(data);
    });
  };

  updateCandidate = (data) => {
    const candidates = this.state.candidates;
    const candidateToUpdate = data.val();

    const clonedCandidates = Object.assign({}, candidates);
    Reflect.ownKeys(clonedCandidates).map((key) => {
      let candidate = this.state.candidates[key];
      if (candidate.id === candidateToUpdate.id) {
        candidate = Object.assign({}, candidate, candidateToUpdate);
        clonedCandidates[key] = candidate;
      }
    });

    this.setState({ candidates: clonedCandidates });
  };

  deleteCandidate = (data) => {
    const existing = this.state.candidates;
    const candidates = [].concat(existing.splice(existing.findIndex(data.id), 1));
    this.setState({ candidates });
  };

  renderRowHeader = () => {
    return (
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Kit Status</th>
        <th>Starting Date</th>
      </tr>
    );
  };

  renderRow = (candidate) => {
    return (
      <tr key={candidate.id}>
        <td>{candidate.firstName}</td>
        <td>{candidate.lastName}</td>
        <td>{candidate.email}</td>
        <td>{candidate.status}</td>
        <td>{candidate.kitStatus}</td>
        <td>{candidate.primaryAssignment.startsOn}</td>
      </tr>
    );
  };

  render() {
    return (
      <div className="MainView">
        <Header/>
        <table>
          <tbody>
            {this.renderRowHeader()}
            {Reflect.ownKeys(this.state.candidates).map((key) => {
              const candidate = this.state.candidates[key];
              console.log(`getting ${key} ${candidate.firstName} ${candidate.lastName}`);
              return this.renderRow(candidate);
            })}
          </tbody>
        </table>
      </div>
    );
  }
};
