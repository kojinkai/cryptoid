// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { fetchAccounts } from './actions';
import Masthead    from '../masthead/masthead';
import Aggregator  from '../aggregator';
import Tabs        from '../tabs';

class App extends Component {

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
    const { dispatch } = this.props
    dispatch(fetchAccounts())
  }
}

export default connect()(App);
