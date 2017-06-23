// @flow
import React, { Component } from 'react';
import './App.css';
import coinbaseApi from './api/api';
import Masthead    from './components/masthead/masthead';
import Aggregator  from './components/aggregator/aggregator';
import Tabs        from './components/tabs/tabs';

interface Account {
  name: string,
  balance: {
    currency: string,
    amount: string
  },
  currency: string
}

class App extends Component {

  state: {
    accounts: Array<Account>,
    purchases: {},
    isLoading: boolean
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      accounts: [{
        name: '',
        balance: {
          currency: '',
          amount: ''
        },
        currency: ''
      }],
      purchases: {},
      isLoading: true
    };
  }

  render() {
    return (
      <div className="App">
        <Masthead />
        <Tabs />
        <Aggregator 
          account={this.state.accounts[0]}
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
        const data: Array<Account> = accountData.data;
        
        const overallAccountSum = data.reduce((accumulator: number, account: Account) => {
          return accumulator + parseFloat(account.balance.amount);
        }, 0);

        const overallAccount: Account = {
          name: 'ALL',
          balance: {
            amount: overallAccountSum.toString(),
            currency: 'GBP'
          },
          currency: 'GBP'
        }

        const allAccounts: Array<Account> = [...data];
        allAccounts.push(overallAccount);

        this.setState({
          accounts: allAccounts
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
