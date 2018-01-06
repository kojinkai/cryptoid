// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wallet, ProfitProfile, Purchase } from '../../interfaces';
import { fixFloat } from '../../helpers';
import Indicator from '../indicator/indicator';
import './aggregator.css';

class Aggregator extends Component {

  static propTypes = {
    activeWallet: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

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
    
    if (percentageFigure >= 100) {

      const fixed = fixFloat((percentageFigure - 100));
      return `+${fixed}%`

    } else {

      const fixed = fixFloat((100 - percentageFigure));
      return `-${fixed}%`

    }
  }

  _extractProfit(activeWallet: Wallet): ProfitProfile { 
    if (this.props.isLoading) {
      return this.defaults;
    }

    const totalPaid  = fixFloat(activeWallet.purchases.reduce(this._extractSumFromPurchases, 0));
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