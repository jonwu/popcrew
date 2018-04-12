import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { signIn } from '../../common/app/actions';
import { Actions } from 'react-native-router-flux';

function generateStyles(theme) {
  return {
    input: {
      height: 50,
      paddingHorizontal: theme.spacing_2,
      backgroundColor: theme.text(0.1),
      marginBottom: theme.spacing_2,
      borderRadius: theme.borderRadius,
    },
  };
}
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.onSignIn = this.onSignIn.bind(this);
  }
  onSignIn() {
    const { signIn } = this.props;
    const { username } = this.state;
    signIn({ username }).then(Actions.app);
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { username, firstname, lastname } = this.state;
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
        <TouchableOpacity onPress={this.onSignIn}>
          <View
            style={{
              paddingVertical: theme.spacing_2,
              paddingHorizontal: theme.spacing_2,
              backgroundColor: theme.yellow(),
              borderRadius: theme.borderRadius,
              alignItems: 'center',
            }}
          >
            <Text style={gstyles.h4_bold}>Sign In</Text>
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

export default connect(mapStateToProps, { signIn })(SignIn);
