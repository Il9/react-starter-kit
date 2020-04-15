import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { AppState, AppAction } from '@store/modules/app/types';
import { LOGIN, ASYNC_LOGIN } from '@store/modules/app/actions';

// Reducer State
const initialState: AppState = {
  loading: false,
  auth: false
};

// Reducer
export const appReducer = createReducer<AppState, AppAction>(initialState, {
  [LOGIN]: (state, action) =>
    produce(state, draft => {
      draft.auth = action.payload;
    }),

  [ASYNC_LOGIN.REQUEST]: state =>
    produce(state, draft => {
      draft.loading = true;
    }),
  [ASYNC_LOGIN.SUCCESS]: state =>
    produce(state, draft => {
      draft.loading = false;
      draft.auth = true;
    }),
  [ASYNC_LOGIN.FAILURE]: (state, action) =>
    produce(state, draft => {
      draft.loading = false;
      draft.error = action.payload.message;
    })
});
