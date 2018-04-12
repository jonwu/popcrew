import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import EventUserList from '../users/EventUserList';
import moment from 'moment';

function generateStyles(theme) {
  return {};
}
class EventItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, item, index } = this.props;
    const dateConfirmed = moment(item.date_confirmed);
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          backgroundColor: theme.bg2(),
          padding: theme.spacing_2,
          borderRadius: theme.borderRadius,
        }}
      >
        <View>
          <Text style={[gstyles.h4_bold, gstyles.bottom_3]}>{item.name}</Text>
          <EventUserList users={item.users} itemStyle={{ backgroundColor: theme.bg() }} />
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ alignItems: 'center' }}>
          <Text style={gstyles.h1}>{dateConfirmed.format('D')}</Text>
          <Text style={gstyles.caption_bold}>{dateConfirmed.format('MMMM')}</Text>
        </View>
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

export default connect(mapStateToProps)(EventItem);
