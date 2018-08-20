import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from './utils/selectors';
import { Scene, Router, Actions, Stack, Tabs } from 'react-native-router-flux';
import { TabIcon } from './components';
import Home from '../home/Home';
import Users from '../users/Users';
import CreateEventStep1 from '../create/CreateEventStep1';
import CreateEventStep2 from '../create/CreateEventStep2';
import CreateGroup from '../create/CreateGroup';
import Registration from '../registration/Registration';
import Events from '../events/Events';
import { createTabNavigator } from 'react-navigation';

const computeDerivedRootNavigator = nextProps => {
  return createTabNavigator(
    {
      Home: Home,
      Settings: Events,
    },
    {
      tabBarPosition: 'top',
    },
  );
};
class Root extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("inside----")
    if (prevState.theme !== nextProps.theme) {
      const RootNavigator = computeDerivedRootNavigator(nextProps);
      return {
        RootNavigator,
        theme: nextProps.theme,
      };
    }
  }
  render() {
    const { gstyles, theme, styles, user } = this.props;
    const { RootNavigator } = this.state;
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.theme,
    gstyles: state.settings.gstyles,
    user: state.settings.user,
  };
}

export default connect(mapStateToProps)(Root);
