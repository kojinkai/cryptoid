// @flow
import React, { Component } from 'react';
import './tabs.css';

class Tabs extends Component {
  render() {
    return (
      <div className="tabs">
        <div className="tabs__container">
          <button className="tabs__button tabs__button--active">BTC</button>
          <button className="tabs__button">ALL</button>
          <button className="tabs__button">ETH</button>
        </div>
      </div>
    );
  }
}

export default Tabs;