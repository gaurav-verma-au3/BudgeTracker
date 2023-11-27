import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {normalize} from 'utils/normalize';
import useTheme from 'hooks/useTheme';

const Chips = ({items, onPress, selected, valueField}) => {
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

  return (
    <View>
      <Cover
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
