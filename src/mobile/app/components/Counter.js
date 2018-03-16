import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../utils/selectors';

function generateStyles(theme) {
  return {};
}
class Counter extends Component {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      value: defaultValue || 0,
    };
  }
  render() {
    const { gstyles, theme, styles, onValueChange } = this.props;
    const { value } = this.state;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            const value = this.state.value > 1 ? this.state.value - 1 : 1;
            this.setState({ value });
            onValueChange && onValueChange(value);
          }}
        >
          <View
            style={{
              backgroundColor: theme.bg2(),
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              width: 32,
              borderRadius: theme.borderRadius,
              borderColor: theme.borderColor,
            }}
          >
            <Text style={gstyles.h4_bold}>-</Text>
          </View>
        </TouchableOpacity>
        <View style={{ width: 32, alignItems: 'center' }}>
          <Text style={gstyles.h4_bold}>{value}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            const value = this.state.value + 1;
            this.setState({ value });
            onValueChange && onValueChange(value);
          }}
        >
          <View
            style={{
              backgroundColor: theme.bg2(),
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              width: 32,
              borderRadius: theme.borderRadius,
              borderColor: theme.borderColor,
            }}
          >
            <Text style={gstyles.h4_bold}>+</Text>
          </View>
        </TouchableOpacity>
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
  };
}

export default connect(mapStateToProps)(Counter);
