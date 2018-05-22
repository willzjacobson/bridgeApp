import { takeEvery, call, put } from 'redux-saga/effects';

import {
  LOAD_USERS,
  LOAD_USERS_RESULT,
  LOAD_USERS_ERROR,
} from '../actions/dev';

const doFetch = token =>
  fetch('http://localhost:3001/api/users', {
    method: 'GET',
    qs: {
      q: 'email:"willjacobson1@gmail.com"',
      search_engine: 'v3',
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

function* fetchUsers({ token }) {
  try {
    const response = yield call(doFetch, token);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: LOAD_USERS_ERROR, error: result.error });
    } else {
      yield put({ type: LOAD_USERS_RESULT, result });
    }
  } catch (err) {
    yield put({ type: LOAD_USERS_ERROR, error: err.message });
  }
}

export default function* watchFetchUsers() {
  yield takeEvery(LOAD_USERS, fetchUsers);
}
