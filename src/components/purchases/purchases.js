// @flow
import React, { Component } from 'react';
import './purchases.css';

class Purchases extends Component {
  render() {
    const purchases = this.props.purchases.map(purchase =>
      <div key={purchase.id} className="purchases__amount">{purchase.total.amount}</div>
    );

    return (
      <section className="purchases">
        {purchases}
      </section>
    );
  }
}


export default Purchases;