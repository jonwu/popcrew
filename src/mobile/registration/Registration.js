import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

import SignUp from './SignUp';
import SignIn from './SignIn';

function generateStyles(theme) {
  return {}
}
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: true,
    }
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { isSignUp } = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {isSignUp ? <SignUp/> : <SignIn/>}
        <TouchableOpacity onPress={() => this.setState({isSignUp: !this.state.isSignUp})}>
          <Text>{isSignUp ? "Got an account? Sign in" : "Go back to sign up"}</Text>
        </TouchableOpacity>
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
)(Registration);
