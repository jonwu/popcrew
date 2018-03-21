import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import HomeList from './HomeList';
import { Navigator } from '../app/components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

function generateStyles(theme) {
  return {}
}
class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg() }}>
        <Navigator renderLeft={() => <TouchableOpacity onPress={Actions.users}>
          <View style={{ paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="md-people" size={30} color={theme.text()} />
          </View>
        </TouchableOpacity>}/>
        <HomeList/>
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

export default connect(
  mapStateToProps,
)(Home);
