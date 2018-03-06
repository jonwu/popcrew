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
export function initEvents() {
  return (dispatch, getState) => {
    return load('init_events', BackendAPI.getEvents().then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_EVENTS,
        events: response.data,
      })
      return response.data;
    }));
  }
}

export function initInvitations(params) {
  return (dispatch, getState) => {
    return load('init_invitations', BackendAPI.getInvitations(params).then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_INVITATIONS,
        invitations: response.data,
      })
      return response.data;
    }));
  }
}

export function signUp(params) {
  return (dispatch, getState) => {
    return BackendAPI.postUser(params).then((response) => {
      dispatch({
        type: ActionTypes.SAVE_USER,
        users: response.data,
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
        users: response.data,
      })
      return response.data;
    });
  }
}
