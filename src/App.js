// @flow
import React, { Component } from 'react';
import './App.css';
import coinbaseApi from './api/api';
import Masthead    from './components/masthead/masthead';
import Aggregator  from './components/aggregator/aggregator';
import Tabs        from './components/tabs/tabs';

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

  _addOverallAccount(accountData: { data: Array<Account> }): Array<Account> {

    const { data } = accountData;
    
    const overallAccountSum = data.reduce((accumulator: number, account: Account) => {
      return accumulator + parseFloat(account.balance.amount);
    }, 0);

    const overallAccount: Account = {
      name: 'ALL',
      id: '12345',
      balance: {
        amount: overallAccountSum.toString(),
        currency: 'GBP'
      },
      currency: 'GBP'
    }

    const allAccounts: Array<Account> = [...data];

    // splice all accounts in the middle for better layout.
    allAccounts.splice(1, 0, overallAccount);
    return allAccounts;   
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
        <Tabs 
          active={this.state.activeAccount}
          accounts={this.state.accounts}
          switchtab={this.switchTab}
        />
        <Aggregator 
          account={this.state.activeAccount}
          purchases={this.state.purchases}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }

  componentDidMount() {

    coinbaseApi.getAccounts()
      .then(response => response.json())
      .then(accountData => {

        const purchaseRequests = accountData.data.map(account => coinbaseApi.getAccountPurchasesByID(account.id));
        const aggregatedAccountsData: Array<account> = this._addOverallAccount(accountData);

        Promise.all(purchaseRequests)
          .then(responses => responses.map(response => response.json()))
          .then(requestPromises => requestPromises.forEach(
            (requestPromise, index) => requestPromise.then(requestData => {
              this.setState({
                accounts: aggregatedAccountsData,
                activeAccount: aggregatedAccountsData.filter(account => account.name === 'ALL')[0],                  
                purchases: this.state.purchases.concat(requestData.data),
                isLoading: index !== requestPromises.length - 1
              });
            })
          )
        );
      });
  }
}

export default App;
