import { createAction } from 'typesafe-actions';

// Action Type
export const UI_THEME_TYPE_CHANGE = 'ui/THEME_TYPE_CHANGE';

// Action Creator
export const uiThemeTypeChange = createAction(UI_THEME_TYPE_CHANGE)();
