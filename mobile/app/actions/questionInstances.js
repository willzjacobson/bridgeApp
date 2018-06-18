export const LOAD_QUESTIONINSTANCES = 'LOAD_QUESTIONINSTANCES';
export const LOAD_QUESTIONINSTANCES_SUCCESS = 'LOAD_QUESTIONINSTANCES_SUCCESS';
export const LOAD_QUESTIONINSTANCES_ERROR = 'LOAD_QUESTIONINSTANCES_ERROR';
export const SHUFFLE = 'SHUFFLE';
export const SUBMIT_QUESTION = 'SUBMIT_QUESTION';
export const SUBMIT_QUESTION_SUCCESS = 'SUBMIT_QUESTION_SUCCESS';
export const SUBMIT_QUESTION_FAILURE = 'SUBMIT_QUESTION_FAILURE';

export const shuffle = questionIndex => ({ type: SHUFFLE, questionIndex });

export const submitQuestion = (token, questionInstanceId) => ({
  type: SUBMIT_QUESTION,
  token,
  questionInstanceId,
});

export const loadQuestionInstances = (token, userId) => ({
  type: LOAD_QUESTIONINSTANCES,
  token,
  userId,
});
