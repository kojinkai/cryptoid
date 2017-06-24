import React from 'react';
import { shallow } from 'enzyme';
import Aggregator from './aggregator';
import purchases from '../../mocks/purchases';
import accounts from '../../mocks/accounts';

describe('when rendering the aggregator component', () => {
  it('it should render an aggregate price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__pl-currency').find('span').text()).toBe('£193.94');
  });
  it('it should render an total paid price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(0).text()).toBe('£606.06 paid');
  });
  it('it should render a balance now', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(1).text()).toBe('£800 now');
  });
  it('it should render a percentage tilt', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(2).text()).toBe('+132.00%');
  });
});
