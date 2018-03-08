import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from './utils/selectors';
import { Scene, Router, Actions, Stack, Tabs } from 'react-native-router-flux';
import { TabIcon } from './components';
import Home from '../home/Home';
import CreateEvent from '../create/CreateEvent';
import SelectUsers from '../create/SelectUsers';
import Registration from '../registration/Registration';
import Events from '../events/Events';
import Invitations from '../invitations/Invitations';

function generateStyles(theme) {
  return {};
}
class Root extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, user } = this.props;
    return (
      <Router>
        <Stack key="root">
          <Scene key="registration" component={Registration} onEnter={() => user && Actions.app()} hideNavBar/>
          <Tabs
            key="app"
            swipeEnabled
            showLabel={false}
            activeBackgroundColor={theme.bg()}
            inactiveBackgroundColor={theme.bg()}
            tabStyle={{ marginTop: -1 }}
          >
            <Stack key="homeTab" title="home" icon={TabIcon}>
              <Scene key="home" component={Home} hideNavBar/>
            </Stack>
            <Stack key="eventsTab" title="events" icon={TabIcon}>
              <Scene key="events" component={Events} hideNavBar/>
            </Stack>
            {/* <Stack key="invitationsTab" title="invitations" icon={TabIcon}>
              <Scene key="invitations" component={Invitations} hideNavBar/>
            </Stack> */}
          </Tabs>
          <Scene key="createEvent" component={CreateEvent} hideNavBar/>
          <Scene key="selectUsers" component={SelectUsers} hideNavBar/>
        </Stack>
      </Router>
    );
  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.theme,
    gstyles: state.settings.gstyles,
    styles: stylesSelector(state.settings.theme),
    user: state.settings.user,
  };
}

export default connect(mapStateToProps)(Root);
