import { createAsyncAction } from 'typesafe-actions';

import { CommonApi } from '@api';

// Action Type
export const ASYNC_LOGIN = {
  REQUEST: 'login/ASYNC_LOGIN_REQUEST',
  SUCCESS: 'login/ASYNC_LOGIN_SUCCESS',
  FAILURE: 'login/ASYNC_LOGIN_FAILURE'
} as const;

// Action Creator
export const asyncLogin = createAsyncAction(ASYNC_LOGIN.REQUEST, ASYNC_LOGIN.SUCCESS, ASYNC_LOGIN.FAILURE)<
  CommonApi.GetAuthPayload,
  CommonApi.GetAuthResponse,
  Error
>();
