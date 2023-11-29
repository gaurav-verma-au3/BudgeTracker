import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {normalize} from 'utils/normalize';
import useTheme from 'hooks/useTheme';

const Chips = ({
  items,
  onPress,
  selected,
  valueField,
  emptyMessage = '',
  onEmptyPress = () => null,
  ...props
}) => {
  const theme = useTheme();

  const renderItem = ({item}) => {
    const highlighted = `${item[valueField]}` === `${selected[valueField]}`;
    return (
      <ListItemContainer
        onPress={() => onPress(item)}
        highlighted={highlighted}>
        {/* <MCI
          name={item.icon}
          color={highlighted ? theme.colors.primary : theme.colors.loginText}
          size={normalize(15)}
        /> */}
        <ListItemText highlighted={highlighted}>{item.label}</ListItemText>
      </ListItemContainer>
    );
  };
  const renderEmpty = () => {
    return (
      <TouchableOpacity
        onPress={onEmptyPress}
        style={{
          borderColor: theme.colors.loginText,
          borderWidth: 1,
          borderRadius: 100,
          paddingVertical: normalize(5),
          paddingHorizontal: normalize(15),
        }}>
        <Text
          style={{
            fontWeight: theme.fontWeight.w900,
            color: props.error
              ? theme.colors.loginText
              : theme.colors.loginText,
          }}>
          {emptyMessage}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: theme.fontWeight.w600,
          color: props.error ? theme.colors.loginText : theme.colors.loginText,
        }}>
        {props.placeholder}
      </Text>
      <Cover
        ListEmptyComponent={emptyMessage ? renderEmpty : null}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={items}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Chips;

const Cover = styled.FlatList`
  margin: ${props => props.theme.spacings.verticalScale.s12 * 0.5}px 0px;
`;

const ListItemContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${props =>
    props.highlighted
      ? props.theme.colors.loginText
      : props.theme.colors.primary};
  gap: ${props => props.theme.spacings.normalScale.s12 * 0.5}px;
  padding: ${props => props.theme.spacings.verticalScale.s12 * 0.5}px
    ${props => props.theme.spacings.normalScale.s18}px;
  border: 1px solid ${props => props.theme.colors.loginText};
  margin-right: ${normalize(15)}px;
  border-radius: ${normalize(5)}px;
`;
const ListItemText = styled.Text`
  font-size: ${props => props.theme.fontSize.f12}px;
  font-weight: ${props => props.theme.fontWeight.w800};
  color: ${props =>
    props.highlighted
      ? props.theme.colors.primary
      : props.theme.colors.loginText};
`;
