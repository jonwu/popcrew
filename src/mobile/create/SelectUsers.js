import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackendAPI from '../../common/api/BackendApi';

function generateStyles(theme) {
  return {};
}
class SelectedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
    };
    this.onShare = this.onShare.bind(this);
  }
  onShare() {
    const { selectedOptions, text } = this.props;
    const { selectedUsers } = this.state;
    const valid_days = selectedOptions.map(options => options.key).join(',');
    const users = selectedUsers.map(user => user._id).join(',');
    const name = text;
    BackendAPI.postEvents({name, valid_days, users}).then(event => {
      console.log(event);
    })

  }
  render() {
    const { gstyles, theme, styles, users } = this.props;
    const { selectedUsers } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={users}
          keyExtractor={(item, i) => item._id}
          renderItem={({ item }) => {
            const hasUserKey = selectedUsers.find(user => user._id === item._id);
            return (
              <TouchableOpacity
                onPress={() => {
                  let updatedSelectedUsers;
                  if (hasUserKey) {
                    updatedSelectedUsers = selectedUsers.filter(user => user._id !== item._id);
                  } else {
                    updatedSelectedUsers = [...selectedUsers, item];
                  }
                  this.setState({ selectedUsers: updatedSelectedUsers });
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    height: 48,
                    paddingHorizontal: theme.spacing_2,
                    alignItems: 'center',
                  }}
                >
                  <Text style={[gstyles.h4, { color: hasUserKey ? theme.red() : theme.text() }]}>
                    {item.name}
                  </Text>
                  <View style={{ flex: 1 }} />
                  {hasUserKey && <Icon name="check-circle" size={24} color={theme.red()} />}
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.borderWidth, backgroundColor: theme.borderColor }} />
          )}
        />
        <View style={{ flex: 1 }} />
        {selectedUsers.length > 0 && (
          <TouchableOpacity onPress={this.onShare}>
            <View
              style={{
                flexDirection: 'row',
                padding: theme.spacing_2,
                backgroundColor: theme.red(),
                alignItems: 'center',
              }}
            >
              <FlatList
                horizontal
                keyExtractor={(item, i) => item._id}
                data={selectedUsers}
                renderItem={({ item }) => (
                  <Text style={[gstyles.p1_bold, { color: theme.light(0.8) }]}>{item.name}</Text>
                )}
                ItemSeparatorComponent={() => (
                  <Text style={[gstyles.p1_bold, { color: theme.light(0.8) }]}>, </Text>
                )}
              />
              <View style={{ flex: 1 }} />
              <Text style={[gstyles.h4_bold, { color: theme.light() }, gstyles.left_2]}>SHARE</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const stylesSelector = generateStylesSelector(generateStyles);
function mapStateToProps(state, ownProps) {
  return {
    theme: state.settings.light_theme,
    gstyles: state.settings.light_gstyles,
    styles: stylesSelector(state.settings.theme),
    users: state.app.users,
  };
}

export default connect(mapStateToProps)(SelectedUsers);
