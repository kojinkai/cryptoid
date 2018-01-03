import { connect } from 'react-redux';
import Tabs from './tabs';
import { tab } from './actions';

const mapDispatchToProps = dispatch => ({
  onTab: tabName => dispatch(tab(tabName))
})

const mapStateToProps = state => ({
  wallets: state.wallets
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)