import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

function generateStyles(theme) {
  return {}
}
class GroupItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, group } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 48,
          paddingHorizontal: theme.spacing_2,
          alignItems: 'center',
        }}
      >
        {group.name && <Text>{group.name}</Text>}
        {!group.name && <FlatList
          horizontal
          keyExtractor={(item, i) => item._id}
          data={group.users}
          renderItem={({ item }) => (
            <Text>{item.username}</Text>
          )}
          ItemSeparatorComponent={() => (
            <Text>, </Text>
          )}
        />}
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
)(GroupItem);
