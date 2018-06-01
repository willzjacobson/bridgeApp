import { takeEvery, call, put } from 'redux-saga/effects';

import {
  LOAD_QUESTIONINSTANCES,
  LOAD_QUESTIONINSTANCES_RESULT,
  LOAD_QUESTIONINSTANCES_ERROR,
} from '../actions/questionInstances';

const doFetch = (token, userId) =>
  fetch(`http://localhost:3001/api/questionInstances/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

function* fetchResource({ token, userId }) {
  try {
    const response = yield call(doFetch, token, userId);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: LOAD_QUESTIONINSTANCES_ERROR, error: result.error });
    } else {
      yield put({ type: LOAD_QUESTIONINSTANCES_RESULT, result });
    }
  } catch (err) {
    yield put({ type: LOAD_QUESTIONINSTANCES_ERROR, error: err.message });
  }
}

export default function* watchFetchResource() {
  yield takeEvery(LOAD_QUESTIONINSTANCES, fetchResource);
}
