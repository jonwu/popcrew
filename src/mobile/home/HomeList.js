import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import HomeHeader from './HomeHeader';
import FeedList from '../feed/FeedList'

function generateStyles(theme) {
  return {}
}
class HomeList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    return (
      <FlatList
        data={[]}
        ListHeaderComponent={() => (
          <View>
            <HomeHeader />
            <FeedList />
          </View>
        )}
      />
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
)(HomeList);
