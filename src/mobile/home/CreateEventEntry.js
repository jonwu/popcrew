import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

function generateStyles(theme) {
  return {};
}
class CreateEventEntry extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <TouchableOpacity
        onPress={Actions.createEvent}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: theme.spacing_2, paddingTop: theme.spacing_1 * 2}}>
          <View>
            <Text style={[gstyles.h2_bold, { color: theme.text() }]}>Toss an event</Text>
            <Text style={[gstyles.p1_bold, { color: theme.text(0.5) }]}>
              and we'll make it happen
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <Icon name="chevron-circle-right" size={40} color={theme.yellow()} />
        </View>
      </TouchableOpacity>
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
export default connect(mapStateToProps)(CreateEventEntry);
