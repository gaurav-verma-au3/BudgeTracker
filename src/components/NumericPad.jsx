import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {normalize} from 'utils/normalize';
const data = [
  {value: '1', display: '1'},
  {value: '2', display: '2'},
  {value: '3', display: '3'},
  {value: '4', display: '4'},
  {value: '5', display: '5'},
  {value: '6', display: '6'},
  {value: '7', display: '7'},
  {value: '8', display: '8'},
  {value: '9', display: '9'},
  {value: '.', display: '.'},
  {value: '0', display: '0'},
  {value: 'del', display: <Icon name="backspace" size={25} />},
];

const NumaricPad = ({setPin, pin, pinLength, withDot, bottomSpace}) => {
  const data = withDot
    ? [
        {value: '1', display: '1'},
        {value: '2', display: '2'},
        {value: '3', display: '3'},
        {value: '4', display: '4'},
        {value: '5', display: '5'},
        {value: '6', display: '6'},
        {value: '7', display: '7'},
        {value: '8', display: '8'},
        {value: '9', display: '9'},
        {value: '.', display: '.'},
        {value: '0', display: '0'},
        {value: 'del', display: <Icon name="backspace" size={25} />},
      ]
    : [
        {value: '1', display: '1'},
        {value: '2', display: '2'},
        {value: '3', display: '3'},
        {value: '4', display: '4'},
        {value: '5', display: '5'},
        {value: '6', display: '6'},
        {value: '7', display: '7'},
        {value: '8', display: '8'},
        {value: '9', display: '9'},
        {value: 'empty', display: ''},
        {value: '0', display: '0'},
        {value: 'del', display: <Icon name="backspace" size={25} />},
      ];

  return (
    <KeyBoard bottomSpace={bottomSpace}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => (
          <KeyComponent
            withDot={withDot}
            setPin={setPin}
            item={item}
            pin={pin}
            pinLength={pinLength}
          />
        )}
        keyExtractor={item => item.value}
      />
    </KeyBoard>
  );
};

const KeyComponent = ({item, setPin, pin, pinLength}) => {
  const handlePinChange = v => {
    if (v.value === 'empty') {
      return;
    } else if (v.value === 'del' && pin.length > 0) {
      //delete last digit
      setPin(pin.slice(0, -1));
    } else if (
      v.value !== 'del' &&
      v.value !== 'empty' &&
      pin.length < pinLength
    ) {
      // append to string
      setPin(pin + v.value);
    }
  };
  return (
    <Key onPress={e => handlePinChange(item)}>
      <KeyValue>{item.display}</KeyValue>
    </Key>
  );
};

export const PinDisplay = ({pinLength, pin}) => {
  return (
    <PinDisplayStyled>
      {Array.apply(null, Array(pinLength)).map((v, i) =>
        pin[i] ? (
          <PinDots key={`${i}`} filled={true} />
        ) : (
          <PinDots key={`${i}`} filled={false} />
        ),
      )}
    </PinDisplayStyled>
  );
};

const Key = styled.TouchableOpacity`
  width: 33.33333%;
  justify-content: center;
  align-items: center;
`;

const KeyBoard = styled.View`
  background-color: ${props => props.theme.colors.primary};
  position: absolute;
  bottom: ${props => (props.bottomSpace ? normalize(props.bottomSpace) : 0)}px;
`;

const KeyValue = styled.Text`
  padding: ${props => props.theme.spacings.verticalScale.s12}px 0px;
  font-size: ${props => props.theme.fontSize.f24}px;
  font-weight: ${props => props.theme.fontWeight.w800};
  color: ${props => props.theme.colors.loginText};
`;

const PinDisplayStyled = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PinDots = styled.View`
  margin: ${props => props.theme.spacings.verticalScale.s12}px;
  height: ${props => props.theme.spacings.verticalScale.s18}px;
  width: ${props => props.theme.spacings.verticalScale.s18}px;
  border-radius: ${props => props.theme.spacings.verticalScale.s18}px;
  border: ${props => `2px solid ${props.theme.colors.loginText}`};
  background-color: ${props =>
    props.filled ? props.theme.colors.loginText : 'transparent'};
`;

export default NumaricPad;
