import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { signUp } from '../../common/app/actions';
import { Actions } from 'react-native-router-flux';

function generateStyles(theme) {
  return {
    input: {
      height: 50,
      paddingHorizontal: theme.spacing_2,
      backgroundColor: theme.text(0.1),
      marginBottom: theme.spacing_2,
      borderRadius: theme.borderRadius,
    }
  };
}
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      codename: '',
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { signUp } = this.props;
    const { username, firstname, lastname, codename } = this.state;
    signUp({ username, firstname, lastname, codename }).then(Actions.app).catch(err => alert(err));
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { username, firstname, lastname, codename } = this.state;
    return (
      <View style={{padding: theme.spacing_2}}>
        <TextInput
          style={[gstyles.h4, styles.input]}
          placeholderTextColor={theme.text(0.5)}
          placeholder="Username"
          maxLength={100}
          value={username}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={[gstyles.h4, styles.input]}
          placeholderTextColor={theme.text(0.5)}
          placeholder="First Name"
          maxLength={100}
          value={firstname}
          onChangeText={firstname => this.setState({ firstname })}
        />
        <TextInput
          style={[gstyles.h4, styles.input]}
          placeholderTextColor={theme.text(0.5)}
          placeholder="Last Name"
          maxLength={100}
          value={lastname}
          onChangeText={lastname => this.setState({ lastname })}
        />
        <TextInput
          style={[gstyles.h4, styles.input]}
          placeholderTextColor={theme.text(0.5)}
          placeholder="Group Secret Code"
          maxLength={100}
          value={codename}
          onChangeText={codename => this.setState({ codename })}
        />
        <TouchableOpacity onPress={this.onSignUp}>
          <View
            style={{
              paddingVertical: theme.spacing_2,
              paddingHorizontal: theme.spacing_2,
              backgroundColor: theme.yellow(),
              borderRadius: theme.borderRadius,
              alignItems: 'center',
            }}
          >
            <Text style={gstyles.h4_bold}>Sign Up</Text>
          </View>
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

export default connect(mapStateToProps, { signUp })(SignUp);
