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
  balance: {
    amount: string,
    currency: string
  },
  created_at: string,
  currency: string,
  id: string,
  name: string,
  native_balance: {
    amount: string,
    currency: string
  },
  primary: boolean,
  resource: string,
  resource_path: string,
  type: string,
  updated_at: string
}

interface Purchase {
  amount: {
    amount: string,
    currency: string
  },
  committed: boolean,
  created_at: string,
  fees: [
    {
      amount: {
        amount: string,
        currency: string
      },
      type: string
    },
    {
      amount: {
        amount: string,
        currency: string
      },
      type: string
    }
  ],
  id: string,
  instant: boolean,
  payment_method: {
    id: string,
    resource: string,
    resource_path: string
  },
  payout_at: string,
  requires_completion_step: boolean,
  resource: string,
  resource_path: string,
  status: string,
  subtotal: {
    amount: string,
    currency: string
  },
  total: {
    amount: string,
    currency: string
  },
  transaction: {
    id: string,
    resource: string,
    resource_path: string
  },
  updated_at: string
}

class Aggregator extends Component {

  _extractPercentageGrowth(startingValue: number, currentValue: number): string {

    const percentageFigure: number = (currentValue / startingValue * 100);
    const clippedPercentageFigure: string = percentageFigure.toFixed(2);
    
    return percentageFigure > 0 ?
      `+${clippedPercentageFigure}%`
      :
      `-${clippedPercentageFigure}%`;
  }

  _extractSumFromPurchases(accumulator: number, purchase: Purchase): number {
    return accumulator + parseFloat(purchase.total.amount);
  }

  _extractProfit(account: Account, purchases: Array<Purchase>): ProfitProfile {

    if (this.props.isLoading || purchases.constructor !== Array) {
      return {
        totalPaid: '',
        balanceNow: '',
        profitLoss: '',
        percentage: '',
        inProfit: true
      };
    }

    const totalPaid  = purchases.reduce(this._extractSumFromPurchases, 0);
    const balanceNow = parseFloat(account.native_balance.amount);
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

    const profitStatusDefaults: ProfitProfile = {
      totalPaid: '',
      balanceNow: '',
      profitLoss: '',
      percentage: '',
      inProfit: true
    };

    const profitStatus: ProfitProfile = Object.assign(
      profitStatusDefaults,
      this._extractProfit(this.props.account, this.props.buys)
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