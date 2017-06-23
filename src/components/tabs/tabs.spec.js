import React       from 'react';
import { shallow } from 'enzyme';
import Tabs        from './tabs';
import accounts    from '../../mocks/accounts';

describe('The tabs component', () => {
  it('renders 1 tab button for each account passed in', () => {
    const wrapper = shallow(<Tabs active={accounts[0]} accounts={accounts} />);
    expect(wrapper.find('button').length).toBe(3);
  });

  it('adds an active class to the tab button corresponding to the active account', () => {
    const wrapper = shallow(<Tabs active={accounts[1]} accounts={accounts} />);
    expect(wrapper.find('button').get(1).props.className).toBe('tabs__button tabs__button--active');
  });  

  it('clicking on a tab calls the switchtab function passed via props', () => {
    const mockCallback = jest.fn();
    const fakeprops = { mockCallback };
    const wrapper = shallow(<Tabs active={accounts[0]} accounts={accounts} switchtab={fakeprops.mockCallback}/>);
    wrapper.find('.tabs__container').childAt(1).simulate('click');
    expect(mockCallback).toHaveBeenCalledWith(accounts[1].name);
  });
});
