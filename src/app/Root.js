import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from './utils/selectors';

function generateStyles(theme) {
  return {}
}
class Root extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[gstyles.p1, {color: theme.red()}]}>
          hi
        </Text>
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

export default connect(
  mapStateToProps,
)(Root);
