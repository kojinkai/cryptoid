// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { fetchAccounts } from './actions';
import Masthead    from '../masthead/masthead';
import Aggregator  from '../aggregator';
import Tabs        from '../tabs';

class App extends Component {

  static propTypes = {
    switchWallet: PropTypes.func.isRequired,
    getAccountData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.switchWallet = this.switchWallet.bind(this);
  }

  switchWallet: any;

  switchWallet(name: string) {
    this.props.switchWallet(name);
  }

  render() {
    return (
      <div className="App">
        <Masthead />
        <Tabs onSwitchTab={this.switchWallet} />
        <Aggregator />
      </div>
    );
  }

  componentDidMount() {
    this.props.getAccountData(); 
  }
}

export default App;
