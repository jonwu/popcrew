import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Loader } from '../app/components';
import EventList from './EventList';
import { initEvents } from '../../common/app/actions';

function generateStyles(theme) {
  return {}
}
class Events extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { user, initEvents } = this.props;
    initEvents({ userId: user._id });
  }
  render() {
    const { gstyles, theme, styles, loaderInitEvents } = this.props;
    console.log(loaderInitEvents);
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg(), paddingHorizontal: theme.spacing_2, paddingTop: theme.spacing_1 }}>
        <Loader loader={loaderInitEvents} >
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
    loaderInitEvents: state.loading.init_events,
  };
}

export default connect(
  mapStateToProps,
  { initEvents }
)(Events);
