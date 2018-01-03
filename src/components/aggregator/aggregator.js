// @flow
import React, { Component } from 'react';
import { Wallet, ProfitProfile, Purchase } from '../../interfaces';
import Indicator from '../indicator/indicator';
import './aggregator.css';

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

  _fixFloat(floatingNumber: number, decimalPlaces: number): string {
    return floatingNumber.toFixed(decimalPlaces);
  }  

  _extractSumFromPurchases(accumulator: number, purchase: Purchase): number {
    return accumulator + parseFloat(purchase.total.amount);
  }

  _extractPercentageGrowth(startingValue: number, currentValue: number): string {

    const percentageFigure: number = (currentValue / startingValue * 100);
    
    if (percentageFigure >= 100) {

      const fixed = this._fixFloat((percentageFigure - 100), 2);
      return `+${fixed}%`

    } else {

      const fixed = this._fixFloat((100 - percentageFigure), 2);
      return `-${fixed}%`

    }
  }

  _extractProfit(activeWallet: Wallet): ProfitProfile { 
    if (this.props.isLoading) {
      return this.defaults;
    }

    const totalPaid  = this._fixFloat(activeWallet.purchases.reduce(this._extractSumFromPurchases, 0), 2);
    const balanceNow = parseFloat(activeWallet.balance.amount);
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

    const profitStatus: ProfitProfile = {
      ...this.defaults,
      ...this._extractProfit(this.props.activeWallet),
    }

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