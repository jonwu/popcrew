import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

import SignUp from './SignUp';
import SignIn from './SignIn';

function generateStyles(theme) {
  return {};
}
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: true,
    };
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { isSignUp } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, paddingTop: theme.spacing_1 * 2, backgroundColor: theme.bg() }}>
          {isSignUp ? <SignUp /> : <SignIn />}
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={() => this.setState({ isSignUp: !this.state.isSignUp })}
          >
            <Text style={gstyles.p1}>
              {isSignUp ? 'Have an account already? Sign in' : 'Return to sign up'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
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

export default connect(mapStateToProps)(Registration);
