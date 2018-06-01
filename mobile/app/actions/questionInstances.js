export const LOAD_QUESTIONINSTANCES = 'LOAD_QUESTIONINSTANCES';
export const LOAD_QUESTIONINSTANCES_RESULT = 'LOAD_QUESTIONINSTANCES_RESULT';
export const LOAD_QUESTIONINSTANCES_ERROR = 'LOAD_QUESTIONINSTANCES_ERROR';

export const loadQuestionInstances = (token, userId) => ({
  type: LOAD_QUESTIONINSTANCES,
  token,
  userId,
});
