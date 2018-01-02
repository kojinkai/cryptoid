import { handleActions } from 'redux-actions';
import { tab } from './actions';

const tabReducer = handleActions({
  [tab]: (state, action) => ({
    tab: action.payload
  })
}, { tab: 'all' });

export default tabReducer;
