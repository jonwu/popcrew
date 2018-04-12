import React, { Component } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import FriendItem from './FriendItem';
import GroupItem from './GroupItem';
import UserSectionHeaders from './UserSectionHeaders';

function generateStyles(theme) {
  return {}
}
class UserList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gstyles, theme, styles, users, groups } = this.props;
    return (
      <SectionList
        renderItem={({item, section}) => {
          switch(section.title) {
            case 'friends':
              return <FriendItem user={item}/>
            case 'groups':
              return <GroupItem group={item}/>
            default:
              return null;
          }
        }}
        renderSectionHeader={({section}) => {
          return <UserSectionHeaders section={section}/>
        }}
        sections={[
          { data: users, title: 'friends'},
          { data: groups, title: 'groups'}
        ]}
        keyExtractor={(item) => item._id}
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={() => <View style={[{height: theme.borderWidth, backgroundColor: theme.light(0.9) }, gstyles.left_2, gstyles.right_2]}/>}
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
    users: state.app.users,
    groups: state.app.groups,
  };
}

export default connect(
  mapStateToProps,
)(UserList);
