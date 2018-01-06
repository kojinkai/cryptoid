import { connect } from 'react-redux';
import App from './App';
import { switchWallet, fetchAccounts } from './actions';

const mapStateToProps = state => ({
  activeWallet: state.account.get('activeWallet').toJS(),
  isLoading: state.account.get('isLoading')
});

const mapDispatchToProps = dispatch => ({
  switchWallet: tabName => dispatch(switchWallet(tabName)),
  getAccountData: () => dispatch(fetchAccounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
