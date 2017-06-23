// @flow
import React, { Component } from 'react';
import Indicator from '../indicator/indicator';
import './aggregator.css';

interface ProfitProfile {
  totalPaid: string,
  balanceNow: string,
  profitLoss: string,
  percentage: string,
  inProfit: boolean
}

interface Account {
  id: string,
  name: string,
  balance: {
    currency: string,
    amount: number
  },
  currency: string
}

interface Purchase {
  id: string,
  total: {
    amount: string,
    currency: string
  }
}

class Aggregator extends Component {
  defaults: ProfitProfile;

  constructor() {
    super();

    this.defaults = {
      totalPaid: '',
      balanceNow: '',
      profitLoss: '',
      percentage: '',
      inProfit: true
    }
  }

  _extractSumFromPurchases(accumulator: number, purchase: Purchase): number {
    return accumulator + parseFloat(purchase.total.amount);
  }

  _extractPercentageGrowth(startingValue: number, currentValue: number): string {

    const percentageFigure: number = (currentValue / startingValue * 100);
    const clippedPercentageFigure: string = percentageFigure.toFixed(2);
    
    return percentageFigure > 0 ?
      `+${clippedPercentageFigure}%`
      :
      `-${clippedPercentageFigure}%`;
  }

  _extractProfit(account: Account, purchases: Array<Purchase>): ProfitProfile {

    if (this.props.isLoading || purchases.constructor !== Array) {
      return this.defaults;
    }

    const totalPaid  = purchases.reduce(this._extractSumFromPurchases, 0);
    const balanceNow = parseFloat(account.balance.amount);
    const profitLoss = (balanceNow - totalPaid);    
    const percentage = this._extractPercentageGrowth(totalPaid, balanceNow);
    const inProfit   = (profitLoss > 0);

    return {
      totalPaid: `£${totalPaid} paid`,
      balanceNow: `£${balanceNow} now`,
      profitLoss: `£${profitLoss.toFixed(2)}`,
      percentage, 
      inProfit
    };

  }

  render() {

    const profitStatus: ProfitProfile = Object.assign(
      this.defaults,
      this._extractProfit(this.props.account, this.props.purchases)
    );

    return (
      <section className="aggregator">
        <div className="aggregator__container">
          <h1 className="aggregator__pl-currency">
            <Indicator inProfit={profitStatus.inProfit} className="aggregator__pl-indicator" />
            <span>{profitStatus.profitLoss}</span>
          </h1>
          <div className="aggregator__metadata">
            <span>{profitStatus.totalPaid}</span>
            <span>{profitStatus.balanceNow}</span>
            <span>{profitStatus.percentage}</span>
          </div>
        </div>
      </section>
    );
  }
}

export default Aggregator;