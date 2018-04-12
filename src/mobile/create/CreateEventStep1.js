import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import { CheckBox, Counter } from '../app/components';
import PushNotification from 'react-native-push-notification';
import { Navigator, BackIcon } from '../app/components';
import Icon from 'react-native-vector-icons/Ionicons';

function generateStyles(theme) {
  return {};
}
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      selectedOptions: [],
      notifiedDaysBefore: 1,
      duration: 1,
      options: [
        { value: 'Monday', key: 'monday' },
        { value: 'Tuesday', key: 'tuesday' },
        { value: 'Wednesday', key: 'wednesday' },
        { value: 'Thursday', key: 'thursday' },
        { value: 'Friday', key: 'friday' },
        { value: 'Saturday', key: 'saturday' },
        { value: 'Sunday', key: 'sunday' },
        { value: 'Any day', key: 'all' },
      ],
    };
    this.onOptionPress = this.onOptionPress.bind(this);
    PushNotification.requestPermissions();
  }

  onOptionPress(option) {
    const { selectedOptions, options } = this.state;
    const hasOption = selectedOptions.find(selectedOption => selectedOption.key === option.key);
    const isAll = selectedOptions.length === options.length - 1;
    let updatedSelectedOptions;
    switch (option.key) {
      case 'all': {
        updatedSelectedOptions = isAll ? [] : options.filter(option => option.key !== 'all');
        break;
      }
      default: {
        updatedSelectedOptions = hasOption ? selectedOptions.filter(selectedOption => selectedOption.key !== option.key) : [...selectedOptions, option];
        break;
      }
    }
    this.setState({ selectedOptions: updatedSelectedOptions });
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { selectedOptions, text, options, notifiedDaysBefore, duration } = this.state;
    console.log("Render Event 1")
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, backgroundColor: theme.bg() }}>
          <View style={{ flex: 1 }}>
            <Navigator renderLeft={() => <BackIcon />} />
            <TextInput
              style={[
                gstyles.p1,
                gstyles.bottom_2,
                {
                  paddingTop: theme.spacing_1,
                  paddingHorizontal: theme.spacing_2,
                  borderBottomWidth: theme.borderWidth,
                  borderColor: theme.borderColor,
                  height: 80,
                },
              ]}
              multiline
              maxLength={180}
              onChangeText={text => this.setState({ text })}
              returnKeyType={'done'}
              placeholder={'Got something you wanna do?'}
              placeholderTextColor={theme.text(0.5)}
              value={text}
            />
            <View style={{ paddingHorizontal: theme.spacing_2 }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <View style={{ width: 200 }}>
                  <Text style={[gstyles.p1, { color: theme.text() }, gstyles.bottom_1]}>How many days is your event?</Text>
                </View>
                <Counter defaultValue={this.state.duration} onValueChange={value => this.setState({ duration: value })} />
              </View> */}
              <View style={[{alignSelf: 'flex-start', padding: theme.spacing_4, backgroundColor: theme.blue(0.8), borderRadius: theme.borderRadius}, gstyles.bottom_2]}>
                <Text style={[gstyles.caption_bold, { color: theme.text() }]}>We only support one-day events in beta</Text>
              </View>
              <Text style={[gstyles.p1, { color: theme.text() }, gstyles.bottom_1]}>Which days does this event start on?</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {options.map((option, i) => {
                  const hasOption = selectedOptions.find(selectedOption => selectedOption.key === option.key);
                  const isAll = selectedOptions.length === options.length - 1;
                  return <CheckBox key={i} onPress={() => this.onOptionPress(option)} active={hasOption || isAll} text={option.value} />;
                })}
              </View>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                  gstyles.top_4,
                ]}
              >
                <View style={{ width: 200 }}>
                  <Text style={[gstyles.p1, { color: theme.text() }, gstyles.bottom_5]}>How many days to prepare?</Text>
                  {/* <Text style={[gstyles.footnote, { color: theme.text(0.5) }, gstyles.bottom_1]}>For example, out-of-state trips may want 45 days notice to book airline tickets.</Text> */}
                </View>
                <Counter defaultValue={this.state.notifiedDaysBefore} onValueChange={value => this.setState({ notifiedDaysBefore: value })} />
              </View>
            </View>

            <View style={{ flex: 1 }} />
            {this.state.text.trim() !== '' &&
              this.state.selectedOptions.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    Actions.createEventStep2({ text, selectedOptions, notifiedDaysBefore, duration });
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: theme.blue(),
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ flex: 1 }} />
                    <View style={{ padding: theme.spacing_2, backgroundColor: theme.blue() }}>
                      <Text style={[gstyles.h4_bold, { color: theme.light() }]}>NEXT</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
          </View>
        </View>
      </TouchableWithoutFeedback>
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

export default connect(mapStateToProps)(CreateEvent);
