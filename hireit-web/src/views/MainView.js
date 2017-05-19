import React, { Component } from 'react';
import { Header } from '../components/header'
import { getCandidates } from '../services/candidate-service';

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
