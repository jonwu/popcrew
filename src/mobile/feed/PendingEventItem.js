import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
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
    const { item } = props;
    this.state = {
      targetDate: this.transformDate(item.data.dates_options[0]),
      expiration: this.transformDate(item.data.expiration),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.props.item) {
      this.setState({
        targetDate: this.transformDate(nextProps.item.data.dates_options[0]),
        expiration: this.transformDate(nextProps.item.data.expiration),
      });
    }
  }
  onInterested = () => {
    const { item, userId, iterateIndex } = this.props;
    const params = {
      user: userId,
      event: item.data._id,
      status: 'interested',
    };
    return BackendAPI.patchInvitation(params).then(response => {
      console.log(response.data);
      iterateIndex();
    });
  };
  onAccepted = () => {
    const { item, userId, iterateIndex } = this.props;
    const params = {
      user: userId,
      event: item.data._id,
      dates_accepted: [item.data.dates_options[0]],
      status: 'accepted',
    };
    return BackendAPI.patchInvitation(params).then(iterateIndex);
  };
  onRejected = () => {
    const { item, userId, iterateIndex } = this.props;
    const params = {
      user: userId,
      event: item.data._id,
      status: 'rejected',
    };
    return BackendAPI.patchInvitation(params).then(iterateIndex);
  };
  transformDate = date => {
    const currDate = moment();
    const targetDate = moment(date);
    const tommorow = currDate.clone().add(1, 'days');
    const nextSunday =
      currDate.clone().isoWeekday() < 7
        ? currDate.clone().isoWeekday(7)
        : currDate
            .clone()
            .add(1, 'weeks')
            .isoWeekday(7);
    if (targetDate.isBefore(currDate, 'days')) return 'NVM';
    if (targetDate.isSame(currDate, 'days')) return 'Today';
    if (targetDate.isSame(tommorow, 'days')) return 'Tomorrow';
    if (targetDate.isBefore(nextSunday, 'days')) return `${targetDate.format('dddd')}`;
    if (targetDate.isSameOrAfter(nextSunday, 'days')) return `next ${targetDate.format('dddd')}`;
    return targetDate.format('ddd, MMMM Do');
  };

  render() {
    const { gstyles, theme, styles, item, index } = this.props;
    const { invitation, targetDate, expiration } = this.state;
    const pendingEvent = item.data;

    const status = invitation && invitation.status;
    const expiredDays = moment
      .duration(
        moment(pendingEvent.expiration)
          .startOf('day')
          .diff(moment().startOf('day')),
      )
      .asDays();
    console.log(pendingEvent);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: theme.bg(),
            // borderRadius: theme.borderRadius,
            // border: `${theme.borderWidth}px solid ${theme.borderColor}`,
            borderWidth: theme.borderWidth,
            borderColor: theme.borderColor,
            padding: theme.spacing_2,
            flex: 1,
          }}>
          <Text style={[gstyles.h2_bold, { color: theme.text(0.5) }]}>Are you free</Text>
          <Text style={[gstyles.h2_bold, { color: theme.text(0.5) }]}>
            <Text style={{ color: theme.text() }}>{targetDate}</Text> for
          </Text>

          <Text style={[gstyles.h2_bold, gstyles.top_1, { color: theme.text() }]}>
            {item.data.name}?
          </Text>
          <View style={{height: theme.spacing_2}}/>
          <EventUserList users={pendingEvent.users} />
          <View style={{ flex: 1 }} />

          <Text
            style={[gstyles.h4, gstyles.top_2, { color: theme.text(), alignSelf: 'center' }, gstyles.bottom_4]}>
            Let me know by <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>{expiration}.</Text>
          </Text>
        </View>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: theme.spacing_2,
            },
            gstyles.top_2,
          ]}>
          <TouchableOpacity onPress={this.onAccepted}>
            <View
              style={{
                height: 64,
                width: 64,
                borderRadius: 64,
                backgroundColor: theme.green(),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[gstyles.caption_bold, { color: theme.text() }]}>Yes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onInterested}>
            <View
              style={{
                height: 64,
                width: 64,
                borderRadius: 64,
                backgroundColor: theme.red(),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[gstyles.caption_bold, { color: theme.text() }]}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onInterested}>
            <View
              style={{
                height: 64,
                width: 64,
                borderRadius: 64,
                backgroundColor: theme.blue(),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[gstyles.caption_bold, { color: theme.text() }]}>Maybe</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onRejected}>
            <View
              style={{
                height: 64,
                width: 64,
                borderRadius: 64,
                backgroundColor: theme.yellow(),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[gstyles.caption_bold, { color: theme.text(), textAlign: 'center' }]}>
                No Interest
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
