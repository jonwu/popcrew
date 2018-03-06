import { combineReducers } from 'redux';
import app from './app';
import loading from './loading';

const reducers = combineReducers({
  settings: app.settings,
  app: app.reducer,
  loading: loading.reducer,
});

export default reducers;
