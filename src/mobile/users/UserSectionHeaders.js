import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Actions } from 'react-native-router-flux';
function generateStyles(theme) {
  return {}
}
class UserSectionHeaders extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, section } = this.props;
    switch (section.title) {
      case 'friends':
        return (
          <View style={{flexDirection: 'row'}}>
            <Text>Friends</Text>
          </View>
        );
      case 'groups':
        return (
          <View style={{flexDirection: 'row'}}>
            <Text>Crew</Text>
            <View style={{flex: 1}}></View>
            <TouchableOpacity onPress={Actions.createGroup}>
              <Text>+ Create a Crew</Text>
            </TouchableOpacity>
          </View>
        );
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
)(UserSectionHeaders);
