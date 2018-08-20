import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../utils/selectors';

function generateStyles(theme) {
  return {}
}
class TabIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, title, focused } = this.props;
    switch(title) {
      case 'friends':
        return <View style={{height: 20, width: 20, borderRadius: 20, backgroundColor: theme.yellow()}}/>
      case 'home':
        return <View style={{height: 20, width: 20, borderRadius: 20, backgroundColor: focused ? theme.yellow() : theme.text(0.1)}}/>
      case 'events':
        return <View style={{height: 20, width: 20, borderRadius: theme.borderRadius, backgroundColor: focused ? theme.red() : theme.text(0.1)}}/>
      case 'invitations':
        return <View style={{height: 20, width: 20, borderRadius: theme.borderRadius, backgroundColor: focused ? theme.yellow() : theme.text(0.1)}}/>
      default:
        return null;
    }

  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.theme,
    gstyles: state.settings.gstyles,
    styles: stylesSelector(state.settings.theme),
  };
}

export default connect(
  mapStateToProps,
)(TabIcon);
