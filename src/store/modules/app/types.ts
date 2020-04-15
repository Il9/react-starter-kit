import { ActionType } from 'typesafe-actions';

import * as actions from '@store/modules/app/actions';

// Reducer State Type
export type AppState = {
  loading: boolean;
  auth: boolean;
  error?: string;
};

// Reducer Action Type
export type AppAction = ActionType<typeof actions>;
