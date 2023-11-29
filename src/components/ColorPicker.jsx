import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeColorPickerDrawer} from '../redux/drawersStatus';
import CP from 'react-native-wheel-color-picker';
import {normalize} from '../utils/normalize';
import useTheme from '../hooks/useTheme';
import {MT} from '../styled/MT';
import {setThemeColor} from '../redux/themeColor';
import NormalInput from './InputBoxes/NormalInput';
const ColorPicker = () => {
  const {colorPickerDrawer} = useSelector(state => state.drawersStatus);
  const themeColor = useSelector(state => state.themeColor);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [color, setColor] = useState(themeColor);

  const handleCloseColorPickerDrawer = () => {
    dispatch(closeColorPickerDrawer());
  };

  const handleDone = () => {
    dispatch(setThemeColor({color}));
    handleCloseColorPickerDrawer();
  };

  return (
    <Modal
      animationType="slide"
      visible={!!colorPickerDrawer}
      style={{backgroundColor: color}}>
      <View style={{flex: 1, padding: normalize(50), backgroundColor: color}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: theme.fontSize.f16,
            fontWeight: theme.fontWeight.w800,
            color: theme.colors.loginText,
          }}>
          Make Sure this text is properly visible
        </Text>
        <CP
          // ref={r => {
          //   this.picker = r;
          // }}
          color={color}
          // swatchesOnly={this.state.swatchesOnly}
          onColorChange={c => console.log({c})}
          onColorChangeComplete={setColor}
          thumbSize={40}
          //   sliderSize={40}
          noSnap={true}
          row={false}
          swatchesLast={true}
          swatches={true}
          discrete={false}
        />
        <MT MT={theme.spacings.verticalScale.s36} />
        <NormalInput
          placeholder="HEX"
          maxLength={6}
          onChangeText={v => {
            if (v.length === 6) {
              setColor(v);
            }
          }}
        />
        <MT MT={theme.spacings.verticalScale.s36} />
        <TouchableOpacity onPress={handleDone}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: theme.fontSize.f16,
              fontWeight: theme.fontWeight.w800,
              color: theme.colors.loginText,
            }}>
            APPLY
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ColorPicker;
