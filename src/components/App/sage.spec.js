import { call } from 'redux-saga/effects'
import coinbaseApi from '../../api/api';
import { getAccounts } from './saga';

describe('testing the get accounts sage', () => {
  it('should yield an effect call to the getAccounts API', () => {
    const iterator = getAccounts();
    const actual = iterator.next().value;
    const expected = call(coinbaseApi.getAccounts);

    expect(actual).toEqual(expected);
  });
});
