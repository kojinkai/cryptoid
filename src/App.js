import React, { Component } from 'react';
import './App.css';
import Aggregator from './components/aggregator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Cryptoid</h2>
        </div>
        <Aggregator />
      </div>
    );
  }
}

export default App;
