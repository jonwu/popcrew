import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackendAPI from '../../common/api/BackendApi';
import { Actions } from 'react-native-router-flux';
import { Navigator, BackIcon } from '../app/components';
import UserSectionHeaders from '../users/UserSectionHeaders';

function generateStyles(theme) {
  return {};
}

function FriendItem(props) {
  const { light_gstyles, light_theme, theme, gstyles, user, parent } = props;
  const { selectedUserIds } = parent.state;
  const active = selectedUserIds.has(user._id);
  return (
    <TouchableOpacity
      onPress={() => {
        if (active) {
          selectedUserIds.delete(user._id);
        } else {
          selectedUserIds.add(user._id);
        }
        parent.setState({ selectedUserIds: selectedUserIds });
      }}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            height: 52,
            alignItems: 'center',
            paddingHorizontal: theme.spacing_3,
            backgroundColor: 'white',
            borderLeftWidth: theme.borderWidth,
            borderRightWidth: theme.borderWidth,
            borderColor: theme.borderColor,
          },
          gstyles.left_2,
          gstyles.right_2,
        ]}
      >
        <View>
          <Text style={light_gstyles.p1_bold}>{user.username}</Text>
          <Text style={[light_gstyles.caption_bold, { color: light_theme.text(0.5) }]}>
            {user.firstname} {user.lastname}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        {active && <Icon name="check-circle" size={24} color={theme.red()} />}
      </View>
    </TouchableOpacity>
  );
}

function GroupItem(props) {
  const { light_gstyles, light_theme, gstyles, theme, styles, group, parent } = props;
  const { selectedGroupIds, selectedUserIds } = parent.state;
  const active = selectedGroupIds.has(group._id);
  let users = '';
  group.users.map((user, i) => {
    if (i !== 0) users += ', ';
    users += `${user.username}`;
  });
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
        style={[
          {
            flexDirection: 'row',
            height: 52,
            alignItems: 'center',
            paddingHorizontal: theme.spacing_3,
            backgroundColor: 'white',
            borderLeftWidth: theme.borderWidth,
            borderRightWidth: theme.borderWidth,
            borderColor: theme.borderColor,
          },
          gstyles.left_2,
          gstyles.right_2,
        ]}
      >
        <View>
          <Text style={light_gstyles.p1_bold}>{users}</Text>
        </View>
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
    const { selectedOptions, text, groups, you, notifiedDaysBefore, duration } = this.props;
    const { selectedUserIds, selectedGroupIds } = this.state;
    const valid_days = selectedOptions.map(options => options.key).join(',');
    const filteredGroups = [...selectedGroupIds].map(selectedGroupId =>
      groups.find(group => selectedGroupId === group._id),
    );

    selectedUserIds.add(you._id); // add you
    filteredGroups.map(filteredGroup =>
      filteredGroup.users.map(user => {
        selectedUserIds.add(user._id); // add group users
      }),
    );

    const userIds = [...selectedUserIds].join(',');
    const groupIds = [...selectedGroupIds].join(',');
    const name = text;

    BackendAPI.postEvents({
      name,
      valid_days,
      users: userIds,
      groups: groupIds,
      notified_days_before: notifiedDaysBefore,
      duration: duration,
      author: you._id,
    })
    .then(response => {
      console.log(response.data)
      Actions.home({ toast: `Added ${response.data.name}. You have ${response.data.idleEventsCount} crazy ideas waiting!` });
    })
    .catch(err => {
      Actions.home({ toast: `Encountered error. Please ping jonwu` });
      console.log('error', err);
    });

  }

  render() {
    const { gstyles, theme, styles, users, groups, you } = this.props;
    const { selectedUserIds, selectedGroupIds } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg() }}>
        <Navigator title={'Select Friends'} renderLeft={() => <BackIcon />} />
        <SectionList
          renderItem={({ item, section }) => {
            switch (section.title) {
              case 'friends':
                return <FriendItem user={item} parent={this} {...this.props} />;
              case 'groups':
                return <GroupItem group={item} parent={this} {...this.props} />;
              default:
                return null;
            }
          }}
          renderSectionHeader={({ section }) => {
            return <UserSectionHeaders section={section} />;
          }}
          sections={[
            { data: groups, title: 'groups' },
            { data: users.filter(user => user._id !== you._id), title: 'friends' },
          ]}
          keyExtractor={item => item._id}
          stickySectionHeadersEnabled={false}
          ItemSeparatorComponent={() => (
            <View
              style={[
                { height: theme.borderWidth, backgroundColor: theme.light(0.9) },
                gstyles.left_2,
                gstyles.right_2,
              ]}
            />
          )}
        />
        {(selectedUserIds.size > 0 || selectedGroupIds.size > 0) && (
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
    light_theme: state.settings.light_theme,
    light_gstyles: state.settings.light_gstyles,
    theme: state.settings.theme,
    gstyles: state.settings.gstyles,
    styles: stylesSelector(state.settings.theme),
    users: state.app.users,
    groups: state.app.groups,
    you: state.settings.user,
  };
}

export default connect(mapStateToProps)(CreateEventStep2);
