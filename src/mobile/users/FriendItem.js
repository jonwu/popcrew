import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

function generateStyles(theme) {
  return {};
}
class FriendItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, user, light_gstyles, light_theme } = this.props;
    return (
      <View
        style={[{
          flexDirection: 'row',
          height: 52,
          alignItems: 'center',
          paddingHorizontal: theme.spacing_3,
          backgroundColor: 'white',
          borderLeftWidth: theme.borderWidth,
          borderRightWidth: theme.borderWidth,
          borderColor: theme.borderColor,
        }, gstyles.left_2, gstyles.right_2]}
      >
        <View>
          <Text style={light_gstyles.p1_bold}>{user.username}</Text>
          <Text style={[light_gstyles.caption_bold, { color: light_theme.text(0.5) }]}>{user.firstname} {user.lastname}</Text>
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
    light_gstyles: state.settings.light_gstyles,
    light_theme: state.settings.light_theme,
    styles: stylesSelector(state.settings.theme),
  };
}

export default connect(mapStateToProps)(FriendItem);
