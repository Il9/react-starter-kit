import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { LoginState, LoginAction } from '@store/modules/login/types';
import { ASYNC_LOGIN } from '@store/modules/login/actions';

// Reducer State
const initialState: LoginState = {};

// Reducer
export const loginReducer = createReducer<LoginState, LoginAction>(initialState, {
  [ASYNC_LOGIN.REQUEST]: state => state,
  [ASYNC_LOGIN.SUCCESS]: state => state,
  [ASYNC_LOGIN.FAILURE]: (state, action) =>
    produce(state, draft => {
      draft.error = action.payload.message;
    })
});
