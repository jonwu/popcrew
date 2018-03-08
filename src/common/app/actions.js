import * as ActionTypes from './actionTypes';
import BackendAPI from '../api/BackendApi';
import { load } from '../loading/actions';

export function initUsers() {
  return (dispatch, getState) => {
    return BackendAPI.getUsers().then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_USERS,
        users: response.data,
      })
      return response.data;
    })
  }
}
export function initActiveEvents() {
  return (dispatch, getState) => {
    return dispatch(load('init_active_events', BackendAPI.getEvents({ status: 'active' }).then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_ACTIVE_EVENTS,
        events: response.data,
      })
      return response.data;
    })));
  }
}
export function initIdleEvents() {
  return (dispatch, getState) => {
    return dispatch(load('init_idle_events', BackendAPI.getEvents({ status: 'idle' }).then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_IDLE_EVENTS,
        events: response.data,
      })
      return response.data;
    })));
  }
}
export function initPendingEvents(params) {
  return (dispatch, getState) => {
    const userId = getState().settings.user._id;
    return BackendAPI.getEvents({ status: 'pending', user: userId }).then((response) => {
      console.log(response.data);
      dispatch({
        type: ActionTypes.UPDATE_PENDING_EVENTS,
        events: response.data,
      })
      return response.data;
    });
  }
}

export function initInvitations(params) {
  return (dispatch, getState) => {
    return dispatch(load('init_invitations', BackendAPI.getInvitations(params).then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_INVITATIONS,
        invitations: response.data,
      })
      return response.data;
    })));
  }
}

export function signUp(params) {
  return (dispatch, getState) => {
    return BackendAPI.postUser(params).then((response) => {
      console.log(response);
      dispatch({
        type: ActionTypes.SAVE_USER,
        user: response.data,
      })
      return response.data;
    });
  }
}

export function signIn(params) {
  return (dispatch, getState) => {
    return BackendAPI.signIn(params).then((response) => {
      dispatch({
        type: ActionTypes.SAVE_USER,
        user: response.data,
      })
      return response.data;
    });
  }
}
