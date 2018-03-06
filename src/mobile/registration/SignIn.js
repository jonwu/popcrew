import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { signIn } from '../../common/app/actions';


function generateStyles(theme) {
  return {}
}
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
    this.signIn = this.signIn.bind(this);
  }
  onSignIn() {
    const { signIn } = this.props;
    const { username } = this.state;
    signIn({ username });
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { username, firstname, lastname } = this.state;
    return (
      <View>
        <TextInput maxLength={100} value={username} onChangeText={username => this.setState({ username })}/>
        <TouchableOpacity onPress={this.onSignIn}><Text>Sign In</Text></TouchableOpacity>
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
  { signIn }
)(SignIn);
