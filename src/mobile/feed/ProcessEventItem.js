import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import EventUserList from '../users/EventUserList';
import { CheckBox } from '../app/components';
import moment from 'moment';
import BackendAPI from '../../common/api/BackendApi';
import { initialize } from '../../common/app/actions';
import { Actions } from 'react-native-router-flux';

function generateStyles(theme) {
  return {}
}
class ProcessEventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_confirmed: null,
    }
    this.onCreate = this.onCreate.bind(this);
  }
  onCreate() {
    const { item, initialize } = this.props;
    const { date_confirmed } = this.state;
    const processingEvent = item.data;
    const params = { status: 'active', date_confirmed };
    BackendAPI.patchEvent(processingEvent._id, params).then(event => {
      initialize();
      Actions.eventsTab();
    });
  }
  render() {
    const { gstyles, theme, styles, item } = this.props;
    const { date_confirmed } = this.state;
    const processingEvent = item.data;
    const expiredDays = moment.duration(moment(processingEvent.expiration).startOf('day').diff(moment().startOf('day'))).asDays();
    return (
      <View
        style={{
          backgroundColor: theme.bg(),
          padding: theme.spacing_2,
          flex: 1,
        }}
      >
        <Text style={[gstyles.h4_bold, gstyles.bottom_5, { color: theme.text() }]}>
          {processingEvent.name}
        </Text>
        <Text style={[gstyles.caption_bold, gstyles.bottom_4, { color: theme.text(0.5) }]}>
          Everyone accepted!
        </Text>
        <EventUserList users={processingEvent.users} />
        <View style={{flex: 1}}/>
        <View style={{alignItems: 'flex-start'}}>
          {processingEvent.dates_options.map((date, i) => {
            const formattedDate = moment(date).format('ddd, MMMM Do');
            return (
              <CheckBox
                onPress={() => this.setState({date_confirmed: date_confirmed !== date && date})}
                active={date === date_confirmed}
                key={i}
                text={formattedDate}
              />
            );
          })}
        </View>
        <View style={[{alignItems: 'flex-end'}, gstyles.top_2]}>
          <TouchableOpacity onPress={this.onCreate} disabled={!date_confirmed}>
            <View style={{ padding: theme.spacing_4, backgroundColor: theme.red(1), borderRadius: theme.borderRadius, opacity: date_confirmed ? 1 : 0.1}}>
              <Text style={[gstyles.p1_bold]}>Confirm!</Text>
            </View>
          </TouchableOpacity>
          <Text style={[gstyles.caption_bold, gstyles.top_4, { color: theme.text(0.5), alignSelf: 'flex-end'}]}>
            Ends {expiredDays <= 1 ? <Text style={{color: theme.text()}}>Today</Text> : <Text>in <Text style={{color: theme.text()}}>{expiredDays} days</Text></Text>}
          </Text>
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
  };
}

export default connect(
  mapStateToProps,
  { initialize }
)(ProcessEventItem);
