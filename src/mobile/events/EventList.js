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
        // data={[{ key: 'Play Basketball', bg: theme.red() }, { key: 'Boardgame Night!!', bg: theme.blue() }]}
        data={events}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <EventItem item={item} index={index}/>}
        ItemSeparatorComponent={() => <View style={{height: theme.spacing_2}}/>}
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
    events: state.app.events,
  };
}

export default connect(mapStateToProps)(EventList);
