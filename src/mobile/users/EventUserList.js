import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import Dimensions from 'Dimensions';

const ITEM_WIDTH = 40;
const OFFSET = 12;
const N_ITEMS = Dimensions.get('window').width % (ITEM_WIDTH + OFFSET)

function generateStyles(theme) {
  return {}
}
function UserItem(props) {
  const { gstyles, theme, user, itemStyle } = props;
  return (
    <View
      style={[{
        height: ITEM_WIDTH,
        width: ITEM_WIDTH,
        borderRadius: ITEM_WIDTH/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.bg2(),
        marginRight: theme.spacing_5,
      }, itemStyle]}
    >
      <Text style={[gstyles.caption_bold, { color: theme.text() }]}>{`${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}`}</Text>
    </View>
  )
}
class EventEventUserList extends Component {
  render() {
    const { gstyles, theme, users, itemStyle } = this.props;
    const userItems = []
    const userLength = users.length < N_ITEMS ? users.length : N_ITEMS;
    for(let i = 0; i < userLength; i++ ) {
      userItems.push(<UserItem key={i} user={users[i]} {...this.props} />)
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {userItems}
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
)(EventEventUserList);
