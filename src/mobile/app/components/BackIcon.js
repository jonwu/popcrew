import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../utils/selectors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

function generateStyles(theme) {
  return {}
}
class BackIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <TouchableOpacity onPress={Actions.pop}>
        <View
          style={{ paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="ios-arrow-back" size={30} color={theme.text()} />
        </View>
      </TouchableOpacity>
    );
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
)(BackIcon);
