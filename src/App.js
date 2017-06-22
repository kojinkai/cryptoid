// @flow
import React, { Component } from 'react';
import './App.css';
import coinbaseApi from './api/api';
import Masthead    from './components/masthead/masthead'
import Aggregator  from './components/aggregator/aggregator'

class App extends Component {

  state: {
    account: {},
    purchases: {},
    isLoading: boolean
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      account: {},
      purchases: {},
      isLoading: true
    };
  }

  render() {
    return (
      <div className="App">
        <Masthead />
        <Aggregator 
          account={this.state.account}
          purchases={this.state.purchases}
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
      .then(purchaseData => {
        this.setState({
          purchases: purchaseData.data,
          isLoading: false
        });
      })
      .catch(() => {
        console.log('api request failed');
      });


  }
}

export default App;
