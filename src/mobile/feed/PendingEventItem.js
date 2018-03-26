import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, AppState } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import BackendAPI from '../../common/api/BackendApi';
import { CheckBox } from '../app/components';
import EventUserList from '../users/EventUserList';
import moment from 'moment';
import _ from 'lodash';

function generateStyles(theme) {
  return {};
}
class PendingEventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitation: null,
      serverInvitation: null,
      appState: AppState.currentState,
    };
    this.onInterested = this.onInterested.bind(this);
    this.onAccepted = this.onAccepted.bind(this);
    this.onRejected = this.onRejected.bind(this);
  }
  componentDidMount() {
    const { item, userId } = this.props;
    const eventId = item.data._id;
    AppState.addEventListener('change', this.handleAppStateChange);
    BackendAPI.getInvitations({ user: userId, event: eventId }).then(response => {
      const invitation = response.data.length > 0 && response.data[0];
      this.setState({ invitation, serverInvitation: invitation });
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange = nextAppState => {
    const { invitation, serverInvitation } = this.state;
    if (this.state.appState.match(/inactive|active/) && nextAppState === 'background') {
      if (
        !_.isEqual(serverInvitation.dates_accepted, invitation.dates_accepted) ||
        !_.isEqual(serverInvitation.status, invitation.status)
      ) {
        BackendAPI.patchInvitation(invitation._id, {
          status: invitation.status,
          dates_accepted: invitation.dates_accepted,
        })
          .then(response => {
            this.setState({ serverInvitation: response.data });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    this.setState({ appState: nextAppState });
  };
  onInterested() {
    const { invitation } = this.state;
    const updatedInvitation = Object.assign({}, invitation, {
      status: invitation.status === 'interested' ? 'idle' : 'interested',
    });
    this.setState({ invitation: updatedInvitation });
  }
  onAccepted(date) {
    const { invitation } = this.state;
    const dates_accepted = invitation.dates_accepted.includes(date)
      ? invitation.dates_accepted.filter(d => d !== date)
      : [...invitation.dates_accepted, date];
    const updatedInvitation = Object.assign({}, invitation, {
      dates_accepted,
      status: dates_accepted.length === 0 ? 'idle' : 'accepted',
    });
    this.setState({ invitation: updatedInvitation });
  }
  onRejected() {
    const { invitation } = this.state;
    const updatedInvitation = Object.assign({}, invitation, {
      status: invitation.status === 'rejected' ? 'idle' : 'rejected',
    });
    this.setState({ invitation: updatedInvitation });
  }

  render() {
    const { gstyles, theme, styles, item, index } = this.props;
    const { invitation } = this.state;
    const pendingEvent = item.data;
    const status = invitation && invitation.status;
    const expiredDays = moment.duration(moment(pendingEvent.expiration).startOf('day').diff(moment().startOf('day'))).asDays();

    return (
      <View
        style={{
          backgroundColor: theme.bg(),
          padding: theme.spacing_2,
          flex: 1,
        }}
      >
        <Text style={[gstyles.h4_bold, gstyles.bottom_5, { color: theme.text() }]}>
          {pendingEvent.name}
        </Text>
        <Text style={[gstyles.caption_bold, gstyles.bottom_4, { color: theme.text(0.5) }]}>
          Let us know when you're free.
        </Text>

        <EventUserList users={pendingEvent.users} />
        <View style={{ flex: 1 }} />

        {invitation && (
          <View style={{ alignItems: 'flex-start' }}>
            {pendingEvent.dates_options.map((date, i) => {
              const active = invitation.dates_accepted.includes(date);
              const formattedDate = moment(date).format('ddd, MMMM Do');
              return (
                <CheckBox
                  onPress={() => this.onAccepted(date)}
                  active={active}
                  disabled={status !== 'idle' && status !== 'accepted'}
                  key={i}
                  text={formattedDate}
                />
              );
            })}
            <CheckBox
              disabled={status === 'rejected'}
              active={status === 'interested'}
              onPress={this.onInterested}
              activeColor={theme.red()}
              text={'Interested, but busy'}
            />
            <CheckBox
              disabled={status === 'interested'}
              active={status === 'rejected'}
              onPress={this.onRejected}
              activeColor={theme.red()}
              text={'Not Interested'}
            />
          </View>
        )}
        <Text style={[gstyles.caption_bold, gstyles.top_4, { color: theme.text(0.5), alignSelf: 'flex-end'}]}>
          Ends {expiredDays <= 1 ? <Text style={{color: theme.text()}}>Today</Text> : <Text>in <Text style={{color: theme.text()}}>{expiredDays} days</Text></Text>}
        </Text>
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
    userId: state.settings.user._id,
  };
}

export default connect(mapStateToProps)(PendingEventItem);
