import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Field, reduxForm } from 'redux-form'
import CustomField from './CustomField'

function validate() {
  const errors = {}
  console.log(values)
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.firstname) {
    errors.username = 'Required'
  } else if (values.firstname.length > 30) {
    errors.username = 'Must be 30 characters or less'
  }
  if (!values.lastname) {
    errors.username = 'Required'
  } else if (values.lastname.length > 30) {
    errors.username = 'Must be 30 characters or less'
  }
  return errors;
}


function generateStyles(theme) {
  return {}
}
class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { gstyles, theme, styles } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <View>
        <Field name="username" type="text" component={CustomField} label="Username"/>
        <Field name="firstname" type="text" component={CustomField} label="First Name"/>
        <Field name="lastname" type="text" component={CustomField} label="Last Name"/>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Submit!</Text>
        </TouchableOpacity>

      </View>
    )
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

export default reduxForm({
  form: 'login',
  validate: values => {
    const errors = {}

    values;
    console.log(values)
    if (!values.firstname) {
      errors.firstname = 'First name is required.'
    }

    if (!values.lastname) {
      errors.lastname = 'Last name is required.'
    }

    if (!values.email) {
      errors.email = 'Email is required.'
    }

    return errors
  }
})(LoginForm)
