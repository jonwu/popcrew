import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import BackendAPI from '../../common/api/BackendApi';
import { CheckBox } from '../app/components';
import moment from 'moment';

function generateStyles(theme) {
  return {};
}
class PendingEventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitation: null,
    }
  }
  componentDidMount() {
    const { item, userId } = this.props;
    const eventId = item.data._id;
    BackendAPI.getInvitations({ user: userId, event: eventId}).then(response => {
      const invitation = response.data.length > 0 && response.data[0];
      this.setState({ invitation });
    })
  }
  render() {
    const { gstyles, theme, styles, item, index } = this.props;
    const { invitation } = this.state;
    const pendingEvent = item.data;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.bg2(),
          padding: theme.spacing_4,
          borderRadius: theme.borderRadius,
          width: 300,
          height: 300
        }}
      >
        <Text style={[gstyles.h4_bold, gstyles.bottom_5, { color: theme.text() }]}>
          {pendingEvent.name}
        </Text>
        <Text style={[gstyles.caption_bold, gstyles.bottom_3, { color: theme.text(0.5) }]}>
          Let us know when you're free.
        </Text>

        <View style={{ flex: 1 }}/>
        {invitation &&
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: -1 * theme.spacing_4 }}>
            { invitation.dates_options.map(date => {
              formattedDate = moment(date).format('ddd, MMMM Do')
              return <CheckBox text={formattedDate}/>;
            })}
            <CheckBox text={"Interested, but busy"}/>
            <CheckBox text={"Not Interested"}/>

          </View>
        }

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
