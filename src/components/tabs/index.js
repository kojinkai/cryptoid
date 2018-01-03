import { connect } from 'react-redux';
import Tabs from './tabs';

const mapStateToProps = state => ({
  activeWallet: state.account.get('activeWallet').toJS(),
  wallets: state.account.get('wallets').toJS()
});

export default connect(mapStateToProps)(Tabs)