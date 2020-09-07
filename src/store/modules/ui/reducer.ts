import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { UiState, UiAction } from '@store/modules/ui/types';
import { UI_THEME_TYPE_CHANGE } from '@store/modules/ui/actions';

// Reducer State
const initialState: UiState = {
  isDark: true
};

// Reducer
export const uiReducer = createReducer<UiState, UiAction>(initialState, {
  [UI_THEME_TYPE_CHANGE]: state =>
    produce(state, draft => {
      draft.isDark = !draft.isDark;
    })
});
