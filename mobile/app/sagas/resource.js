import { takeEvery, select, call, put } from 'redux-saga/effects';

import {
  LOAD_RESOURCE,
  LOAD_RESOURCE_RESULT,
  LOAD_RESOURCE_ERROR,
} from '../actions/dev';

const doFetch = (resource, token) =>
  fetch(`http://localhost:3001/api/${resource}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

function* fetchResource(action) {
  try {
    let { resource } = action;
    const { token } = action;
    if (resource === undefined) {
      resource = yield select(state => state.dev.defaultResource);
    }
    const response = yield call(doFetch, resource, token);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: LOAD_RESOURCE_ERROR, error: result.error });
    } else {
      yield put({ type: LOAD_RESOURCE_RESULT, resource, result });
    }
  } catch (err) {
    yield put({ type: LOAD_RESOURCE_ERROR, error: err.message });
  }
}

export default function* watchFetchResource() {
  yield takeEvery(LOAD_RESOURCE, fetchResource);
}
