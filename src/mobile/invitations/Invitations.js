import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { Loader } from '../app/components';
import InvitationList from './InvitationList';
import { initInvitations } from '../../common/app/actions';

function generateStyles(theme) {
  return {}
}
class Invitations extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { user, initInvitations } = this.props;
    initInvitations({ userId: user._id });
  }
  render() {
    const { gstyles, theme, styles, loaderInitInvitations } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg(), paddingHorizontal: theme.spacing_2, paddingTop: theme.spacing_1 }}>
        <Loader loader={loaderInitInvitations} >
          <InvitationList />
        </Loader>
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
    user: state.settings.user,
    loaderInitInvitations: state.loading.init_invitations,
  };
}

export default connect(
  mapStateToProps,
  { initInvitations }
)(Invitations);
