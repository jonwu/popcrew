import { initUsers, initEvents, initPendingEvents } from './app/actions';
import { load } from './loading/actions';

export default function init(dispatch) {
  dispatch(initUsers());
  const initFeedItems = Promise.all([
    dispatch(initPendingEvents()),
  ]);
  dispatch(load('init_feed_items', initFeedItems));
}
