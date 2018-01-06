import { componentFactory } from '../../test/helpers';
import Purchases from './purchases';
import purchasesMock from '../../test/mocks/purchases';

const createComponentWithProps = componentFactory(Purchases, {
  isLoading: false,
  activeWalletName: 'BTC',
  purchases: purchasesMock,
});

describe('<Purchases />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = createComponentWithProps();
  });

  it('should render according the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
