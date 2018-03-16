import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../utils/selectors';

function generateStyles(theme) {
  return {}
}
class CheckBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, onPress, active, activeColor, text, disabled } = this.props;
    return (
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={onPress}
      >
        <View
          style={[
            {
              flexDirection: 'row',
              height: 32,
              alignItems: 'center',
              borderRadius: theme.borderRadius,
              overflow: 'hidden',
              backgroundColor: theme.text(0.1),
              opacity: disabled ? 0.1 : null,
            },
            gstyles.right_4,
            gstyles.bottom_4,
          ]}
        >
          <View
            style={{
              width: 32,
              backgroundColor: active ? activeColor || theme.yellow() : theme.text(0.1),
              alignSelf: 'stretch',
            }}
          />
          <Text
            style={[
              gstyles.caption_bold,
              { paddingHorizontal: theme.spacing_3, color: active ? theme.text(0.8) : theme.text(0.5) },
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
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
)(CheckBox);
