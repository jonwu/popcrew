import { initUsers, initFeedEvents, initPendingEvents } from './app/actions';
import { load } from './loading/actions';

export default function init(store) {
  const dispatch = store.dispatch;
  const getState = store.getState;
  dispatch(initUsers());
  
  if (getState().settings.user) {
    const initFeedItems = Promise.all([
      dispatch(initFeedEvents()),
    ]);
    dispatch(load('init_feed_items', initFeedItems));
  }
}
