import React from 'react';
import { shallow } from 'enzyme';
import Aggregator from './aggregator';
import purchases from '../../mocks/purchases';
import accounts from '../../mocks/accounts';

describe('when successfully rendering, the aggregator component', () => {
  it('should render an aggregate price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__pl-currency').find('span').text()).toBe('£193.94');
  });
  it('should render an total paid price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(0).text()).toBe('£606.06 paid');
  });
  it('should render a balance now', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(1).text()).toBe('£800 now');
  });
  it('should render positive percentage tilt if the account is in profit', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(2).text()).toBe('+32.00%');
  });
  it('should render negative percentage tilt if the account is in loss', () => {
    const wrapper = shallow(<Aggregator account={accounts[3]} purchases={purchases} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(2).text()).toBe('-83.50%');
  });
});

describe('when still loading the data and rendering, the aggregator component', () => {
  it('should render a blank aggregate price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ true } />);
    expect(wrapper.find('.aggregator__pl-currency').find('span').text()).toBe('');
  });
  it('should render a blank total paid price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ true } />);
    expect(wrapper.find('.aggregator__metadata').childAt(0).text()).toBe('');
  });
  it('should render a blank balance now', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ true } />);
    expect(wrapper.find('.aggregator__metadata').childAt(1).text()).toBe('');
  });
  it('should render a blank percentage tilt', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={purchases} isLoading={ true } />);
    expect(wrapper.find('.aggregator__metadata').childAt(2).text()).toBe('');
  });
});

describe('when passed a non-array type as the purchases, the aggregator component', () => {
  it('should render a blank aggregate price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={''} isLoading={ false } />);
    expect(wrapper.find('.aggregator__pl-currency').find('span').text()).toBe('');
  });
  it('should render a blank total paid price', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={''} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(0).text()).toBe('');
  });
  it('should render a blank balance now', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={''} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(1).text()).toBe('');
  });
  it('should render a blank percentage tilt', () => {
    const wrapper = shallow(<Aggregator account={accounts[0]} purchases={''} isLoading={ false } />);
    expect(wrapper.find('.aggregator__metadata').childAt(2).text()).toBe('');
  });
});
