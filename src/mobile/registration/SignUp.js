import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { signUp } from '../../common/app/actions';


function generateStyles(theme) {
  return {}
}
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
    }
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { signUp } = this.props;
    const { username, firstname, lastname } = this.state;
    signUp({ username, firstname, lastname });
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { username, firstname, lastname } = this.state;
    return (
      <View>
        <TextInput placeholder="username" maxLength={100} value={username} onChangeText={username => this.setState({ username })}/>
        <TextInput placeholder="firstname" maxLength={100} value={firstname} onChangeText={firstname => this.setState({ firstname })}/>
        <TextInput placeholder="lastname" maxLength={100} value={lastname} onChangeText={lastname => this.setState({ lastname })}/>
        <TouchableOpacity onPress={this.onSignUp}><Text>Sign Up</Text></TouchableOpacity>
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
  { signUp }
)(SignUp);
