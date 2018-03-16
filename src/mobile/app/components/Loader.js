import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../utils/selectors';

function generateStyles(theme) {
  return {}
}
class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loader, onError } = this.props;
    if (loader.isRequesting) return <Text>Loading</Text>
    if (loader.isReceived) return this.props.children;
    if (loader.error && onError) return onError(loader.error);
    return null;
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
)(Loader);
