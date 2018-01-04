import { connect } from 'react-redux';
import Aggregator from './aggregator';

const mapStateToProps = state => ({
  activeWallet: state.account.get('activeWallet').toJS(),
  isLoading: state.account.get('isLoading')
});

export default connect(mapStateToProps)(Aggregator)