import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { all } from 'redux-saga/effects';

import { appReducer, appSaga } from '@store/modules/app';

// Reducer Root Combine
export const rootReducer = combineReducers({
  app: appReducer
});

// Reducer Root State type
export type RootState = StateType<typeof rootReducer>;

// Saga Root Combine
export function* rootSaga() {
  yield all([appSaga()]);
}
