import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { all } from 'redux-saga/effects';

import { uiReducer } from '@store/modules/ui';
import { loginReducer, loginSaga } from '@store/modules/login';

// Reducer Root Combine
export const rootReducer = combineReducers({
  ui: uiReducer,
  login: loginReducer
});

// Reducer Root State type
export type RootState = StateType<typeof rootReducer>;

// Sagas Root Combine
export function* rootSaga() {
  yield all([loginSaga()]);
}
