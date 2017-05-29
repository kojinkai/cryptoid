import React, { Component } from 'react';
import './App.css';
import coinbaseApi from './api/api';
import Aggregator from './components/aggregator'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        native_balance: {
          amount: 0.00,
          currency: 'GBP'
        }
      }
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Cryptoid</h2>
        </div>
        <Aggregator account={this.state.data}/>
      </div>
    );
  }

  componentDidMount() {
    coinbaseApi.getAccount()
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.data,
          loaded: true
        });
      });
  }
}

export default App;
