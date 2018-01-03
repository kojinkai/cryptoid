import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { getAccountData, receiveAccountData, finishLoadingAccountData } from './actions';

const defaultState = fromJS({ wallets: [], isLoading: false });

const appReducer = handleActions({
  [getAccountData]: state => state.set('isLoading', true),
  [receiveAccountData]: (state, action) => state.update('wallets', wallets => wallets.push(action.payload.wallet)),
  [finishLoadingAccountData]: state => state.set('isLoading', false),
}, defaultState);

export default appReducer;
