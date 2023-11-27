import useTheme from 'hooks/useTheme';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {css} from 'styled-components/native';
import {normalize} from 'utils/normalize';
export const Button = props => {
  const theme = useTheme();
  return (
    <SolidButton {...props} disabled={props.disabled || props.loading}>
      {props.loading ? (
        <ActivityIndicator color={theme.colors.loginText} />
      ) : (
        <ButtonText style={{textAlignVertical: 'center'}} {...props}>
          {props.children}
        </ButtonText>
      )}
    </SolidButton>
  );
};
const SolidButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || 100}%;
  border-radius: ${props => (props.noRadius ? 0 : 40)}px;
  border: ${normalize(2)}px solid
    ${props => props.extraLightGrey || props.theme.colors.loginText};
  padding: ${props => props.theme.spacings.verticalScale.s12}px 0px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  ${props => {
    switch (props.variant) {
      case 'outline':
        return css`
          background-color: ${props => props.theme.colors.primary};
        `;
      default:
        return css`
          background-color: ${props => props.theme.colors.loginText};
        `;
    }
  }};
`;

const ButtonText = styled.Text`
  text-align: center;
  width: 100%;
  font-size: ${props => props.theme.fontSize.f14}px;
  font-weight: ${props => props.theme.fontWeight.w800};
  ${props => {
    switch (props.variant) {
      case 'outline':
        return css`
          color: ${props =>
            props.color ? props.color : props.theme.colors.loginText};
        `;
      default:
        return css`
          color: ${props => props.theme.colors.primary};
        `;
    }
  }}
`;
