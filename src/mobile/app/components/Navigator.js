import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../utils/selectors';

function generateStyles(theme) {
  return {};
}
class Navigator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, title, renderLeft, renderRight } = this.props;
    return (
      <View>
        <StatusBar
         backgroundColor="blue"
         barStyle="light-content"
       />
        <View style={{height: 20}}/>
        <View style={{
          height: 44,
          flexDirection: 'row',
          alignItems: 'center',
          // borderBottomWidth: theme.borderWidth,
          // borderColor: theme.borderColor,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 0.2,
        }}
      >
          {renderLeft && renderLeft()}
          <View style={{ flex: 1 }} />
          <Text style={[gstyles.p1]}>{title}</Text>
          <View style={{ flex: 1 }} />
          {renderRight && renderRight()}
        </View>
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

export default connect(mapStateToProps)(Navigator);
