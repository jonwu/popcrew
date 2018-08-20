import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector, feedEventItems } from '../app/utils/selectors';
import PendingEventItem from './PendingEventItem';
import ProcessEventItem from './ProcessEventItem';
import Dimensions from 'Dimensions';
import Carousel from 'react-native-snap-carousel';

function generateStyles(theme) {
  return {};
}

class FeedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currItemIndex: 0,
      endReached: false,
    };
  }
  iterateIndex = () => {
    const { feedEventItems } = this.props;
    const nextIndex = this.state.currItemIndex + 1;
    if (nextIndex === feedEventItems.length) {
      this.setState({
        endReached: true,
      })
    } else {
      this.setState({
        currItemIndex: nextIndex,
      })
    }
  }

  render() {
    const {
      gstyles,
      theme,
      styles,
      events,
      light_theme,
      loaderInitFeedItem,
      feedEventItems,
    } = this.props;
    const { currItemIndex, endReached } = this.state;
    if (!feedEventItems.length || endReached ) return null;
    return (
      <View style={{ backgroundColor: theme.bg2(), padding: theme.spacing_2, flex: 1}}>
        <PendingEventItem item={feedEventItems[currItemIndex]} iterateIndex={this.iterateIndex} />
      </View>
    );
  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.theme,
    light_theme: state.settings.light_theme,
    gstyles: state.settings.gstyles,
    styles: stylesSelector(state.settings.theme),
    loaderInitFeedItems: state.loading.init_feed_items,
    feedEventItems: feedEventItems(state),
  };
}

export default connect(mapStateToProps)(FeedList);
