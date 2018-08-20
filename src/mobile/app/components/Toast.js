import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { generateStylesSelector } from '../utils/selectors';

function generateStyles(theme) {
  return {};
}
class Toast extends Component {
  state = {
    expandedHeight: new Animated.Value(0),
  };

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
  }
  render() {
    const { gstyles, theme, styles, toast } = this.props;
    const { expandedHeight } = this.state;
    
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          height: expandedHeight,
          backgroundColor: theme.red(),
          overflow: 'hidden',
          alignItems: 'center',
          paddingHorizontal: theme.spacing_2,
        }}>
        <Text numberOfLines={1} style={[gstyles.p1_bold, { color: theme.text() }]}>
          {toast}
        </Text>
        <View style={{ flex: 1 }} />
      </Animated.View>
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

export default connect(mapStateToProps)(Toast);
