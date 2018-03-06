import { initUsers, initEvents } from './app/actions';

export default function init(dispatch) {
  dispatch(initUsers());
  // dispatch(initEvents());
}
