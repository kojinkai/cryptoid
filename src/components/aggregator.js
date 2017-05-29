import React, { Component } from 'react';

class Aggregator extends Component {
  render() {
    return (
      <div className="aggregator">
        <div className="aggregator__title">
          {this.props.account.native_balance.currency === 'GBP' ? '£' : '$'}
          {this.props.account.native_balance.amount}
        </div>
        <div className="buys">
          <ul className="buys__list">
            {this.props.buys.map(buy => (
              <li key={buy.id}>{buy.total.amount}</li>
            ))}
          </ul>          
        </div>
      </div>
    );
  }
}

export default Aggregator;