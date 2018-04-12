import { initUsers, initFeedEvents, initPendingEvents, initGroups, initIdleEvents } from './app/actions';
import { load } from './loading/actions';
import axios from 'axios';

export default function init(store) {
  const dispatch = store.dispatch;
  const getState = store.getState;
  dispatch(initUsers());
  dispatch(initGroups());
}
