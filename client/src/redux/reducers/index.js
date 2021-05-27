import { combineReducers } from 'redux';

import userReducer from './userReducer';
import testsReducer from './testsReducer';
import testReducer from './testReducer';

export default combineReducers({
    user:userReducer,
    tests:testsReducer,
    test:testReducer
});