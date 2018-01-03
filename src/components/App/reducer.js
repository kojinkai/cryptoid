import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { getAccountData, receiveAccountData, finishLoadingAccountData, switchWallet } from './actions';

const defaultState = fromJS({ wallets: [], activeWallet: { name: 'BTC' }, isLoading: false });

const appReducer = handleActions({
  [getAccountData]: state => state.set('isLoading', true),
  [receiveAccountData]: (state, action) => state.update('wallets', wallets => wallets.push(action.payload.wallet)),
  [finishLoadingAccountData]: state => state.set('isLoading', false),
  [switchWallet]: (state, action) => state.set('activeWallet', fromJS(state.get('wallets').find(val => val.name === action.payload))),
}, defaultState);

export default appReducer;
