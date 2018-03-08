import * as ActionTypes from './actionTypes';

const FEATURES = [
  'init_active_events',
  'init_idle_events',
  'init_pending_events',
  'init_invitations',
];
const defaultState = FEATURES.reduce((previous, current) => Object.assign({}, previous, {
  [current]: {
    isRequesting: false,
    isReceived: false,
    error: null,
    updated: null,
  },
}), {});

function loading(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_DATA:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: true,
          isReceived: false,
          error: null,
        }),
      });
    case ActionTypes.RECEIVED_DATA:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: false,
          isReceived: true,
          updated: new Date().toISOString(),
        }),
      });
    case ActionTypes.CATCH_ERROR:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: false,
          error: action.error,
        }),
      });
    case ActionTypes.RESET:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: false,
          isReceived: false,
          error: null,
          updated: null,
        }),
      });
    default:
      return state;
  }
}

export default loading;
