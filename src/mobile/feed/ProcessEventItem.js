import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import EventUserList from '../users/EventUserList';
import { CheckBox } from '../app/components';
import moment from 'moment';
import BackendAPI from '../../common/api/BackendApi';

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
    const { item } = this.props;
    const { date_confirmed } = this.state;
    const processingEvent = item.data;
    const params = { status: 'active', date_confirmed };
    BackendAPI.patchEvent(processingEvent._id, params).then(event => {
      console.log(event)
    });
  }
  render() {
    const { gstyles, theme, styles, item } = this.props;
    const { date_confirmed } = this.state;
    const processingEvent = item.data;
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
        <TouchableOpacity onPress={this.onCreate} disabled={!date_confirmed}>
          <View style={{alignSelf: 'flex-end', padding: theme.spacing_4, backgroundColor: theme.yellow(1), borderRadius: theme.borderRadius, opacity: date_confirmed ? 1 : 0.1}}>
            <Text style={[gstyles.caption_bold]}>Create</Text>
          </View>
        </TouchableOpacity>
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
)(ProcessEventItem);
