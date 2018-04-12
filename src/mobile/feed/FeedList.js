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
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item, index }) {
    const { gstyles, theme, styles} = this.props;
    let content = null;
    switch(item.type) {
      case 'pending_event':
        content = <PendingEventItem item={item} index={index}/>
        break;
      case 'processing_event':
        content = <ProcessEventItem item={item} index={index} />
        break;
      default:
        content = null;
        break;
    }
    return (<View style={{
      borderRadius: theme.borderRadius * 2,
      overflow: 'hidden',
      height: 360,
      width: Dimensions.get('window').width * .75,
    }}>
      { content }
    </View>)
  }
  render() {
    const { gstyles, theme, styles, events, light_theme, loaderInitFeedItems, feedEventItems} = this.props;
    const feedItems = [...feedEventItems];
    if (!feedItems.length) return null;
    return (
      <View style={[{ height: 360 + theme.spacing_2 * 2, paddingVertical: theme.spacing_2, backgroundColor: theme.bg2()}]}>
        <Carousel
          style={{paddingTop: theme.spacing_2}}
          data={feedItems}
          renderItem={this.renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * .75}
          itemHeight={360}
        />
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
