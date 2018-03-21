import React, { Component } from 'react';
import { StyleSheet, View, AppState } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from './selectors';
import BackendAPI from '../../../common/api/BackendApi';

function generateStyles(theme) {
  return {}
}
class AppStateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    }
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    const { user, pnToken } = this.props;
    if (this.state.appState.match(/inactive|active/) && nextAppState === 'background') {
      if (user && pnToken) {
        switch(pnToken.os) {
          case 'ios':
            BackendAPI.patchUser(user._id, { apn_token: pnToken.token });
            break;
          default:
            break;
        }
      }
    }
    this.setState({ appState: nextAppState });
  };
  render() {
    const { gstyles, theme, styles } = this.props;
    return null;
  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.theme,
    gstyles: state.settings.gstyles,
    styles: stylesSelector(state.settings.theme),
    user: state.settings.user,
    pnToken: state.settings.pnToken,
  };
}

export default connect(
  mapStateToProps,
)(AppStateContainer);
