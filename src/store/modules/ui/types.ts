import { ActionType } from 'typesafe-actions';

import * as actions from '@store/modules/ui/actions';

// Reducer State Type
export type UiState = {
  isDark: boolean;
};

// Reducer Action Type
export type UiAction = ActionType<typeof actions>;
