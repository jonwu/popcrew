import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackendAPI from '../../common/api/BackendApi';
import { Actions } from 'react-native-router-flux';
import { addGroup } from '../../common/app/actions';

function generateStyles(theme) {
  return {};
}
class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
    };
    this.onCreate = this.onCreate.bind(this);
  }
  onCreate() {
    const { selectedOptions, text, user, addGroup } = this.props;
    const { selectedUsers } = this.state;
    const users = [...selectedUsers, user].map(user => user._id).join(',');
    BackendAPI.postGroup({users}).then(response => {
      addGroup(response.data);
      Actions.pop();
    })

  }
  render() {
    const { gstyles, theme, styles, users, user } = this.props;
    const { selectedUsers } = this.state;
    
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={users.filter(u => u._id !== user._id)}
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
                    {item.firstname} {item.lastname}
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
          <TouchableOpacity onPress={this.onCreate}>
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
                  <Text style={[gstyles.p1_bold, { color: theme.light(0.8) }]}>{item.username}</Text>
                )}
                ItemSeparatorComponent={() => (
                  <Text style={[gstyles.p1_bold, { color: theme.light(0.8) }]}>, </Text>
                )}
              />
              <View style={{ flex: 1 }} />
              <Text style={[gstyles.h4_bold, { color: theme.light() }, gstyles.left_2]}>CREATE</Text>
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
    user: state.settings.user,
  };
}

export default connect(mapStateToProps, { addGroup })(CreateGroup);
