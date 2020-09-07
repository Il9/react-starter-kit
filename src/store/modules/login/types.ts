import { ActionType } from 'typesafe-actions';

import * as actions from '@store/modules/login/actions';

// Reducer State Type
export type LoginState = {
  error?: string;
};

// Reducer Action Type
export type LoginAction = ActionType<typeof actions>;
