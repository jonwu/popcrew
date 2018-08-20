import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import HomeHeader from './HomeHeader';
import FeedList from '../feed/FeedList'
import IdleEventList from '../feed/IdleEventList';

function generateStyles(theme) {
  return {}
}
class HomeBody extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <HomeHeader /> */}
        <FeedList />
        {/* <View>
          <View style={{backgroundColor: theme.borderColor, height: theme.borderWidth }}/>
          <IdleEventList />
        </View> */}
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
)(HomeBody);
