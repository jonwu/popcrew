import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackendAPI from '../../common/api/BackendApi';
import { Actions } from 'react-native-router-flux';
import { Navigator } from '../app/components';

function generateStyles(theme) {
  return {};
}

function UserItem(props) {
  const { gstyles, theme, styles, user, parent } = props;
  const { selectedUserIds } = parent.state;
  const active = selectedUserIds.has(user._id);
  return (
    <TouchableOpacity
      onPress={() => {
        if (active) {
          selectedUserIds.delete(user._id)
        } else {
          selectedUserIds.add(user._id)
        }
        parent.setState({ selectedUserIds: selectedUserIds });
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
        <Text style={[gstyles.h4, { color: active ? theme.red() : theme.text() }]}>
          {user.firstname} {user.lastname}
        </Text>
        <View style={{ flex: 1 }} />
        {active && <Icon name="check-circle" size={24} color={theme.red()} />}
      </View>
    </TouchableOpacity>
  );
}

function GroupItem(props) {
  const { gstyles, theme, styles, group, parent } = props;
  const { selectedGroupIds, selectedUserIds } = parent.state;
  const active = selectedGroupIds.has(group._id);
  return (
    <TouchableOpacity
      onPress={() => {
        if (active) {
          selectedGroupIds.delete(group._id);
        } else {
          selectedGroupIds.add(group._id);
        }
        parent.setState({ selectedGroupIds, selectedUserIds });
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
        <Text style={[gstyles.h4, { color: active ? theme.red() : theme.text() }]}>
          {group._id}
        </Text>
        <View style={{ flex: 1 }} />
        {active && <Icon name="check-circle" size={24} color={theme.red()} />}
      </View>
    </TouchableOpacity>
  );
}
class CreateEventStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserIds: new Set(),
      selectedGroupIds: new Set(),
    };
    this.onShare = this.onShare.bind(this);
  }
  onShare() {
    const { selectedOptions, text, user, groups } = this.props;
    const { selectedUserIds, selectedGroupIds } = this.state;
    const valid_days = selectedOptions.map(options => options.key).join(',');
    const filteredGroups = [...selectedGroupIds].map(selectedGroupId => groups.find(group => selectedGroupId === group._id));

    selectedUserIds.add(user._id); // add you
    filteredGroups.map(filteredGroup => filteredGroup.users.map(user => {
      selectedUserIds.add(user._id); // add group users
    }))

    const userIds = [...selectedUserIds].join(',')
    const groupIds = [...selectedGroupIds].join(',')
    const name = text;
    console.log(userIds);
    // BackendAPI.postEvents({name, valid_days, users}).then(event => {
    //   console.log(event);
    // })
    Actions.home();
  }

  render() {
    const { gstyles, theme, styles, users, groups } = this.props;
    const { selectedUserIds } = this.state;
    const transformedGroups = groups.map(group => { return {type: 'group', data: group} });
    const transformedUsers = users.map(user => { return {type: 'user', data: user }});
    console.log(selectedUserIds);
    return (
      <View style={{ flex: 1 }}>
        <Navigator title={'Select Friends'}/>
        <FlatList
          data={[...transformedGroups, ...transformedUsers]}
          keyExtractor={(item, i) => item.data._id}
          renderItem={({ item }) => {
            switch(item.type) {
              case 'user':
                return <UserItem {...this.props} user={item.data} parent={this}/>
              case 'group':
                return <GroupItem {...this.props} group={item.data} parent={this}/>
              default:
                return null;
            }
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.borderWidth, backgroundColor: theme.borderColor }} />
          )}
        />
        <View style={{ flex: 1 }} />
        {selectedUserIds.size > 0 && (
          <TouchableOpacity onPress={this.onShare}>
            <View
              style={{
                flexDirection: 'row',
                padding: theme.spacing_2,
                backgroundColor: theme.red(),
                alignItems: 'center',
              }}
            >
              {/* <FlatList
                horizontal
                keyExtractor={(item, i) => item._id}
                data={selectedUserIds}
                renderItem={({ item }) => (
                  <Text style={[gstyles.p1_bold, { color: theme.light(0.8) }]}>{item.username}</Text>
                )}
                ItemSeparatorComponent={() => (
                  <Text style={[gstyles.p1_bold, { color: theme.light(0.8) }]}>, </Text>
                )}
              /> */}
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
    groups: state.app.groups,
    user: state.settings.user,
  };
}

export default connect(mapStateToProps)(CreateEventStep2);
