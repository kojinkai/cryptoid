import { connect } from 'react-redux';
import Tabs from './tabs';
import { tab } from './actions';

const mapDispatchToProps = dispatch => {
  return {
    onTab: tabName => {
      dispatch(tab(tabName))
    }
  }
}
export default connect(null, mapDispatchToProps)(Tabs)