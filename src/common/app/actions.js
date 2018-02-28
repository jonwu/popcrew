import * as ActionTypes from './actionTypes';
import BackendAPI from '../api/BackendApi';

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
    return BackendAPI.getEvents().then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_EVENTS,
        events: response.data,
      })
      return response.data;
    })
  }
}
