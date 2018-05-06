import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from './reducers';
import collections from './utils/themes';
import gstyles from './utils/gstyles';
import middleware from './middleware';

const transform = createTransform(
  (inboundState, key) => {
    return inboundState;
  },
  (outboundState, key) => {
    switch (key) {
      case 'settings':
        return Object.assign({}, outboundState, {
          theme: collections[outboundState.dark_theme.id],
          dark_theme: collections[outboundState.dark_theme.id],
          light_theme: collections[outboundState.light_theme.id],
          gstyles: gstyles(collections[outboundState.dark_theme.id]),
          dark_gstyles: gstyles(collections[outboundState.dark_theme.id]),
          light_gstyles: gstyles(collections[outboundState.light_theme.id]),
        });
      default:
        return outboundState;
    }
  },
);
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings'],
  transforms: [transform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancer = composeWithDevTools(applyMiddleware(thunk, middleware));

export default initialState => {
  let store = createStore(persistedReducer, initialState, enhancer);
  let persistor = persistStore(store);
  // persistor.purge();
  return { store, persistor };
};
