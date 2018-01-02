// @flow
import React, { Component } from 'react';
import './tabs.css';

class Tabs extends Component {

  render() {

    const tabs: Array<any> = this.props.accounts.map(account => {

      const handleClick = (): void => {
        this.props.switchtab(account.name);
        // TODO remove this call as we will get active account from the store - switchtab is passed as prop from App.js
        this.props.onTab(account.name);
      };

      const classes: string = account.name === this.props.active.name ? 
        'tabs__button tabs__button--active'
        :
        'tabs__button';

      return (
        <button
          key={account.id}
          className={classes}
          onClick={handleClick}>
            {account.name}
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
