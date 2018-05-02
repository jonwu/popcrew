import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import UserList from './UserList';
import { Navigator, BackIcon } from '../app/components';

function generateStyles(theme) {
  return {}
}
class Users extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, pnToken } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: theme.bg() }}>
        <Navigator
          renderLeft={() => <BackIcon/>}
        />
        <UserList />
        {pnToken && <Text style={[gstyles.p1, { color: theme.text() }]}>PN Token: {pnToken.token}</Text>}
      </View>
    );
  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.theme,
    gstyles: state.settings.gstyles,
    styles: stylesSelector(state.settings.theme),
    pnToken: state.settings.pnToken,
  };
}

export default connect(
  mapStateToProps,
)(Users);
