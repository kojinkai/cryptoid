// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { fetchAccountsIfNeeded } from './actions';
import Masthead    from '../masthead/masthead';
import Aggregator  from '../aggregator/aggregator';
import Tabs        from '../tabs';

interface Account {
  name: string,
  id: string,
  balance: {
    currency: string,
    amount: string
  },
  currency: string
}

class App extends Component {

  state: {
    accounts: Array<Account>,
    activeAccount: Account,
    purchases: {},
    isLoading: boolean
  };

  switchTab: any;

  constructor(props: {}) {
    super(props);

    this.state = {
      accounts: [{
        name: '',
        id: '',
        balance: {
          currency: '',
          amount: ''
        },
        currency: ''
      }],
      activeAccount: {
        name: '',
        id: '',
        balance: {
          currency: '',
          amount: ''
        },
        currency: ''
      },    
      purchases: [],
      isLoading: true
    };

    this.switchTab = this.switchTab.bind(this);
  }

  _getAccountByName(name: string, allAccounts: Array<Account>): Account {
    return allAccounts.filter(account => account.name === name)[0];
  }

  switchTab(name: string) {
    const activeAccount: Account = this._getAccountByName(name, this.state.accounts);
    this.setState({ activeAccount });
  }

  render() {
    return (
      <div className="App">
        <Masthead />
        <Tabs />
        <Aggregator 
          account={this.state.activeAccount}
          purchases={this.state.purchases}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAccountsIfNeeded())
  }
}

export default connect()(App);
