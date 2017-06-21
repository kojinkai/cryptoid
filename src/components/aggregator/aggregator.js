import React, { Component } from 'react';
import Indicator from '../indicator/indicator';
import './aggregator.css';

class Aggregator extends Component {

  constructor() {
    super();

    this.state = {
      account: {
        native_balance: {
          amount: 0
        }
      }
    };
  }
  
  _extractProfit(account, buys) {

    if (this.props.isLoading || buys.constructor !== Array) return;

    // move this logic to the aggregator, dummy
    // just send account and buys down
    function extractSum(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.total.amount);
    }

    function extractPercentageGrowth(startingValue, currentValue) {
      const percentageFigure = (currentValue / startingValue * 100).toFixed(2);
      return percentageFigure > 0 ?
        `+${percentageFigure}%`
        :
        `-${percentageFigure}%`;
    }

    const totalPaid  = buys.reduce(extractSum, 0);
    const balanceNow = parseFloat(account.native_balance.amount);
    const pl         = (balanceNow - totalPaid).toFixed(2);    
    const percentage = extractPercentageGrowth(totalPaid, balanceNow);
    const inProfit   = (pl > 0);

    return {
      totalPaid: `£${totalPaid} paid`,
      balanceNow: `£${balanceNow} now`,
      pl: `£${pl}`,
      percentage, 
      inProfit
    };

  }

  _getAggregateState(profit) {

    if (this.props.isLoading) {
      return true;
    }

    return profit > 0;
  }

  render() {

    const profitAndLossDefaults = {
      totalPaid: '',
      balanceNow: '',
      pl: '',
      percentage: '',
      inProfit: true
    };

    const profitAndLoss = Object.assign(profitAndLossDefaults, this._extractProfit(this.props.account, this.props.buys));

    return (
      <section className="aggregator">
        <h1 className="aggregator__pl-currency">
          <Indicator inProfit={profitAndLoss.inProfit} className="aggregator__pl-indicator" />
          <span>{profitAndLoss.pl}</span>
        </h1>
        <div className="aggregator__metadata">
          <span>{profitAndLoss.totalPaid}</span>
          <span>{profitAndLoss.balanceNow}</span>
          <span>{profitAndLoss.percentage}</span>
        </div>
      </section>
    );
  }
}

export default Aggregator;