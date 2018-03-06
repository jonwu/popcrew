import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';

function users(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USERS:
      return action.users;
    default:
      return state;
  }
}
function events(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_EVENTS:
      return action.events;
    default:
      return state;
  }
}
function invitations(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_INVITATIONS:
      return action.invitations;
    default:
      return state;
  }
}
export default combineReducers({
  users,
  events,
  invitations,
})
