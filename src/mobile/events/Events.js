import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Loader, Navigator } from '../app/components';
import EventList from './EventList';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

function generateStyles(theme) {
  return {}
}
class Events extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { user } = this.props;

  }
  render() {
    const { gstyles, theme, styles, loaderInitActiveEvents } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg() }}>
        <Navigator renderLeft={() => <TouchableOpacity onPress={Actions.users}>
          <View style={{ paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="md-people" size={30} color={theme.text()} />
          </View>
        </TouchableOpacity>}/>
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
)(Events);
