import { takeEvery, call, put } from 'redux-saga/effects';

import {
  LOAD_QUESTIONINSTANCES,
  LOAD_QUESTIONINSTANCES_SUCCESS,
  LOAD_QUESTIONINSTANCES_ERROR,
  SUBMIT_QUESTION,
  SUBMIT_QUESTION_SUCCESS,
  SUBMIT_QUESTION_FAILURE,
} from '../actions/questionInstances';

const doFetch = (token, userId) =>
  fetch(`http://localhost:3001/api/questionInstances/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

function* fetchQuestionInstances({ token, userId }) {
  try {
    const response = yield call(doFetch, token, userId);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: LOAD_QUESTIONINSTANCES_ERROR, error: result.error });
    } else {
      yield put({ type: LOAD_QUESTIONINSTANCES_SUCCESS, result });
    }
  } catch (err) {
    yield put({ type: LOAD_QUESTIONINSTANCES_ERROR, error: err.message });
  }
}

const doUpdate = (token, questionInstanceId) =>
  fetch(`http://localhost:3001/api/questionInstances/${questionInstanceId}`, {
    method: 'PUT',
    body: JSON.stringify({ submitted: true }),
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  });

function* updateQuestionInstance({ token, questionInstanceId }) {
  try {
    const response = yield call(doUpdate, token, questionInstanceId);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: SUBMIT_QUESTION_FAILURE, error: result.error });
    } else {
      yield put({ type: SUBMIT_QUESTION_SUCCESS, questionInstanceId });
    }
  } catch (err) {
    yield put({ type: LOAD_QUESTIONINSTANCES_ERROR, error: err.message });
  }
}

export default function* watchQuestionInstances() {
  yield takeEvery(LOAD_QUESTIONINSTANCES, fetchQuestionInstances);
  yield takeEvery(SUBMIT_QUESTION, updateQuestionInstance);
}
