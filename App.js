import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/common/configureStore';
import Root from './src/mobile/app/Root';
import init from './src/common/init';
import AppStateContainer from './src/mobile/app/utils/AppStateContainer';
import * as PushNotification from './src/mobile/app/utils/PushNotification';

const { store, persistor } = configureStore();
const onBeforeLift = () => {
  init(store);
  PushNotification.init(store);
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
          <AppStateContainer/>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}
