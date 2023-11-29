import useTheme from 'hooks/useTheme';
import React from 'react';
import {Text, View} from 'react-native';
// import {ErrorText} from 'styled';
import styled from 'styled-components/native';
import {normalize} from 'utils/normalize';
import {nullChecker} from 'utils/utilities';
const NormalInput = props => {
  const theme = useTheme();
  return (
    <Container width={props.width}>
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
      <TextInputContainer noEdges={props.noEdges} error={props.error}>
        <TextInputBox
          error={props.error}
          {...props}
          placeholder=""></TextInputBox>
      </TextInputContainer>
      {/* {props.hideError ? null : props.error ? (
        <ErrorText>{nullChecker(props.error)}</ErrorText>
      ) : (
        <ErrorText> </ErrorText>
      )} */}
    </Container>
  );
};

export default NormalInput;
const Container = styled.View`
  width: ${props => (props.width ? props.width : 100)}%;
`;
const TextInputContainer = styled.View`
  border: 1px solid
    ${props =>
      props.error
        ? props.theme.colors.loginText
        : props.theme.colors.loginText};
  border-radius: ${props => (props.noEdges ? '100' : '5')}px;
  display: flex;
  justify-content: center;
  margin: 0px 0px ${props => props.theme.spacings.verticalScale.s12}px 0px;
`;

const TextInputBox = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.error
    ? props.theme.colors.loginText
    : props.theme.colors.loginText,
}))`
  color: ${props =>
    props.error ? props.theme.colors.loginText : props.theme.colors.loginText};
  font-size: ${props => props.theme.fontSize.f12}px;
  font-weight: ${props => props.theme.fontWeight.w600};
  padding: ${props => props.theme.spacings.verticalScale.s12}px
    ${props => props.theme.spacings.normalScale.s12}px;
  width: 100%;
`;
