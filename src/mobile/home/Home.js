import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import HomeBody from './HomeBody';
import { Navigator } from '../app/components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

function generateStyles(theme) {
  return {};
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedHeight: new Animated.Value(0),
    };
  }
  componentDidMount() {
    if (this.props.toast) {
      Animated.sequence([
        Animated.timing(
          // Animate over time
          this.state.expandedHeight, // The animated value to drive
          {
            toValue: 40, // Animate to opacity: 1 (opaque)
            duration: 300, // Make it take a while
          },
        ),
        Animated.delay(4000),
        Animated.timing(
          // Animate over time
          this.state.expandedHeight, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 300, // Make it take a while
          },
        ),
      ]).start();
    }
    console.log('mounted Home', this.props.toast);
  }
  componentWillReceiveProps(nextProps) {
    console.log("Next Props", nextProps);
  }
  render() {
    const { gstyles, theme, styles, toast } = this.props;
    const { expandedHeight } = this.state;
    console.log('Render Home');
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg() }}>
        <Navigator
          renderLeft={() => (
            <TouchableOpacity onPress={Actions.users}>
              <View style={{ paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="md-people" size={30} color={theme.text()} />
              </View>
            </TouchableOpacity>
          )}
        />
        {toast && (
          <Animated.View
            style={{
              flexDirection: 'row',
              height: expandedHeight,
              backgroundColor: theme.red(),
              overflow: 'hidden',
              alignItems: 'center',
              paddingHorizontal: theme.spacing_2,
            }}
          >
            <Text numberOfLines={1} style={[gstyles.p1_bold, { color: theme.text() }]}>{toast}</Text>
            <View style={{ flex: 1 }}/>
          </Animated.View>
        )}
        <HomeBody />
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

export default connect(mapStateToProps)(Home);
