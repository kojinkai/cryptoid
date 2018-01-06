// @flow
import React, { Component } from 'react';
import { format } from 'date-fns';
import { getPrettyCurrencyFromCode } from '../../helpers';
import './purchases.css';

class Purchases extends Component {
  render() {
    const { purchases, activeWalletName } = this.props;
    const transactionDescription = `Bought ${getPrettyCurrencyFromCode(activeWalletName)}`;

    const formattedPurchases = purchases.map(purchase => {
      return (
        <div key={purchase.id} className="purchases__purchase-wrapper">
          <div className="purchases__purchase-date">
            <span>{format(new Date(purchase.created_at), 'MMM')}</span>
            <span>{format(new Date(purchase.created_at), 'D')}</span>
          </div>
          <div className="purchases__amount-bought">
            {purchase.amount.amount}
          </div>
          <div className="purchases__transaction-info">
            <span className="purchases__transaction-type">
              {transactionDescription}
            </span>
          </div>
          <div className="purchases__amount-paid">
            {purchase.total.amount}
          </div>
        </div>
      )
    }
    );

    return (
      <section className="purchases">
        {formattedPurchases}
      </section>
    );
  }
}


export default Purchases;