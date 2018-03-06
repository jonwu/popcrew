import * as ActionTypes from './actionTypes';

export function reset(feature) {
  return {
    type: ActionTypes.RESET,
    feature,
  };
}

export function requesting(feature) {
  return {
    type: ActionTypes.REQUEST_DATA,
    feature,
  };
}

export function received(feature) {
  return {
    type: ActionTypes.RECEIVED_DATA,
    feature,
  };
}
export function catchError(feature, error) {
  return {
    type: ActionTypes.CATCH_ERROR,
    feature,
    error,
  };
}

export function load(feature, request, disableDefaultReceived = false) {
  return dispatch => {
    dispatch(requesting(feature));
    return request
      .then(response => {
        if (!disableDefaultReceived) dispatch(received(feature));
        return response;
      })
      .catch(error => {
        dispatch(catchError(feature, error));
        throw error;
      });
  };
}
