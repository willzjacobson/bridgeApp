import { combineReducers } from 'redux';

import dev from './dev';
import loginInfo from './loginInfo';
import questionInstances from './questionInstances';

export default combineReducers({
  dev,
  loginInfo,
  questionInstances,
});
