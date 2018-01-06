import { createAction } from 'redux-actions';

export const getAccountData = createAction('GET_ACCOUNT_DATA');
export const receiveAccountData = createAction('RECEIVE_ACCOUNT_DATA');
export const errorAccountData = createAction('ERROR_ACCOUNT_DATA');
export const finishLoadingAccountData = createAction('FINISH_ACCOUNT_DATA');
export const switchWallet = createAction('SWITCH_WALLET');
