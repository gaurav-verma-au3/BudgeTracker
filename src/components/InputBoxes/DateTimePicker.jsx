import React, {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTheme from 'hooks/useTheme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {nullChecker} from 'utils/utilities';
import {Text, View} from 'react-native';
import {normalize} from '../../utils/normalize';
// import {ErrorText} from 'styled';
const DateTimePicker = props => {
  const theme = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    props.onChange(date);
    hideDatePicker();
  };
  return (
    <>
      <DateTimePickerModal
        date={props.date}
        isVisible={isDatePickerVisible}
        mode={props.mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View
        style={{
          backgroundColor: theme.colors.primary,
          alignSelf: 'flex-start',
          paddingHorizontal: theme.spacings.normalScale.s12,
          marginLeft: theme.spacings.normalScale.s12,
          marginBottom: normalize(-9),
          zIndex: 10,
        }}>
        <Text
          style={{
            fontWeight: theme.fontWeight.w600,
            color: props.error
              ? theme.colors.loginText
              : theme.colors.loginText,
          }}>
          {props.placeholder}
        </Text>
      </View>
      <DateTimeInputTextContainer {...props}>
        <DateTimeInoutBox
          {...props}
          {...props.Children}
          editable={false}
          selectTextOnFocus={false}
          placeholder=""></DateTimeInoutBox>
        <IconContainer {...props} onPress={showDatePicker}>
          <Icon
            name="date-range"
            size={normalize(20)}
            style={{color: theme.colors.loginText}}
          />
        </IconContainer>
      </DateTimeInputTextContainer>
      {/* {props.error ? (
        <ErrorText>{nullChecker(props.error)}</ErrorText>
      ) : (
        <ErrorText> </ErrorText>
      )} */}
    </>
  );
};

export default DateTimePicker;

const DateTimeInputTextContainer = styled.View`
  border: 1px solid
    ${props =>
      props.error
        ? props.theme.colors.loginText
        : props.theme.colors.loginText};
  border-radius: ${props => (props.noEdges ? '100' : '5')}px;
  display: flex;
  justify-content: center;
  margin: 0px 0px ${props => props.theme.spacings.verticalScale.s12}px 0px;
  flex-direction: row;
`;

const DateTimeInoutBox = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.error
    ? props.theme.colors.loginText
    : props.theme.colors.loginText,
}))`
  color: ${props =>
    props.error ? props.theme.colors.loginText : props.theme.colors.loginText};
  width: ${props => (props.width ? props.width : 85)}%;
  font-size: ${props => props.theme.fontSize.f12}px;
  font-weight: ${props => props.theme.fontWeight.w600};

  padding: ${props => props.theme.spacings.verticalScale.s12}px
    ${props => props.theme.spacings.normalScale.s12}px;
`;

const IconContainer = styled.TouchableOpacity`
  background-color: ${props =>
    props.error ? props.theme.colors.primary : props.theme.colors.primary};
  border-radius: ${props => props.theme.spacings.normalScale.s12}px;
  justify-content: center;
  align-items: center;
`;
