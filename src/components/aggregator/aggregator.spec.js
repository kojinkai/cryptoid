import React from 'react';
import ReactDOM from 'react-dom';
import Aggregator from './aggregator';
import purchases from '../../mocks/purchases';
import accounts from '../../mocks/purchases';

describe('when rendering the aggregator component', () => {
  it('it renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Aggregator
      account={accounts[0]}
      purchases={purchases}
      isLoading={ false } />, div);
  });
});
