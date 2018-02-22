import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';
import collections from '../utils/themes';
import generateStyles from '../utils/gstyles';

function theme(state = collections[1], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_THEME:
      return collections[action.key];
    default:
      return state;
  }
}
function dark_theme(state = collections[1], action) {
  switch (action.type) {
    default:
      return state;
  }
}
function light_theme(state = collections[0], action) {
  switch (action.type) {
    default:
      return state;
  }
}
function gstyles(state = generateStyles(collections[1]), action) {
  switch (action.type) {
    case ActionTypes.UPDATE_THEME:
      return generateStyles(collections[action.key]);
    default:
      return state;
  }
}
function dark_gstyles(state = generateStyles(collections[1]), action) {
  switch (action.type) {
    default:
      return state;
  }
}
function light_gstyles(state = generateStyles(collections[0]), action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  theme,
  dark_theme,
  light_theme,
  gstyles,
  dark_gstyles,
  light_gstyles,
});
