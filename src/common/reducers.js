import { combineReducers } from 'redux';
import settings from './app';

const reducers = combineReducers({
  settings: settings.settings,
});

export default reducers;
