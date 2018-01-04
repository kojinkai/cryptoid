import { connect } from 'react-redux';
import App from './App';
import { switchWallet, fetchAccounts } from './actions';

const mapDispatchToProps = dispatch => ({
  switchWallet: tabName => dispatch(switchWallet(tabName)),
  getAccountData: () => dispatch(fetchAccounts()),
});

export default connect(null, mapDispatchToProps)(App)