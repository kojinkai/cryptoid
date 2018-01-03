// @flow

import { createAction } from 'redux-actions';
import coinbaseApi from '../../api/api';
import { Wallet } from './interfaces';

export const getAccountData = createAction('GET_ACCOUNT_DATA');
export const receiveAccountData = createAction('RECEIVE_ACCOUNT_DATA');
export const errorAccountData = createAction('ERROR_ACCOUNT_DATA');
export const finishLoadingAccountData = createAction('FINISH_ACCOUNT_DATA');
export const switchWallet = createAction('SWITCH_WALLET');

export const fetchAccounts = () => dispatch => {
  dispatch(getAccountData());

  return coinbaseApi.getAccounts()
    .then(response => response.json())
    .then(accountData => {     
      accountData.data.forEach((account, index) =>
        coinbaseApi.getAccountPurchasesByID(account.id)
          .then(response => response.json())
          .then(purchases => {
            const accountWithPurchases: Array<Wallet> = {...account};
            accountWithPurchases.purchases = purchases.data;
            return accountWithPurchases;
          })
          .then(accountsWithPurchases => ({
              wallet: accountsWithPurchases,
            }))
          .then(accountState => dispatch(receiveAccountData(accountState)))
          .then(() => index === accountData.data.length - 1 && dispatch(finishLoadingAccountData()))
      )
    })
    .catch(err => console.error(err));
  };
