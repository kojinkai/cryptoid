import React, { Component } from 'react';
import coinbaseApi from '../api/api';

class Aggregator extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: {
        native_balance: {
          amount: 0
        }
      },
      loaded: false
    };
  }
  
  componentDidMount() {
    coinbaseApi.getAccount()
      .then(response => response.json())
      .then(data => {
        console.log('data is: ', data.data.native_balance.amount);

        this.setState({
          data: data.data,
          loaded: true
        });
      });
    console.log('did mount son');
  }

  render() {
    return (
      <div className="aggregator">
        <div className="aggregator__title">{this.state.data.native_balance.amount}</div>
      </div>
    );
  }
}

export default Aggregator;