import { all } from 'redux-saga/effects';

import watchFetchResource from './resource';
import watchFetchUsers from './user';

export default function* rootSaga() {
  yield all([watchFetchResource(), watchFetchUsers()]);
}
