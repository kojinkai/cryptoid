// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { getPrettyCurrencyFromCode, fixFloat } from '../../helpers';
import './purchases.css';

class Purchases extends Component {

  static propTypes = {
    activeWalletName: PropTypes.string.isRequired,
    purchases: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { purchases, activeWalletName } = this.props;
    const transactionDescription = `Bought ${getPrettyCurrencyFromCode(activeWalletName)}`;

    const formattedPurchases = purchases.map(purchase => {
      return (
        <div key={purchase.id} className="purchases__purchase">
          <div className="purchases__purchase-inner">
            <div className="purchases__purchase-date">
              <span>{format(new Date(purchase.created_at), 'MMM')}</span>
              <span>{format(new Date(purchase.created_at), 'D')}</span>
            </div>
            <div className="purchases__amount-bought">
              {`+${fixFloat(parseFloat(purchase.amount.amount))} ${activeWalletName}`}
            </div>
            <div className="purchases__transaction-info">
              <span className="purchases__transaction-type">
                {transactionDescription}
              </span>
            </div>
            <div className="purchases__amount-paid">
              {`£ ${purchase.total.amount} paid`}
            </div>
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