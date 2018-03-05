import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

function generateStyles(theme) {
  return {};
}
class Field extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { input: { onChange, restInput}, label, type, meta: { touched, error, warning }, inputProps } = this.props;
    return (
      <View style={gstyles.bottom_3}>
        <TextInput
          style={{
            padding: theme.spacing_4,
            borderRadius: theme.borderRadius,
            borderColor: theme.borderColor,
            borderWidth: theme.borderWidth,
          }}
          {...restInput}
          onChangeText={onChange}
          placeholder={label}
        />
        {touched && ((error && <Text>{error}</Text>) || (warning && <Text>{warning}</Text>))}
      </View>
    );
  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.light_theme,
    gstyles: state.settings.light_gstyles,
    styles: stylesSelector(state.settings.light_theme),
  };
}

export default connect(mapStateToProps)(Field);
