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
function groups(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_GROUP:
      return [action.group, ...state];
    case ActionTypes.UPDATE_GROUPS:
      return action.groups;
    default:
      return state;
  }
}
function feedEvents(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_FEED_EVENTS:
      return action.events;
    default:
      return state;
  }
}
function activeEvents(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ACTIVE_EVENTS:
      return action.events;
    default:
      return state;
  }
}
function idleEvents(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_IDLE_EVENTS:
      return action.events;
    default:
      return state;
  }
}
function pendingEvents(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_PENDING_EVENTS:
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
  groups,
  activeEvents,
  idleEvents,
  pendingEvents,
  invitations,
  feedEvents,
})
