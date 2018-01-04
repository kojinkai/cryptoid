import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

function createComponentWithProps(config = {}) {
  const defaults = {
    switchWallet: jest.fn(),
    getAccountData: jest.fn(),
  };

  const props = { ...defaults, ...config };

  return shallow(<App {...props} />);
}

describe('<App />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = createComponentWithProps();
  });

  it('should render according the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call for the account data on mount', () => {
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().props.getAccountData).toHaveBeenCalled();
  });

  it('should call through to the switchWallet prop when the switchWallet method is called', () => {
    wrapper.instance().switchWallet();
    expect(wrapper.instance().props.getAccountData).toHaveBeenCalled();
  });
});
