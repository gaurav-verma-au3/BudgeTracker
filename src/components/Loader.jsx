import React from 'react';
import {View} from 'react-native';
import {waiting_lottie} from '../assets/lottie';
import LottieView from 'lottie-react-native';
import {width} from '../utils/device';
import styled from 'styled-components/native';

const Loader = () => {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{width: width / 2, height: width / 2}}
        source={waiting_lottie}
        autoPlay
        loop
      />
      <Text>Please Wait...</Text>
    </View>
  );
};

export default Loader;

const Text = styled.Text`
  color: ${props => props.theme.colors.loginText};
  font-size: ${props => props.theme.fontSize.f18}px;
  font-weight: ${props => props.theme.fontWeight.w800};
`;
