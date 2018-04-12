import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import EventItem from './EventItem';

function generateStyles(theme) {
  return {};
}

class EventList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, events } = this.props;
    return (
      <FlatList
        style={{ paddingHorizontal: theme.spacing_2, paddingTop: theme.spacing_2 }}
        contentContainerStyle={{ paddingBottom: theme.spacing_2 }}
        data={events}
        keyExtractor={item => item._id}
        renderItem={({ item, index }) => <EventItem item={item} index={index} />}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing_2 }} />}
      />
    );
  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.theme,
    gstyles: state.settings.gstyles,
    styles: stylesSelector(state.settings.theme),
    events: state.app.activeEvents,
  };
}

export default connect(mapStateToProps)(EventList);
