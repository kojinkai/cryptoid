import React, { Component } from 'react';
import './App.css';
import coinbaseApi from './api/api';
import Aggregator from './components/aggregator'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pl: '',
      percentage: '',
      inprofit: true
    };
  }

  _extractProfit(state) {
    // move this logic to the aggregator, dummy
    // just send account and buys down
    function extractSum(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.total.amount);
    }

    function extractPercentageGrowth(startingValue, currentValue) {
      return (currentValue / startingValue * 100).toFixed(2);
    }

    const sumBuys = state.buys.reduce(extractSum, 0);
    const balance = parseFloat(state.account.native_balance.amount);
    const percentage = extractPercentageGrowth(sumBuys, balance);
    const pl         = balance - sumBuys;
    const inProfit   = (pl > 0);

    return {pl, percentage, inProfit};

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Cryptoid</h2>
        </div>
        <Aggregator 
          pl={this.state.pl}
          percentage={this.state.percentage} 
          inprofit={this.state.inprofit}
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
          buys: buysData.data
        });
      })
      .then(() => this.state)
      .then(this._extractProfit)
      .then(profitState => {
        this.setState({
          pl: profitState.pl,
          percentage: profitState.percentage,
          inprofit: profitState.inprofit
        });
      });


  }
}

export default App;
