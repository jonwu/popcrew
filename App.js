import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/common/configureStore';
import Root from './src/app/Root';

const { store, persistor } = configureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}
