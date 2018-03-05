import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';

function generateStyles(theme) {
  return {};
}
class InvitationItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, item, index } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.red(),
          padding: theme.spacing_2,
          borderRadius: theme.borderRadius,
          marginRight: index % 2 == 0 ? theme.spacing_2 : 0,   
        }}
      >
        <Text style={[gstyles.h4_bold, gstyles.bottom_3]}>{item.name}</Text>
        <FlatList
          horizontal
          data={[{ key: 'JW' }, { key: 'HG' }]}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 48,
                width: 48,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.bg(0.1),
              }}
            >
              <Text style={gstyles.h4}>{item.key}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ width: theme.spacing_4 }} />}
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

export default connect(mapStateToProps)(InvitationItem);
