import React, { Component } from 'react';
import logo from './logo.svg';
import soulName from './helpers/name/soulName';
import { capitalizeFirst } from './helpers/utils';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src="img/sprites/chirling/saylian.png" alt="chirling" />
        <h2>{capitalizeFirst(soulName())}</h2>
      </div>
    );
  }
}

export default App;
