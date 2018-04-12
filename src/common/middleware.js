import { initialize } from './app/actions';
import { load } from './loading/actions';

const middleware = store => next => action => {
  const currState = store.getState();
  const result = next(action);
  const nextState = store.getState();
  const dispatch = store.dispatch;

  if(currState.settings.user !== nextState.settings.user) {
    dispatch(initialize());
  }
}
export default middleware;
