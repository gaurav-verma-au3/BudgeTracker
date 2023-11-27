import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import NumaricPad, {PinDisplay} from 'components/NumericPad';
import {verticalScale} from 'utils/normalize';
import {height} from 'utils/device';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchSnackBar} from 'utils/snackbar';
import {setPin} from 'redux/user';
import {MT} from '../../styled/MT';
import useTheme from '../../hooks/useTheme';
import {navigators} from '../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {normalize} from '../../utils/normalize';
import Icon from 'react-native-vector-icons/MaterialIcons';

const stages = {
  pinsetupFirst: 'pinsetupFirst',
  pinsetupSecond: 'pinsetupSecond',
  pinAuth: 'pinAuth',
};
const pinLength = 6;

const Login = () => {
  const [stage, setStage] = useState(stages.pinsetupFirst);
  const {pin} = useSelector(state => state.user);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (pin1 && pin1.length === pinLength) {
      setStage(stages.pinsetupSecond);
    }
    if (pin2 && pin2.length === pinLength) {
      if (pin1 === pin2) {
        dispatch(setPin({pin: pin1}));
      } else {
        dispatchSnackBar({
          text: "Pin Doesn't match",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin1, pin2]);

  return pin ? (
    <LoginWithPin />
  ) : stage === stages.pinsetupFirst ? (
    <PinSetupFirst pin1={pin1} setPin1={setPin1} setStage={setStage} />
  ) : stage === stages.pinsetupSecond ? (
    <PinSetupSecond
      setPin2={setPin2}
      pin2={pin2}
      setPin1={setPin1}
      setStage={setStage}
    />
  ) : null;
};

const PinSetupFirst = ({setPin1, pin1, setStage}) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <PinDisplay pin={pin1} pinLength={pinLength} />
      <MT MT={theme.spacings.verticalScale.s16} />
      <DisplayText>Set your PIN</DisplayText>
      <NumaricPad
        setPin={setPin1}
        pin={pin1}
        pinLength={pinLength}
        withDot={false}
        bottomSpace={0}
      />
    </Wrapper>
  );
};

const PinSetupSecond = ({pin2, setPin2, setStage, setPin1}) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <FloatBack
        onPress={() => {
          setPin1('');
          setStage(stages.pinsetupFirst);
        }}>
        <Icon name="chevron-left" size={30} color={theme.colors.loginText} />
      </FloatBack>
      <PinDisplay pin={pin2} pinLength={pinLength} />
      <MT MT={theme.spacings.verticalScale.s16} />
      <DisplayText>Re-Enter your PIN</DisplayText>
      <NumaricPad
        setPin={setPin2}
        pin={pin2}
        pinLength={pinLength}
        withDot={false}
        bottomSpace={0}
      />
    </Wrapper>
  );
};

const LoginWithPin = ({}) => {
  const theme = useTheme();
  const [enteredPin, setEnteredPin] = useState('');
  const navigation = useNavigation();
  const {pin} = useSelector(state => state.user);
  useEffect(() => {
    if (enteredPin && enteredPin.length === pinLength) {
      if (enteredPin === pin) {
        navigation.reset({
          index: 0,
          routes: [{name: navigators.APP}],
        });
      } else {
        dispatchSnackBar({text: 'Wrong PIN'});
        setEnteredPin('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredPin]);
  return (
    <Wrapper>
      <PinDisplay pin={enteredPin} pinLength={pinLength} />
      <MT MT={theme.spacings.verticalScale.s16} />
      <DisplayText>Enter PIN</DisplayText>
      <NumaricPad
        setPin={setEnteredPin}
        pin={enteredPin}
        pinLength={pinLength}
        withDot={false}
        bottomSpace={0}
      />
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: ${verticalScale(height / 4)}px;
  background-color: ${props => props.theme.colors.primary};
`;

const DisplayText = styled.Text`
  font-size: ${props => props.theme.fontSize.f16}px;
  font-weight: ${props => props.theme.fontWeight.w800};
  color: ${props => props.theme.colors.loginText};
`;

const FloatBack = styled.TouchableOpacity`
  position: absolute;
  top: ${normalize(20)}px;
  left: ${normalize(20)}px;
  padding: ${normalize(20)}px;
`;
