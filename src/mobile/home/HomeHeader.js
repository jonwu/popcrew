import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

function generateStyles(theme) {
  return {};
}
class HomeHeader extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (

      <View style={[{alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing_1}]}>
        <TouchableOpacity
          onPress={Actions.createEventStep1}
        >
          <View style={{ borderRadius: 40, height: 48, width: 200, backgroundColor: theme.green(), alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[gstyles.p1_bold]}>Toss an idea</Text>
          </View>
        </TouchableOpacity>
        <Text style={[gstyles.caption_bold, {color: theme.text(0.5)}, gstyles.top_4]}>and we'll make it happen...</Text>
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
export default connect(mapStateToProps)(HomeHeader);
