import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import styled from 'styled-components/native';
import {normalize} from '../../utils/normalize';
import {height, width} from '../../utils/device';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import {useDispatch} from 'react-redux';
import {
  openAccountsDrawer,
  openColorPickerDrawer,
  openTransactionsDrawer,
  openTransfersDrawer,
} from '../../redux/drawersStatus';
import {
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const iconSize = normalize(width / 10);
const circleSizeCollapsed = normalize(width / 6);
const circleSizeExpanded = normalize(width / 2);
const buttonSizeCollapsed = 0;
const buttonSizeExpanded = normalize(width / 6);

const AddButton = forwardRef(({expanded, setExpanded}, ref) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const widthAnimation = useRef(new Animated.Value(0)).current;

  const handleOpenAccountsDrawer = () => {
    dispatch(openAccountsDrawer());
  };

  const handleOpenTransfersDrawer = () => {
    dispatch(openTransfersDrawer());
  };

  const handleOpenColorPickerDrawer = () => {
    dispatch(openColorPickerDrawer());
  };

  const expand = () => {
    setExpanded(true);
    Animated.timing(widthAnimation, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false,
    }).start(finished => {});
  };

  const collapse = () => {
    Animated.timing(widthAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(finished => {
      setExpanded(false);
    });
  };

  useImperativeHandle(ref, () => ({
    impeerativeCollapseHandle(action) {
      if (action === 'collapse') {
        collapse();
      } else {
        expand();
      }
    },
  }));

  return (
    <Animated.View
      style={[
        {
          height: widthAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: [circleSizeCollapsed, height],
          }),
        },
        {
          width: width,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 0,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => collapse()}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            {
              width: widthAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: [circleSizeCollapsed, circleSizeExpanded],
              }),
              height: widthAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: [circleSizeCollapsed, circleSizeExpanded],
              }),
            },
            {
              borderRadius: 200000,
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <AnimatedRow widthAnimation={widthAnimation} top={0}>
            <TopRow>
              <AnimatedButton
                widthAnimation={widthAnimation}
                onPress={handleOpenAccountsDrawer}>
                <MCI
                  name="bank-plus"
                  size={iconSize}
                  color={theme.colors.loginText}
                />
              </AnimatedButton>
            </TopRow>
          </AnimatedRow>
          <AnimatedRow widthAnimation={widthAnimation} top={buttonSizeExpanded}>
            <MidRow>
              <AnimatedButton
                widthAnimation={widthAnimation}
                onPress={handleOpenTransfersDrawer}>
                <MCI
                  name="bank-transfer"
                  size={iconSize}
                  color={theme.colors.loginText}
                />
              </AnimatedButton>
              <AnimatedButton
                widthAnimation={widthAnimation}
                onPress={handleOpenColorPickerDrawer}>
                <MI
                  name="color-lens"
                  size={iconSize}
                  color={theme.colors.loginText}
                />
              </AnimatedButton>
            </MidRow>
          </AnimatedRow>
          <BottomRow>
            <TouchableOpacity>
              <Button>
                <MI
                  name="add"
                  size={normalize(width / 10)}
                  color={theme.colors.loginText}
                />
              </Button>
            </TouchableOpacity>
          </BottomRow>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const AnimatedButton = ({widthAnimation, children, onPress}) => {
  return (
    <Animated.View
      style={[
        {
          width: widthAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: [buttonSizeCollapsed, buttonSizeExpanded],
          }),
          height: widthAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: [buttonSizeCollapsed, buttonSizeExpanded],
          }),
        },
      ]}>
      <AnimatedButtons onPress={onPress}>{children}</AnimatedButtons>
    </Animated.View>
  );
};

const AnimatedRow = ({widthAnimation, children, top}) => (
  <Animated.View
    style={[
      {
        width: widthAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        }),
        height: widthAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [0, normalize(width / 6)],
        }),
      },
      {position: 'absolute', top: top},
    ]}>
    {children}
  </Animated.View>
);

export default AddButton;

const Button = styled.TouchableOpacity`
  height: ${normalize(width / 6)}px;
  width: ${normalize(width / 6)}px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${normalize(width / 6)}px;
  justify-content: center;
  align-items: center;
`;

const AnimatedButtons = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${normalize(width / 6)}px;
  justify-content: center;
  align-items: center;
`;

const TopRow = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
`;
const MidRow = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const BottomRow = styled.View`
  height: ${normalize(width / 6)}px;
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 0;
`;
