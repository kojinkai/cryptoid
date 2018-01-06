import { componentFactory } from '../../test/helpers';
import wallets from '../../test/mocks/wallets';
import App from './App';

const createComponentWithProps = componentFactory(App, {
  switchWallet: jest.fn(),
  getAccountData: jest.fn(),
  activeWallet: wallets[0],
  isLoading: false,
});

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
