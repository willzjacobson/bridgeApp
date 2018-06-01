import {
  LOAD_QUESTIONINSTANCES,
  LOAD_QUESTIONINSTANCES_RESULT,
  LOAD_QUESTIONINSTANCES_ERROR,
} from '../actions/questionInstances';

const initialState = {
  questionInstances: [],
  loadingQuestionInstances: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUESTIONINSTANCES:
      return {
        ...state,
        loadingQuestionInstances: true,
      };
    case LOAD_QUESTIONINSTANCES_RESULT:
      return {
        ...state,
        loadingQuestionInstances: false,
        questionInstances: action.result,
      };
    case LOAD_QUESTIONINSTANCES_ERROR:
      return {
        ...state,
        loadingQuestionInstances: false,
        error: action.error,
      };
    default:
      return state;
  }
};
