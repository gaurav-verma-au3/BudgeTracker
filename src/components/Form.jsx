import styled from 'styled-components/native';
import {normalize} from '../utils/normalize';
import {Animated, ScrollView, TouchableWithoutFeedback} from 'react-native';
const borderRadius = normalize(30);
import React, {useEffect, useRef} from 'react';
import usekeyboardListner from '../hooks/usekeyboardListner';
import {MT} from '../styled/MT';
import useTheme from '../hooks/useTheme';

const Form = ({children, title, heightPercentage}) => {
  const theme = useTheme();
  const {keyBoardVisible, keyBoardHeightPercentage} = usekeyboardListner();
  const heightAnimation = useRef(new Animated.Value(0)).current;
  const expand = () => {
    Animated.timing(heightAnimation, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false,
    }).start(finished => {});
  };

  const collapse = () => {
    Animated.timing(heightAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(finished => {});
  };

  useEffect(() => {
    if (keyBoardVisible) {
      expand();
    } else {
      collapse();
    }
  }, [keyBoardVisible]);

  return (
    <TouchableWithoutFeedback>
      <FormContainerStyled
        style={[
          {
            height: heightAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: [
                `${heightPercentage}%`,
                `${heightPercentage + keyBoardHeightPercentage}%`,
              ],
            }),
          },
        ]}>
        <FormTitle>{title}</FormTitle>
        <MT MT={theme.spacings.verticalScale.s12} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '100%'}}>
          {children}
        </ScrollView>
      </FormContainerStyled>
    </TouchableWithoutFeedback>
  );
};

export default Form;

const FormContainerStyled = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${borderRadius}px ${borderRadius}px 0px ${borderRadius}px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${borderRadius}px ${borderRadius}px 0px 0px;
`;

const FormTitle = styled.Text`
  color: ${props => props.theme.colors.loginText};
  font-size: ${props => props.theme.fontSize.f18}px;
  font-weight: ${props => props.theme.fontWeight.w800};
`;
