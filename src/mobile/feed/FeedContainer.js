import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

function generateStyles(theme) {
  return {}
}
class FeedContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { initPendingEvents } = this.props;
    initPendingEvents();
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <View>
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
    events: state.app.pendingEvents,
  };
}

export default connect(
  mapStateToProps,
)(FeedContainer);
