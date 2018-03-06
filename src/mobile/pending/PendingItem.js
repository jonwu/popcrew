import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

function generateStyles(theme) {
  return {};
}
class PendingItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, item, index } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.bg2(),
          padding: theme.spacing_2,
          borderRadius: theme.borderRadius,
          marginRight: index % 2 == 0 ? theme.spacing_2 : 0,
        }}
      >
        <Text style={[gstyles.h4_bold, gstyles.bottom_3, { color: theme.text() }]}>
          {item.name}
        </Text>
        <FlatList
          // horizontal
          data={item.valid_days}
          keyExtractor={item => item}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                backgroundColor: theme.bg(0.1),
              }}
            >
              <Text style={[gstyles.caption, { color: theme.text() }]}>{item}</Text>
            </View>
          )}
          // ItemSeparatorComponent={() => <View style={{ width: theme.spacing_4 }} />}
        />
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

export default connect(mapStateToProps)(PendingItem);
