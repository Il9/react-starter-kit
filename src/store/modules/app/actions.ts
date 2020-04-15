import { createAction, createAsyncAction } from 'typesafe-actions';

// Action Type
export const LOGIN = `app/LOGIN`;
export const ASYNC_LOGIN = {
  REQUEST: 'app/ASYNC_LOGIN_REQUEST',
  SUCCESS: 'app/ASYNC_LOGIN_SUCCESS',
  FAILURE: 'app/ASYNC_LOGIN_FAILURE'
} as const;

// Action Creator
export const login = createAction(LOGIN)<boolean>();
export const asyncLogin = createAsyncAction(ASYNC_LOGIN.REQUEST, ASYNC_LOGIN.SUCCESS, ASYNC_LOGIN.FAILURE)<
  string,
  string,
  Error
>();
