import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import HomeBody from './HomeBody';
import { Navigator, Toast } from '../app/components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

function generateStyles(theme) {
  return {};
}
class Home extends Component {
  render() {
    const { gstyles, theme, styles, toast } = this.props;
  
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg() }}>
        <Navigator
          renderLeft={() => (
            <TouchableOpacity onPress={Actions.users}>
              <View
                style={{ paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="md-people" size={30} color={theme.text()} />
              </View>
            </TouchableOpacity>
          )}
        />
        {toast && <Toast toast={toast} />}
        <HomeBody />
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

export default connect(mapStateToProps)(Home);
