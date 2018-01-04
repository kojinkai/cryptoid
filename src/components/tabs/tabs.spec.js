import { componentFactory } from '../../test/helpers';
import Tabs        from './tabs';
import wallets    from '../../test/mocks/wallets';

const createComponentWithProps = componentFactory(Tabs, {
    wallets,
    activeWallet: wallets[0],
    onSwitchTab: jest.fn(),
});

describe('<Tabs />', () => {

  let wrapper;
  beforeAll(() => {
    wrapper = createComponentWithProps();
  });

  it('renders 1 tab button for each account passed in', () => {
    const wrapper = createComponentWithProps();
    expect(wrapper.find('button').length).toBe(3);
  });

  it('adds an active class to the tab button corresponding to the active account', () => {
    const wrapper = createComponentWithProps({ activeWallet: wallets[1] });
    expect(wrapper.find('button').get(1).props.className).toBe('tabs__button tabs__button--active');
  });  

  it('clicking on a tab calls the onSwitchtab function passed via props', () => {
    const wrapper = createComponentWithProps();

    wrapper.find('.tabs__container').childAt(1).simulate('click');
    expect(wrapper.instance().props.onSwitchTab).toHaveBeenCalledWith(wallets[1].name);
  });
});
