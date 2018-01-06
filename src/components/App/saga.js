import { all, takeEvery, call } from 'redux-saga/effects'
// import { getAccountData, receiveAccountData, finishLoadingAccountData } from './actions';
import { getAccountData } from './actions';
import coinbaseApi from '../../api/api';

export function* getAccounts() {
  const products = yield call(coinbaseApi.getAccounts);
  console.log(products);
}

function* watchGetAccountData() {
  yield takeEvery(getAccountData().type, getAccounts);
}

export default function* rootSaga() {
  yield all([
    watchGetAccountData(),
    getAccounts(),
  ])
}