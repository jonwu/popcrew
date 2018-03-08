import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector, pendingEventItems } from '../app/utils/selectors';
import PendingEventItem from './PendingEventItem';

function generateStyles(theme) {
  return {};
}

class FeedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { gstyles, theme, styles, events, loaderInitFeedItems, pendingEventItems} = this.props;
    const feedItems = [...pendingEventItems];

    return (
      <FlatList
        horizontal
        style={{ paddingHorizontal: theme.spacing_2, paddingVertical: theme.spacing_2}}
        data={feedItems}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          switch(item.type) {
            case 'pending_event':
              return <PendingEventItem item={item} index={index}/>
            default:
              return null;
          }
        }}
        ItemSeparatorComponent={() => <View style={{width: theme.spacing_2}}/>}
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
    pendingEvents: state.app.pendingEvents,
    loaderInitFeedItems: state.loading.init_feed_items,
    pendingEventItems: pendingEventItems(state),
  };
}

export default connect(mapStateToProps)(FeedList);
