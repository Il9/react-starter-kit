import { takeEvery } from 'redux-saga/effects';

import { CommonUtil, ReduxUtil } from '@util';
import { ApiService, AuthService } from '@service';
import { CommonApi } from '@api';
import { ASYNC_LOGIN, asyncLogin } from '@store/modules/login/actions';

// Saga Entities
const asyncLoginSagaEntity = ReduxUtil.createAsyncSagaEntity(
  asyncLogin,
  CommonApi.getAuth,
  res => {
    ApiService.setDefaultAuthorization(res.token);
    AuthService.setAuthCache(res.token);

    CommonUtil.redirect('/home/dashboard');
  },
  err => {
    // Login failed process..
    ApiService.setDefaultAuthorization('token');
    AuthService.setAuthCache('token');

    CommonUtil.redirect('/home/dashboard');
  }
);

// Saga Request Action Subscription
export function* loginSaga() {
  yield takeEvery(ASYNC_LOGIN.REQUEST, asyncLoginSagaEntity);
}
