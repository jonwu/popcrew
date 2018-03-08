import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateStylesSelector } from '../app/utils/selectors';
import PendingList from '../pending/PendingList';
import { CheckBox } from '../app/components';

function generateStyles(theme) {
  return {};
}
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      selectedOptions: [],
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
        updatedSelectedOptions = hasOption
          ? selectedOptions.filter(selectedOption => selectedOption.key !== option.key)
          : [...selectedOptions, option];
        break;
      }
    }
    this.setState({ selectedOptions: updatedSelectedOptions });
  }
  render() {
    const { gstyles, theme, styles } = this.props;
    const { selectedOptions, text, options } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: theme.bg() }}>
        <View style={{ height: 50 }} />
        <TextInput
          style={[
            gstyles.p1,
            gstyles.bottom_2,
            {
              paddingHorizontal: theme.spacing_2,
              borderBottomWidth: theme.borderWidth,
              borderColor: theme.borderColor,
              height: 50,
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
          <Text style={[gstyles.p1, { color: theme.text() }, gstyles.bottom_3]}>What days?</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {options.map((option, i) => {
              const hasOption = selectedOptions.find(
                selectedOption => selectedOption.key === option.key,
              );
              const isAll = selectedOptions.length === options.length - 1;
              return (
                <CheckBox
                  key={i}
                  onPress={() => this.onOptionPress(option)}
                  active={hasOption || isAll}
                  text={option.value}
                />
              );
            })}
          </View>
        </View>
        <View style={{ flex: 1 }} />
        {/* <PendingList /> */}
        {this.state.text.trim() !== '' &&
          this.state.selectedOptions.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                Actions.selectUsers({ text, selectedOptions });
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
