import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import IdleEventItem from './IdleEventItem';
import { initIdleEvents } from '../../common/app/actions';

function generateStyles(theme) {
  return {};
}

class EventList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { gstyles, theme, styles, events } = this.props;
    const transformedEvents = events.length % 2 !== 0 ? [...events, { _id: -1 }] : events;
    return (
      <FlatList
        style={{ paddingHorizontal: theme.spacing_2 }}
        numColumns={2}
        data={transformedEvents}
        keyExtractor={item => item._id}
        renderItem={({ item, index }) => <IdleEventItem item={item} index={index} />}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing_2 }} />}
        ListHeaderComponent={() => (
          <View style={[gstyles.top_2, gstyles.bottom_2]}>
            <Text style={gstyles.p1_bold}>
              Pending Events <Text style={{ color: theme.text(0.5) }}>in no particular order</Text>
            </Text>
          </View>
        )}
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
    events: state.app.idleEvents,
  };
}

export default connect(mapStateToProps, { initIdleEvents })(EventList);
