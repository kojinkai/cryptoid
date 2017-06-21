import React, { Component } from 'react';
import './App.css';
import coinbaseApi from './api/api';
import Aggregator from './components/aggregator/aggregator'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: {},
      buys: {},
      isLoading: true
    };
  }

  render() {
    return (
      <div className="App">
        <Aggregator 
          account={this.state.account}
          buys={this.state.buys}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }

  componentDidMount() {

    coinbaseApi.getAccount()
      .then(response => response.json())
      .then(accountData => {
        this.setState({
          account: accountData.data
        });
      })
      .then(() => coinbaseApi.getBuys())
      .then(response => response.json())
      .then(buysData => {
        this.setState({
          buys: buysData.data,
          isLoading: false
        });
      })
      .catch(() => {
        console.log('api request failed');
      });


  }
}

export default App;
