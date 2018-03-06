import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Loader } from '../app/components';
import EventList from './EventList';
import { initActiveEvents } from '../../common/app/actions';

function generateStyles(theme) {
  return {}
}
class Events extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { user, initActiveEvents } = this.props;
    initActiveEvents({ userId: user._id });
  }
  render() {
    const { gstyles, theme, styles, loaderInitActiveEvents } = this.props;
    console.log(loaderInitActiveEvents);
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg(), paddingHorizontal: theme.spacing_2, paddingTop: theme.spacing_1 }}>
        <Loader loader={loaderInitActiveEvents} >
          <EventList />
        </Loader>
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
    user: state.settings.user,
    loaderInitActiveEvents: state.loading.init_active_events,
  };
}

export default connect(
  mapStateToProps,
  { initActiveEvents }
)(Events);
