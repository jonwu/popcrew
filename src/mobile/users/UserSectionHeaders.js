import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Actions } from 'react-native-router-flux';
function generateStyles(theme) {
  return {};
}
class UserSectionHeaders extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, section, user } = this.props;
    let content = null;
    switch (section.title) {
      case 'friends':
        content = (
          <View style={{ flexDirection: 'row' }}>
            <Text style={gstyles.p1}>Friends</Text>
          </View>
        );
        break;
      case 'groups':
        content = (
          <View style={{ flexDirection: 'row' }}>
            <Text style={gstyles.p1}>Crew</Text>
            <View style={{ flex: 1 }} />
            {user.username === 'jonwu' && (
              <TouchableOpacity onPress={Actions.createGroup}>
                <Text style={gstyles.p1}>+ Create a Crew</Text>
              </TouchableOpacity>
            )}
          </View>
        );
        break;
      default:
        break;
    }
    return (
      <View
        style={{
          marginLeft: theme.spacing_2,
          marginRight: theme.spacing_2,
          marginBottom: theme.spacing_4,
          marginTop: theme.spacing_2,
        }}
      >
        {content}
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
  };
}

export default connect(mapStateToProps)(UserSectionHeaders);
