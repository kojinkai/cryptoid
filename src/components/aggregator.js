import React, { Component } from 'react';

class Aggregator extends Component {
  render() {
    return (
      <div className="aggregator">
        <div>BTC</div>
        <h1 className="aggregator__title">
          +£{this.props.pl}
        </h1>
        <h2>Up {this.props.percentage}</h2>
      </div>
    );
  }
}

export default Aggregator;