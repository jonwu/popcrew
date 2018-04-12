import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import EventUserList from '../users/EventUserList';

function generateStyles(theme) {
  return {};
}
class PendingItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, item, index } = this.props;
    // console.log(item.valid_days);

    if (item._id === -1)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.bg2(0.5),
            padding: theme.spacing_2,
            borderRadius: theme.borderRadius,
            marginRight: index % 2 == 0 ? theme.spacing_2 : 0,
          }}
        />
      );
    const shortnames = item.valid_days.map(item => {
      switch (item) {
        case 'monday':
          return 'M';
        case 'tuesday':
          return 'T';
        case 'wednesday':
          return 'W';
        case 'thursday':
          return 'Th';
        case 'friday':
          return 'F';
        case 'saturday':
          return 'S';
        case 'sunday':
          return 'Su';
        default:
          return;
      }
    });
    return (
      <View
        style={{
          flex: 1,
          height: 200,
          backgroundColor: theme.bg2(),
          padding: theme.spacing_2,
          borderRadius: theme.borderRadius,
          marginRight: index % 2 == 0 ? theme.spacing_2 : 0,
        }}
      >
        <Text style={[gstyles.h4_bold, { color: theme.text() }, gstyles.bottom_4]}>{item.name}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {shortnames.map(name => {
            return (
              <View
                key={name}
                style={[{
                  height: 24,
                  width: 24,
                  marginRight: theme.spacing_5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.text(0.1),
                  borderRadius: 24,
                }, gstyles.bottom_4]}
              >
                <Text style={gstyles.footnote_bold}>{name}</Text>
              </View>
            );
          })}
        </View>
        {/* <EventUserList users={item.users} /> */}
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

export default connect(mapStateToProps)(PendingItem);
