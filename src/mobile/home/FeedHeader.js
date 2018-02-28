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
class FeedHeader extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <TouchableOpacity
        onPress={Actions.createEvent}
        style={{ paddingVertical: theme.spacing_1 }}
      >
        <Text style={[gstyles.h1, { color: theme.text(0.5) }]}>
          Got something{'\n'}you wanna do?{'\n'}
          {'\n'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text style={[gstyles.h1_bold, { color: theme.text() }]}>Toss it...</Text>
            <Text style={[gstyles.p1_bold, { color: theme.text(0.5) }]}>
              and we'll make it happen
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <Icon name="chevron-circle-right" size={48} color={theme.yellow()} />
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

export default connect(mapStateToProps)(FeedHeader);
