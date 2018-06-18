/* eslint-disable no-restricted-syntax */
import {
  LOAD_QUESTIONINSTANCES,
  LOAD_QUESTIONINSTANCES_SUCCESS,
  LOAD_QUESTIONINSTANCES_ERROR,
  SHUFFLE,
  SUBMIT_QUESTION,
  SUBMIT_QUESTION_SUCCESS,
  SUBMIT_QUESTION_FAILURE,
} from '../actions/questionInstances';

const initialState = {
  questionInstances: [],
  loadingQuestionInstances: false,
  submittingQuestion: false,
};

// function shuffleQuestionInstances(questionIndex, questionInstances) {
//   const questionCountDict = {};
//   let newInstanceArr = [
//     ...questionInstances.slice(),
//     Object.assign({}, questionInstances[questionIndex]),
//   ];

//   for (const q of newInstanceArr) {
//     questionCountDict[q.QuestionId] = questionCountDict[q.QuestionId] + 1 || 1;
//   }

//   let lastCount;
//   let truncateRequired = true;
//   console.log('keys', Object.keys(questionCountDict));
//   for (const c of Object.keys(questionCountDict)) {
//     if (
//       (questionCountDict[c] < 2 && typeof lastCount === 'number') ||
//       (questionCountDict[c] !== lastCount && typeof lastCount === 'number')
//     ) {
//       truncateRequired = false;
//       break;
//     }
//     lastCount = questionCountDict[c];
//   }

//   if (truncateRequired) {
//     console.log('truncateRequired');
//     newInstanceArr = newInstanceArr.slice(lastCount + 1);
//   }
//   console.log('LENGTH', newInstanceArr);

//   return newInstanceArr;
// }

function removeSubmittedQuestion(id, questionInstances) {
  const unsubmitted = [];

  for (const q of questionInstances) {
    if (q.id !== id) unsubmitted.push(q);
  }

  return unsubmitted;
}

export default (state = initialState, action) => {
  const { questionIndex, questionInstanceId } = action;

  switch (action.type) {
    case LOAD_QUESTIONINSTANCES:
      return {
        ...state,
        loadingQuestionInstances: true,
      };
    case LOAD_QUESTIONINSTANCES_SUCCESS:
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
    case SHUFFLE:
      return {
        ...state,
        questionInstances: [
          ...state.questionInstances.slice(),
          Object.assign({}, state.questionInstances[questionIndex]),
        ],
      };
    case SUBMIT_QUESTION:
      return {
        ...state,
        submittingQuestion: true,
      };
    case SUBMIT_QUESTION_SUCCESS:
      return {
        ...state,
        questionInstances: removeSubmittedQuestion(
          questionInstanceId,
          state.questionInstances,
        ),
        submittingQuestion: false,
      };
    case SUBMIT_QUESTION_FAILURE:
      return {
        ...state,
        submittingQuestion: false,
        error: action.error,
      };
    default:
      return state;
  }
};
