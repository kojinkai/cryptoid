import { connect } from 'react-redux';
import App from './App';
import { switchWallet } from './actions';

const mapDispatchToProps = dispatch => ({
  switchWallet: tabName => dispatch(switchWallet(tabName))
});

export default connect(null, mapDispatchToProps)(App)