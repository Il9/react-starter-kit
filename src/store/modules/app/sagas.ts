import { takeEvery } from 'redux-saga/effects';

import { CommonApi } from '@api';
import { ReduxUtil } from '@util';
import { ASYNC_LOGIN, asyncLogin } from '@store/modules/app/actions';

// Saga Entities
const asyncLoginSagaEntity = ReduxUtil.createAsyncSagaEntity(asyncLogin, CommonApi.authentication);

// Saga Request Action Subscription
export function* appSaga() {
  yield takeEvery(ASYNC_LOGIN.REQUEST, asyncLoginSagaEntity);
}
