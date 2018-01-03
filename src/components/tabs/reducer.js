import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { tab } from './actions';

const defaultState = fromJS({ activeTab: {} });

const tabReducer = handleActions({
  [tab]: (state, action) => ({
    activeTab: state.set('activeTab', state.get(action.payload)),
  })
}, defaultState);

export default tabReducer;
