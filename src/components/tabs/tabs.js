// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tabs.css';

class Tabs extends Component {

  static propTypes = {
    wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeWallet: PropTypes.object.isRequired,
    onSwitchTab: PropTypes.func.isRequired,
  }

  render() {

    const tabs: Array<any> = this.props.wallets.map(wallet => {

      const handleClick = (): void => {
        this.props.onSwitchTab(wallet.name);
      };

      const classes: string = wallet.name === this.props.activeWallet.name ?
        'tabs__button tabs__button--active'
        :
        'tabs__button';

      return (
        <button
          key={wallet.id}
          className={classes}
          onClick={handleClick}>
            {wallet.name}
        </button>
      );

    });
    return (
      <div className="tabs">
        <div className="tabs__container">
            {tabs}
        </div>
      </div>
    );
  }
}

export default Tabs;
