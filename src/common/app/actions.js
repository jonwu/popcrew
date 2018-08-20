import * as ActionTypes from './actionTypes';
import BackendAPI from '../api/BackendApi';
import { load } from '../loading/actions';


export function initialize() {
  return (dispatch, getState) => {
    const initFeedItems = Promise.all([
      dispatch(initFeedEvents()),
      dispatch(initIdleEvents()),
      dispatch(initActiveEvents()),
      dispatch(initInvitations()),
    ]);
    dispatch(load('init_feed_items', initFeedItems));
  }
}
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
export function initGroups() {
  return (dispatch, getState) => {
    return BackendAPI.getGroups().then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_GROUPS,
        groups: response.data,
      })
      return response.data;
    })
  }
}
export function addGroup(group) {

  return {
    type: ActionTypes.ADD_GROUP,
    group,
  }
}
export function initActiveEvents() {
  return (dispatch, getState) => {
    const userId = getState().settings.user._id;
    return dispatch(load('init_active_events', BackendAPI.getEvents({ status: 'active', user: userId, expiration: 1 }).then((response) => {
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
      dispatch({
        type: ActionTypes.UPDATE_PENDING_EVENTS,
        events: response.data,
      })
      return response.data;
    });
  }
}

export function initFeedEvents(params) {
  return (dispatch, getState) => {
    const userId = getState().settings.user._id;
    // sort expiration with 1
    return BackendAPI.getEvents({ status: 'pending,processing', user: userId, expiration: 1 }).then((response) => {
      const events = response.data;
      const getInvitations = events.map(event => {
        return dispatch(initInvitations(event._id, userId));
      })
      return Promise.all(getInvitations).then((allInvitations) => {
        const sortedEvents = sortEvents(allInvitations, events);
        dispatch({
          type: ActionTypes.UPDATE_FEED_EVENTS,
          events: sortedEvents,
        })
        return sortedEvents;
      });
    });
  }
}

export function sortEvents(allInvitations, events) {
  const firstHalf = [];
  const secondHalf = [];
  allInvitations.map((invitations, i) => {
    const event = events[i];
    const invitation = invitations.length > 0 && invitations[0];
    if (invitation && invitation.status !== 'idle' && event.status === 'pending') {
      secondHalf.push(event);
    } else {
      firstHalf.push(event);
    }
  })
  return [...firstHalf, ...secondHalf];
}

export function initInvitations(eventId, userId) {
  return (dispatch, getState) => {
    return BackendAPI.getInvitations({event: eventId, user: userId}).then((response) => {
      const invitations = response.data;
      dispatch({
        type: ActionTypes.UPDATE_INVITATIONS,
        eventId,
        invitations,
      })
      return invitations;
    });
  }
}

export function signUp(params) {
  return (dispatch, getState) => {
    return BackendAPI.postUser(params).then((response) => {
      dispatch({
        type: ActionTypes.SAVE_USER,
        user: response.data,
      })
      return response.data;
    });
  }
}

export function savePnToken(token) {
  return {
    type: ActionTypes.SAVE_PN_TOKEN,
    token,
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
