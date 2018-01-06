// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Masthead    from '../masthead/masthead';
import Aggregator  from '../aggregator/aggregator';
import Tabs        from '../tabs';
import Purchases   from '../purchases/purchases';

type Props = {
  switchWallet: (name: string) => void,
  getAccountData: () => void,
}

class App extends Component {

  switchWallet: any;

  static propTypes = {
    switchWallet: PropTypes.func.isRequired,
    getAccountData: PropTypes.func.isRequired,
  }

  constructor(props: Props) {
    super(props);
    this.switchWallet = this.switchWallet.bind(this);
  }

  switchWallet(name: string): void {
    this.props.switchWallet(name);
  }

  render() {
    const {activeWallet, isLoading} = this.props;
    return (
      <div className="App">
        <Masthead />
        <Tabs onSwitchTab={this.switchWallet} />
        <Aggregator isLoading={isLoading} activeWallet={activeWallet} />
        <Purchases
          isLoading={isLoading}
          purchases={activeWallet.purchases}
          activeWalletName={activeWallet.name}
        />
      </div>
    );
  }

  componentDidMount() {
    this.props.getAccountData(); 
  }
}

export default App;
